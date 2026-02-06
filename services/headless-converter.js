import path from 'path';
import fs from 'fs-extra';
import { JSDOM } from 'jsdom';

class HeadlessConverter {
    constructor() {
        this.outputDirName = 'netlify-deploy';
    }

    /**
     * Convert downloaded website to Headless Shopify structure
     */
    async convertToHeadless(websitePath, websiteName, shopifyConfig = null) {
        console.log(`\n========================================`);
        console.log(`Converting to Headless Shopify (Netlify): ${websiteName}`);
        console.log(`========================================\n`);

        const deployPath = path.join(websitePath, '..', `${websiteName}-${this.outputDirName}`);

        // 1. Prepare Deploy Folder
        await this.prepareDeployFolder(deployPath);

        // 2. Copy All Assets (The exact site)
        await this.copyWebsiteFiles(websitePath, deployPath);

        // 3. Process HTML to Inject Commerce Logic
        const indexPath = path.join(deployPath, 'index.html');
        if (await fs.pathExists(indexPath)) {
            let htmlContent = await fs.readFile(indexPath, 'utf-8');
            htmlContent = await this.injectCommerceLogic(htmlContent, deployPath);
            await fs.writeFile(indexPath, htmlContent);
        } else {
            throw new Error('No index.html found to inject commerce logic.');
        }

        // 4. Create Configuration File
        await this.createConfigFile(deployPath, shopifyConfig);

        // 5. Create Commerce Script (The Engine)
        await this.createCommerceScript(deployPath);

        console.log(`✓ Headless site created at: ${deployPath}`);

        return {
            success: true,
            deployPath: deployPath,
            siteName: `${websiteName}-headless`
        };
    }

    async prepareDeployFolder(deployPath) {
        if (await fs.pathExists(deployPath)) {
            await fs.remove(deployPath);
        }
        await fs.ensureDir(deployPath);
    }

    async copyWebsiteFiles(source, destination) {
        // Copy everything using fs-extra
        // Filter out the old shopify themes if they are inside (unlikely but safe)
        await fs.copy(source, destination, {
            filter: (src) => {
                return !src.includes('-shopify-theme');
            }
        });
        console.log('✓ Original website files copied');
    }

    async createConfigFile(deployPath, shopifyConfig) {
        let configContent;

        if (shopifyConfig) {
            configContent = `// Shopify Headless Configuration
// Generated automatically via UI

const SHOPIFY_CONFIG = {
    domain: '${shopifyConfig.domain || "your-store.myshopify.com"}',
    storefrontAccessToken: '${shopifyConfig.storefrontAccessToken || "YOUR_TOKEN"}',
    
    // Map detected buttons to Shopify Variant IDs
    productMapping: ${JSON.stringify(shopifyConfig.productMapping || {}, null, 4)}
};

window.SHOPIFY_CONFIG = SHOPIFY_CONFIG;
`;
        } else {
            configContent = `// Shopify Headless Configuration
// 1. Go to Shopify Admin > Apps > Sales Channels > Headless > Create Storefront
// 2. Obtain your "Storefront access token"
// 3. Map your buttons to Product Variant IDs

const SHOPIFY_CONFIG = {
    domain: 'your-store.myshopify.com',
    storefrontAccessToken: 'YOUR_STOREFRONT_ACCESS_TOKEN', // e.g., 'dd4d4...'
    
    // Map detected buttons to Shopify Variant IDs
    // "Button Text": "Variant ID"
    productMapping: {
        "Add to Cart": "gid://shopify/ProductVariant/123456789",
        "Buy Now": "gid://shopify/ProductVariant/987654321"
    }
};

window.SHOPIFY_CONFIG = SHOPIFY_CONFIG;
`;
        }
        await fs.writeFile(path.join(deployPath, 'shopify-config.js'), configContent);
    }

    async injectCommerceLogic(html, deployPath) {
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // 1. Inject Config Script
        const configScript = document.createElement('script');
        configScript.src = './shopify-config.js';
        document.head.appendChild(configScript);

        // 2. Inject Shopify Buy SDK
        const sdkScript = document.createElement('script');
        sdkScript.src = 'https://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js';
        document.head.appendChild(sdkScript);

        // 3. Inject Our Commerce Engine
        const engineScript = document.createElement('script');
        engineScript.src = './shopify-commerce.js';
        document.body.appendChild(engineScript);

        // 4. Inject Cart Drawer HTML (Hidden by default)
        const cartDrawerHTML = `
        <div id="shopify-cart-drawer" class="cart-drawer" style="display:none;">
            <div class="cart-drawer-overlay" onclick="closeCart()"></div>
            <div class="cart-drawer-content">
                <div class="cart-header">
                    <h2>Your Cart</h2>
                    <span class="close-btn" onclick="closeCart()">&times;</span>
                </div>
                <div id="cart-items" class="cart-items">
                    <!-- Items go here -->
                    <p class="empty-msg">Your cart is empty.</p>
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span id="cart-total-price">$0.00</span>
                    </div>
                    <button id="checkout-btn" class="checkout-btn" onclick="checkout()">Checkout</button>
                </div>
            </div>
        </div>
        <style>
            .cart-drawer { position: fixed; inset: 0; z-index: 99999; font-family: system-ui, sans-serif; }
            .cart-drawer-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
            .cart-drawer-content { 
                position: absolute; top: 0; right: 0; bottom: 0; width: 100%; max-width: 400px; 
                background: white; transform: translateX(100%); transition: transform 0.3s ease;
                display: flex; flex-direction: column;
            }
            .cart-drawer.open .cart-drawer-content { transform: translateX(0); }
            .cart-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
            .cart-items { flex: 1; overflow-y: auto; padding: 20px; }
            .cart-footer { padding: 20px; border-top: 1px solid #eee; background: #f9f9f9; }
            .checkout-btn { width: 100%; padding: 15px; background: black; color: white; border: none; font-size: 16px; cursor: pointer; margin-top: 10px; }
            .checkout-btn:hover { opacity: 0.9; }
            .cart-item { display: flex; gap: 10px; margin-bottom: 15px; }
            .cart-item img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
            .cart-item-info { flex: 1; }
            .cart-item-title { font-weight: bold; margin-bottom: 5px; display: block; }
            .cart-item-price { color: #666; }
            .close-btn { font-size: 24px; cursor: pointer; }
        </style>
        `;

        // Append Drawer to Body
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cartDrawerHTML;
        while (tempDiv.firstChild) {
            document.body.appendChild(tempDiv.firstChild);
        }

        return dom.serialize();
    }

    async createCommerceScript(deployPath) {
        const scriptContent = `
// Shopify Commerce Engine
let client;
let checkoutId;

// Initialize Shopify Client
function initShopify() {
    if (!window.SHOPIFY_CONFIG || !window.ShopifyBuy) {
        console.error('Shopify Config or SDK missing');
        return;
    }

    client = ShopifyBuy.buildClient({
        domain: window.SHOPIFY_CONFIG.domain,
        storefrontAccessToken: window.SHOPIFY_CONFIG.storefrontAccessToken
    });

    createCheckout();
    setupEventListeners();
}

async function createCheckout() {
    // Check local storage for existing checkout
    const existingId = localStorage.getItem('shopify_checkout_id');
    if (existingId) {
        try {
            const checkout = await client.checkout.fetch(existingId);
            if (!checkout.completedAt) {
                checkoutId = existingId;
                updateCartUI(checkout);
                return;
            }
        } catch (e) {
            console.log('Expired checkout, creating new one');
        }
    }

    const checkout = await client.checkout.create();
    checkoutId = checkout.id;
    localStorage.setItem('shopify_checkout_id', checkoutId);
    updateCartUI(checkout);
}

function setupEventListeners() {
    // Find all potential "Add to Cart" buttons
    const buttons = document.querySelectorAll('button, a.btn, input[type="submit"]');
    
    buttons.forEach(btn => {
        const text = btn.innerText || btn.value;
        if (!text) return;

        // Check if text matches any mapping
        const mapping = window.SHOPIFY_CONFIG.productMapping;
        let variantId = null;
        let actionStr = 'cart';

        // Simple text match (case insensitive partial)
        for (const [key, val] of Object.entries(mapping)) {
            if (text.toLowerCase().includes(key.toLowerCase())) {
                if (typeof val === 'object') {
                    variantId = val.variantId;
                    actionStr = val.action || 'cart';
                } else {
                    variantId = val; // Backward compatibility
                }
                break;
            }
        }

        if (variantId) {
            console.log('Attached Commerce Logic to: ' + text + ' (' + actionStr + ')');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (actionStr === 'checkout') {
                    buyNow(variantId);
                } else {
                    addToCart(variantId);
                }
            });
        }
    });
}

async function buyNow(variantId) {
    // Direct Checkout flow
    // 1. Create a new checkout with this item
    // 2. Redirect to webUrl
    
    // We don't use the persistence cart for Buy Now usually, 
    // but if you want to include existing items, you'd fetch existing checkout.
    // Let's assume Buy Now means "Buy JUST THIS" for simplicity, or "Add & Go".
    // "Add & Go" is safer.
    
    if (!checkoutId) {
        await createCheckout();
    }
    
    try {
        const lineItemsToAdd = [{
            variantId: variantId,
            quantity: 1
        }];
        
        // Add item
        const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
        
        // Redirect
        window.location.href = checkout.webUrl;
        
    } catch (e) {
        console.error('Error in Buy Now:', e);
        alert('Could not proceed to checkout.');
    }
}

async function addToCart(variantId) {
    if (!checkoutId) return;

    openCart(); // Open drawer immediately for feedback
    
    // Show loading state if you want
    
    const lineItemsToAdd = [{
        variantId: variantId,
        quantity: 1
    }];

    try {
        const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
        updateCartUI(checkout);
    } catch (e) {
        console.error('Error adding to cart:', e);
        alert('Could not add to cart. Check your configuration.');
    }
}

function updateCartUI(checkout) {
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-price');
    const count = checkout.lineItems.length;

    totalEl.innerText = '$' + checkout.totalPrice.amount;

    if (count === 0) {
        itemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        return;
    }

    itemsContainer.innerHTML = checkout.lineItems.map(item => \`
        <div class="cart-item">
            <img src="\${item.variant.image ? item.variant.image.src : ''}" alt="\${item.title}">
            <div class="cart-item-info">
                <span class="cart-item-title">\${item.title}</span>
                <span class="cart-item-price">Qty: \${item.quantity} - $\${item.variant.price.amount}</span>
            </div>
        </div>
    \`).join('');
}

window.openCart = function() {
    const drawer = document.getElementById('shopify-cart-drawer');
    drawer.style.display = 'block';
    // Small delay to allow display:block to apply before adding class for transition
    setTimeout(() => {
        drawer.classList.add('open');
    }, 10);
};

window.closeCart = function() {
    const drawer = document.getElementById('shopify-cart-drawer');
    drawer.classList.remove('open');
    setTimeout(() => {
        drawer.style.display = 'none';
    }, 300);
};

window.checkout = async function() {
    if (!client || !checkoutId) return;
    const checkout = await client.checkout.fetch(checkoutId);
    window.location.href = checkout.webUrl;
};

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShopify);
} else {
    initShopify();
}
`;
        await fs.writeFile(path.join(deployPath, 'shopify-commerce.js'), scriptContent);
    }
}

export default new HeadlessConverter();

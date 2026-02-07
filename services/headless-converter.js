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

        // 3. Create Configuration File
        await this.createConfigFile(deployPath, shopifyConfig);

        // 4. Create Commerce Script (The Engine)
        const commerceScript = await this.createCommerceScript(deployPath);

        // 5. Process HTML & Inject Logic
        const indexHtmlPath = path.join(websitePath, 'index.html');
        if (await fs.pathExists(indexHtmlPath)) {
            let html = await fs.readFile(indexHtmlPath, 'utf-8');
            html = await this.injectCommerceLogic(html, deployPath);
            await fs.writeFile(path.join(deployPath, 'index.html'), html);

            // --- PREVIEW MODE (Source Root) ---
            // Write injected preview.html to root
            await fs.writeFile(path.join(websitePath, 'preview.html'), html);
            // Write config & script to root
            await this.createConfigFile(websitePath, shopifyConfig);
            await fs.writeFile(path.join(websitePath, 'shopify-commerce.js'), commerceScript);

            console.log('✓ Preview files generated in root: preview.html, shopify-config.js, shopify-commerce.js');
        } else {
            throw new Error('No index.html found!');
        }

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

        // 0. CLEANUP: Remove conflicting Shopify Scripts (Payment Button, Analytics, etc.)
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            const src = script.src || '';
            const content = script.textContent || '';

            // List of blockers to remove
            if (
                src.includes('portable-wallets') ||
                src.includes('shopify-payment-button') ||
                src.includes('storefront-experiences') ||
                src.includes('pixie') ||
                content.includes('Shopify.PaymentButton') ||
                content.includes('pixie(') ||
                content.includes('loadFeatures') ||
                content.includes('loadFeatures') ||
                content.includes('RechargeStorefrontConfig') ||
                content.includes('widget_page_id') ||
                src.includes('shop.app/pay')
            ) {
                script.remove();
                console.log('Removed conflicting script: ' + (src || 'inline'));
            }
        });

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
    console.log('[Shopify] Initializing...');
    if (!window.SHOPIFY_CONFIG || !window.ShopifyBuy) {
        console.error('[Shopify] Critical Error: Config or SDK missing', {
            config: !!window.SHOPIFY_CONFIG,
            sdk: !!window.ShopifyBuy
        });
        return;
    }

    console.log('[Shopify] Config found:', window.SHOPIFY_CONFIG);

    try {
        const configDomain = window.SHOPIFY_CONFIG.domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const currentHost = window.location.hostname;

        // Validation: Prevent using the Netlify app itself as the Shopify domain
        if (configDomain === currentHost || configDomain.includes('netlify.app') || (configDomain.includes('localhost') && !currentHost.includes('localhost'))) {
             console.error('[Shopify] CRITICAL CONFIG ERROR: Shopify Domain is set to the website itself or a non-Shopify domain.', configDomain);
             alert('Setup Error: "Shopify Domain" should be your actual Shopify store URL (e.g. your-store.myshopify.com), NOT this website URL.\n\nPlease go back to "Headless Setup" and fix the domain.');
             return; // Stop initialization
        }

        client = ShopifyBuy.buildClient({
            domain: window.SHOPIFY_CONFIG.domain,
            storefrontAccessToken: window.SHOPIFY_CONFIG.storefrontAccessToken
        });
        console.log('[Shopify] Client built successfully');
    } catch (e) {
        console.error('[Shopify] Client build failed:', e);
        return;
    }

    createCheckout();
    setupEventListeners();
}

async function createCheckout() {
    console.log('[Shopify] createCheckout called');
    // Check local storage for existing checkout
    const existingId = localStorage.getItem('shopify_checkout_id');
    if (existingId) {
        console.log('[Shopify] Found existing checkout ID:', existingId);
        try {
            const checkout = await client.checkout.fetch(existingId);
            if (!checkout.completedAt) {
                console.log('[Shopify] Existing checkout is valid');
                checkoutId = existingId;
                updateCartUI(checkout);
                return;
            } else {
                console.log('[Shopify] Existing checkout was completed, clearing it');
            }
        } catch (e) {
            console.log('[Shopify] Expired/Invalid checkout, creating new one');
        }
    }

    try {
        console.log('[Shopify] Creating new checkout instance...');
        const checkout = await client.checkout.create();
        checkoutId = checkout.id;
        localStorage.setItem('shopify_checkout_id', checkoutId);
        console.log('[Shopify] New checkout created:', checkoutId);
        updateCartUI(checkout);
    } catch (e) {
        console.error('[Shopify] Failed to create checkout:', e);
    }
}

function setupEventListeners() {
    console.log('[Shopify] Setting up event listeners');
    
    // Custom MutationObserver to catch lazy-loaded buttons
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.matches && (node.matches('button, a, input[type="submit"]'))) {
                        attachListener(node);
                    }
                    const childButtons = node.querySelectorAll ? node.querySelectorAll('button, a, input[type="submit"]') : [];
                    childButtons.forEach(attachListener);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Initial scan
    const buttons = document.querySelectorAll('button, a, input[type="submit"]');
    console.log('[Shopify] Initial scan found buttons:', buttons.length);
    buttons.forEach(attachListener);
}

function attachListener(btn) {
    if (btn.dataset.shopifyAttached) return; 
    
    const text = btn.innerText || btn.value;
    if (!text) return;

    // Check if text matches any mapping
    const mapping = window.SHOPIFY_CONFIG.productMapping;
    let variantId = null;
    let actionStr = 'cart';

    for (const [key, val] of Object.entries(mapping)) {
        if (text.toLowerCase().includes(key.toLowerCase())) {
            console.log(\`[Shopify] Match found for "\${text}" -> Key: "\${key}"\`);
            if (typeof val === 'object') {
                variantId = val.variantId;
                actionStr = val.action || 'cart';
            } else {
                variantId = val; 
            }
            break;
        }
    }

    if (variantId) {
        console.log(\`[Shopify] Attaching \${actionStr} logic to button: "\${text}" (Variant: \${variantId})\`);
        btn.dataset.shopifyAttached = 'true';
        
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            console.log(\`[Shopify] Click detected on \${text}\`);
            e.preventDefault();
            e.stopPropagation();
            
            if (actionStr === 'checkout') {
                buyNow(variantId);
            } else {
                addToCart(variantId);
            }
        });
    }
}

async function buyNow(variantId) {
    console.log('[Shopify] buyNow execution started for variant:', variantId);
    
    let numericId = variantId;
    try {
        if (variantId.includes('/')) {
            numericId = variantId.split('/').pop();
        }
    } catch (e) {}

    // Method A: Storefront API
    try {
        if (!checkoutId) {
            console.log('[Shopify] No checkoutId found, waiting for creation...');
            await createCheckout();
        }

        const lineItemsToAdd = [{
            variantId: variantId,
            quantity: 1
        }];
        
        console.log('[Shopify] API: AddLineItems initiated', lineItemsToAdd);
        const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
        
        console.log('[Shopify] API: Success! Redirecting to:', checkout.webUrl);
        window.location.href = checkout.webUrl;
        
    } catch (e) {
        console.error('[Shopify] API Checkout failed:', e);
        console.log('[Shopify] Fallback: Initiating Permalink redirect...');
        
        const domain = window.SHOPIFY_CONFIG.domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
        
        // Prevent redirect loop if misconfigured
        if (domain === window.location.hostname) {
             alert('Configuration Error: Cannot redirect to checkout because "Shopify Domain" is set to this website.\nPlease update it to your actual Shopify URL (e.g. myshop.myshopify.com).');
             return;
        }

        const fallbackUrl = \`https://\${domain}/cart/\${numericId}:1\`;
        
        console.log('[Shopify] Fallback URL:', fallbackUrl);
        window.location.href = fallbackUrl;
    }
}

async function addToCart(variantId) {
    console.log('[Shopify] addToCart execution started for variant:', variantId);
    if (!checkoutId) {
        console.error('[Shopify] Cannot add to cart, checkoutId missing');
        return;
    }

    openCart(); 
    
    const lineItemsToAdd = [{
        variantId: variantId,
        quantity: 1
    }];

    try {
        const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
        console.log('[Shopify] addToCart success');
        updateCartUI(checkout);
    } catch (e) {
        console.error('[Shopify] addToCart failed:', e);
        alert('Cart Error: ' + e.message);
    }
}

function updateCartUI(checkout) {
    console.log('[Shopify] Updating Cart UI. Item count:', checkout.lineItems.length);
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
    console.log('[Shopify] Opening cart drawer');
    const drawer = document.getElementById('shopify-cart-drawer');
    drawer.style.display = 'block';
    setTimeout(() => {
        drawer.classList.add('open');
    }, 10);
};

window.closeCart = function() {
    console.log('[Shopify] Closing cart drawer');
    const drawer = document.getElementById('shopify-cart-drawer');
    drawer.classList.remove('open');
    setTimeout(() => {
        drawer.style.display = 'none';
    }, 300);
};

window.checkout = async function() {
    console.log('[Shopify] Proceeding to checkout from Cart Drawer');
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
        const scriptPath = path.join(deployPath, 'shopify-commerce.js');
        await fs.writeFile(scriptPath, scriptContent);
        return scriptContent; // Return content for reuse in preview generation
    }
}

export default new HeadlessConverter();

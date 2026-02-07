
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
        const configDomain = window.SHOPIFY_CONFIG.domain.replace(/^https?:///, '').replace(//$/, '');
        const currentHost = window.location.hostname;

        // Validation: Prevent using the Netlify app itself as the Shopify domain
        if (configDomain === currentHost || configDomain.includes('netlify.app') || (configDomain.includes('localhost') && !currentHost.includes('localhost'))) {
             console.error('[Shopify] CRITICAL CONFIG ERROR: Shopify Domain is set to the website itself or a non-Shopify domain.', configDomain);
             alert('Setup Error: "Shopify Domain" should be your actual Shopify store URL (e.g. your-store.myshopify.com), NOT this website URL.

Please go back to "Headless Setup" and fix the domain.');
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
            console.log(`[Shopify] Match found for "${text}" -> Key: "${key}"`);
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
        console.log(`[Shopify] Attaching ${actionStr} logic to button: "${text}" (Variant: ${variantId})`);
        btn.dataset.shopifyAttached = 'true';
        
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            console.log(`[Shopify] Click detected on ${text}`);
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
        
        const domain = window.SHOPIFY_CONFIG.domain.replace(/^https?:///, '').replace(//$/, '');
        
        // Prevent redirect loop if misconfigured
        if (domain === window.location.hostname) {
             alert('Configuration Error: Cannot redirect to checkout because "Shopify Domain" is set to this website.
Please update it to your actual Shopify URL (e.g. myshop.myshopify.com).');
             return;
        }

        const fallbackUrl = `https://${domain}/cart/${numericId}:1`;
        
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

    itemsContainer.innerHTML = checkout.lineItems.map(item => `
        <div class="cart-item">
            <img src="${item.variant.image ? item.variant.image.src : ''}" alt="${item.title}">
            <div class="cart-item-info">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-price">Qty: ${item.quantity} - $${item.variant.price.amount}</span>
            </div>
        </div>
    `).join('');
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

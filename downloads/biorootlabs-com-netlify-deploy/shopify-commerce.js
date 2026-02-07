
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
    // Find all potential "Add to Cart" buttons
    // Expanded to include ALL links, as many themes don't use .btn class
    const buttons = document.querySelectorAll('button, a, input[type="submit"]');
    
    });

    // CUSTOM: Add MutationObserver to catch lazy-loaded buttons
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check the node itself
                    if (node.matches && (node.matches('button, a, input[type="submit"]'))) {
                        attachListener(node);
                    }
                    // Check its children
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
}

function attachListener(btn) {
    if (btn.dataset.shopifyAttached) return; // Prevent double attach
    
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
        console.log('Attached Commerce Logic to (Dynamic): ' + text);
        btn.dataset.shopifyAttached = 'true';
        // Clone and replace to strip existing listeners (nuclear option)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
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
        alert('Checkout Error: ' + e.message);
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
        alert('Cart Error: ' + e.message);
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

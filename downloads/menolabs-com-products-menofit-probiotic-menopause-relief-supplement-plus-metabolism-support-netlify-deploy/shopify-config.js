// Shopify Headless Configuration
// Generated automatically via UI

const SHOPIFY_CONFIG = {
    domain: 'zf0rmz-nd.myshopify.com',
    storefrontAccessToken: '<INSERT_YOUR_STOREFRONT_ACCESS_TOKEN>',

    // Map detected buttons to Shopify Variant IDs
    productMapping: {
        "Add to cart": {
            "variantId": "gid://shopify/ProductVariant/47285202125036",
            "action": "checkout"
        }
    }
};

window.SHOPIFY_CONFIG = SHOPIFY_CONFIG;

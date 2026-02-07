import fetch from 'node-fetch';

const shop = 'waseem-123475.myshopify.com';
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN';

async function testToken() {
    console.log(`Testing token for ${shop}...`);

    // Try to get Shop info (simplest read request)
    const url = `https://${shop}/admin/api/2024-01/shop.json`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('FAILED:', response.status, response.statusText);
            console.error('Error details:', JSON.stringify(data, null, 2));
            console.error('Scopes:', response.headers.get('x-shopify-access-token-scopes')); // Check this
        } else {
            console.log('SUCCESS! Token is valid.');
            console.log('Shop Name:', data.shop.name);
            console.log('Shop Email:', data.shop.email);
            console.log('--- SCOPE HEADERS ---');
            const scopeHeaders = ['x-shopify-access-token-scopes', 'x-shopify-api-permission', 'scope'];
            let found = false;
            for (const [key, value] of response.headers.entries()) {
                if (scopeHeaders.includes(key.toLowerCase()) || key.toLowerCase().includes('scope')) {
                    console.log(`${key}: ${value}`);
                    found = true;
                }
            }
            if (!found) console.log("No scope headers found!");
            console.log('-------------------');
        }

    } catch (error) {
        console.error('Network error:', error);
    }
}

testToken();

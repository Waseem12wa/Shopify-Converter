import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const SHOP = 'zf0rmz-nd.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';

async function getToken() {
    console.log(`Requesting token for ${SHOP}...`);

    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');

    try {
        const response = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
            method: 'POST',
            body: params
        });

        const data = await response.json();

        if (!response.ok) {
            console.log('ERROR:', JSON.stringify(data));
        } else {
            console.log('\nSUCCESS! Token details:');
            console.log('ACCESS_TOKEN:', data.access_token);
            console.log('SCOPES:', data.scope);
            console.log('EXPIRES_IN:', data.expires_in);
        }

    } catch (error) {
        console.log('NETWORK_ERROR:', error.message);
    }
}

getToken();

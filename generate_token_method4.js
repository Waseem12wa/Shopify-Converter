import fetch from 'node-fetch';

const url = 'https://waseem-123475.myshopify.com/admin/oauth/access_token';

const payload = {
    client_id: process.env.SHOPIFY_CLIENT_ID || 'YOUR_CLIENT_ID',
    client_secret: process.env.SHOPIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
    grant_type: 'client_credentials'
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(response => response.json())
    .then(data => {
        console.log('Access Token:', data.access_token);
        console.log('Scope:', data.scope);
    })
    .catch(error => console.error('Error:', error));

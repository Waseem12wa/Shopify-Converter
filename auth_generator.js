import express from 'express';
import fetch from 'node-fetch';


const app = express();
const PORT = 3456;

// CONFIGURATION
const SHOP = 'waseem-123475.myshopify.com';
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const SCOPES = 'write_themes,read_themes,read_products';
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

app.get('/install', (req, res) => {
    // Adding grant_options[]=per-user forces the consent screen to show again
    const installUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&grant_options[]=per-user`;
    console.log(`Redirecting to: ${installUrl}`);
    res.redirect(installUrl);
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Missing code parameter');
    }

    console.log(`Received code: ${code}`);
    console.log('Exchanging code for access token...');

    try {
        const response = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code
            })
        });

        const data = await response.json();

        if (data.access_token) {
            console.log('\nSUCCESS! YOUR TOKEN:');
            console.log('==========================================');
            console.log(data.access_token);
            console.log('==========================================');
            res.send(`<h1>Success!</h1><p>Your token has been generated. Check the terminal.</p><p>Token: ${data.access_token}</p>`);
        } else {
            console.log('Error data:', data);
            res.status(500).send(`Error getting token: ${JSON.stringify(data)}`);
        }

    } catch (error) {
        console.error('Network Error:', error);
        res.status(500).send('Network error interacting with Shopify');
    }
});

app.listen(PORT, () => {
    console.log(`\nAuth Server is running!`);
    console.log(`1. Go to your Partner Dashboard > Apps > Clone App > Configuration > URLs.`);
    console.log(`2. Add this to "Allowed redirection URL(s)": ${REDIRECT_URI}`);
    console.log(`3. Click Save.`);
    console.log(`4. Open this URL in your browser: http://localhost:${PORT}/install`);
});

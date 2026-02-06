import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';
import fetch from 'node-fetch'; // Ensure node-fetch is available, or use global fetch if Node 18+

class NetlifyService {

    /**
     * Deploy a folder to Netlify
     * @param {string} folderPath - Path to the folder to deploy
     * @param {string} token - Netlify Personal Access Token
     * @returns {Promise<object>} - Deploy result (url, etc.)
     */
    async deploySite(folderPath, token) {
        console.log(`\nStarting Netlify Deployment...`);

        if (!token) {
            throw new Error('Netlify Access Token is required');
        }

        // 0. Verify Token
        console.log('Verifying Netlify Token...');
        const user = await this.verifyUser(token);
        console.log(`✓ Authenticated as: ${user.full_name || user.email}`);


        // 1. Create a ZIP buffer of the folder
        console.log('Zipping folder for upload...');
        const zipBuffer = await this.zipFolder(folderPath);
        console.log(`Zip created. Size: ${(zipBuffer.length / 1024 / 1024).toFixed(2)} MB`);

        // 2. Upload to Netlify
        console.log('Uploading to Netlify API...');
        const response = await fetch('https://api.netlify.com/api/v1/sites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/zip',
                'Authorization': `Bearer ${token}`
            },
            body: zipBuffer
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Netlify API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('✓ Deployment Successful!');

        return {
            success: true,
            siteId: data.id,
            siteName: data.name,
            url: data.url,
            adminUrl: data.admin_url,
            deployId: data.deploy_id
        };
    }

    /**
     * Zip a folder and return it as a Buffer
     */
    zipFolder(sourceDir) {
        return new Promise((resolve, reject) => {
            const archive = archiver('zip', { zlib: { level: 9 } });
            const buffers = [];

            archive.on('data', data => buffers.push(data));
            archive.on('error', err => reject(err));
            archive.on('end', () => resolve(Buffer.concat(buffers)));

            archive.directory(sourceDir, false);
            archive.finalize();
        });
    }

    /**
     * Verify the Netlify Token
     */
    async verifyUser(token) {
        const response = await fetch('https://api.netlify.com/api/v1/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Invalid Netlify Token. Please check that you copied it correctly.');
        }

        return await response.json();
    }
}

export default new NetlifyService();

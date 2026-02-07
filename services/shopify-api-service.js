import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';

class ShopifyApiService {
    constructor() {
        this.apiVersion = '2024-01';
    }

    /**
     * Create a new theme in Shopify
     */
    async createTheme(shopDomain, accessToken, name) {
        const url = `https://${shopDomain}/admin/api/${this.apiVersion}/themes.json`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                theme: {
                    name: name.substring(0, 50),
                    role: 'unpublished' // Always create as unpublished first
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to create theme: ${data.errors ? JSON.stringify(data.errors) : response.statusText}`);
        }

        return data.theme;
    }

    /**
     * Upload a single asset to Shopify theme
     */
    async uploadAsset(shopDomain, accessToken, themeId, key, filePath) {
        const url = `https://${shopDomain}/admin/api/${this.apiVersion}/themes/${themeId}/assets.json`;

        let value;
        let attachment;

        // Determine if file is text or binary
        const ext = path.extname(filePath).toLowerCase();
        const isBinary = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.otf'].includes(ext);

        if (isBinary) {
            const buffer = await fs.readFile(filePath);
            attachment = buffer.toString('base64');
        } else {
            value = await fs.readFile(filePath, 'utf-8');
        }

        const body = {
            asset: {
                key: key,
                // Only send one of these
                ...(attachment ? { attachment } : { value })
            }
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            // Check for rate limiting
            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After') || 1;
                console.log(`Rate limited. Waiting ${retryAfter}s...`);
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                return this.uploadAsset(shopDomain, accessToken, themeId, key, filePath);
            }
            throw new Error(`Failed to upload asset ${key}: ${data.errors ? JSON.stringify(data.errors) : response.statusText}`);
        }

        return data.asset;
    }

    /**
     * Orchestrate full theme upload
     */
    async deployTheme(shopDomain, accessToken, themePath, themeName) {
        console.log(`Starting deployment to ${shopDomain}...`);

        // 1. Create Theme
        console.log('Creating new theme...');
        const theme = await this.createTheme(shopDomain, accessToken, themeName);
        console.log(`Theme created: ${theme.name} (ID: ${theme.id})`);

        // 2. Find all files to upload
        const files = [];
        await this.findFiles(themePath, '', files);

        console.log(`Found ${files.length} files to upload.`);

        // 3. Upload files (Parallel with concurrency limit)
        const CONCURRENCY_LIMIT = 5;
        const queue = [...files];
        const totalFiles = files.length;
        let processedCount = 0;

        const uploadWorker = async () => {
            while (queue.length > 0) {
                const file = queue.shift();
                processedCount++;

                const relativePath = path.relative(themePath, file);
                // Convert Windows path separators to forward slashes for Shopify keys
                const key = relativePath.replace(/\\/g, '/');

                console.log(`[${processedCount}/${totalFiles}] Uploading ${key}...`);

                try {
                    await this.uploadAsset(shopDomain, accessToken, theme.id, key, file);
                } catch (error) {
                    console.error(`Failed to upload ${key}:`, error.message);
                    // Optional: Add to retry queue or just log error
                }
            }
        };

        const workers = [];
        for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
            workers.push(uploadWorker());
        }

        await Promise.all(workers);

        return {
            success: true,
            themeId: theme.id,
            previewUrl: `https://${shopDomain}/?preview_theme_id=${theme.id}`
        };
    }

    async findFiles(dir, relativePath, list) {
        const files = await fs.readdir(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                await this.findFiles(fullPath, path.join(relativePath, file), list);
            } else {
                list.push(fullPath);
            }
        }
    }
}

export default new ShopifyApiService();

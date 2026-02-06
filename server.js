
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import archiver from 'archiver';

// Import services
// Import services
import downloader from './services/downloader.js';
import shopifyConverter from './services/shopify-converter.js';
import HeadlessConverter from './services/headless-converter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

// ============================================
// API ENDPOINTS
// ============================================

/**
 * POST /api/extract
 * Download entire website from URL
 */
app.post('/api/extract', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        console.log(`Extracting website: ${url}`);
        const result = await downloader.downloadWebsite(url);

        res.json({
            success: true,
            message: 'Website extracted successfully',
            websiteName: result.websiteName,
            path: result.path
        });

    } catch (error) {
        console.error('Extract error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/download-zip/:websiteName?shopify=true
 * Download the zipped code for a site (optionally as Shopify theme)
 */
app.get('/api/download-zip/:websiteName', async (req, res) => {
    try {
        const { websiteName } = req.params;
        const { shopify } = req.query;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        let pathToZip = websitePath;
        let zipFilename = `${websiteName}.zip`;

        // Convert to Shopify theme if requested
        if (shopify === 'true') {
            console.log(`Converting ${websiteName} to Shopify theme...`);

            try {
                const result = await shopifyConverter.convertToShopifyTheme(websitePath, websiteName);
                pathToZip = result.themePath;
                zipFilename = `${websiteName}-shopify-theme.zip`;

                console.log(`✓ Shopify theme ready for download`);
            } catch (conversionError) {
                console.error('Shopify conversion error:', conversionError);
                return res.status(500).json({
                    error: 'Failed to convert to Shopify theme: ' + conversionError.message
                });
            }
        }

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${zipFilename}"`);

        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.directory(pathToZip, false);
        archive.on('error', err => {
            throw err;
        });
        archive.pipe(res);
        await archive.finalize();

        // Clean up temporary Shopify theme folder if created
        if (shopify === 'true' && pathToZip !== websitePath) {
            setTimeout(async () => {
                try {
                    await fs.remove(pathToZip);
                    console.log(`✓ Cleaned up temporary Shopify theme folder`);
                } catch (cleanupError) {
                    console.warn('Failed to cleanup temp folder:', cleanupError.message);
                }
            }, 5000); // Wait 5 seconds to ensure download completes
        }
    } catch (error) {
        console.error('Zip download error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        } else {
            res.end();
        }
    }
});

/**
 * POST /api/deploy-headless
 * Download as Headless Shopify and Deploy to Netlify
 */
app.post('/api/deploy-headless', async (req, res) => {
    try {
        const { websiteName, shopifyConfig, netlifyToken } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Converting ${websiteName} to Headless Shopify...`);

        // 1. Convert to Headless Structure (with dynamic config)
        const conversionResult = await HeadlessConverter.convertToHeadless(websitePath, websiteName, shopifyConfig);

        // 2. If Netlify Token is present, deploy it!
        let deployResult = null;
        if (netlifyToken) {
            console.log('Deploying to Netlify...');
            const netlifyService = await import('./services/netlify-service.js');
            deployResult = await netlifyService.default.deploySite(conversionResult.deployPath, netlifyToken);
        }

        // 3. Zip the deploy folder (for download fallback)
        const zipFilename = `${websiteName}-headless-deploy.zip`;
        const zipPath = path.join(websitePath, '..', zipFilename);

        // Create zip file
        await new Promise((resolve, reject) => {
            const output = fs.createWriteStream(zipPath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            output.on('close', resolve);
            archive.on('error', reject);
            archive.pipe(output);
            archive.directory(conversionResult.deployPath, false);
            archive.finalize();
        });

        // Cleanup deploy folder (optional, keeping zip for now)
        // await fs.remove(conversionResult.deployPath);

        res.json({
            success: true,
            message: 'Conversion successful',
            deploy: deployResult, // Will be null if no token provided
            downloadUrl: `/api/download-file/${zipFilename}` // We'll need a generic download route or use the existing one
        });

    } catch (error) {
        console.error('Headless conversion/deploy error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/download-file/:filename
 * Generic file downloader
 */
app.get('/api/download-file/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'downloads', filename); // Assuming zips are in downloads root based on previous logic

    if (await fs.pathExists(filePath)) {
        res.download(filePath);
    } else {
        // Try looking one level up if not in downloads
        const altPath = path.join(__dirname, 'downloads', '..', filename); // Adjusted based on where zips might be saved
        // Actually, let's fix the zip path in the POST handler to be inside downloads so it's safer
        res.status(404).json({ error: 'File not found' });
    }
});

/**
 * GET /preview/:siteName/*
 * Serve downloaded website files for preview
 */
app.use('/preview/:siteName', (req, res, next) => {
    const siteName = req.params.siteName;
    const sitePath = downloader.getWebsitePath(siteName);

    // Check if site exists
    if (!fs.existsSync(sitePath)) {
        return res.status(404).send('Website not found');
    }

    // Serve static files from the website directory
    const staticMiddleware = express.static(sitePath, {
        setHeaders: (res, filePath) => {
            // Set correct MIME types
            if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            } else if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            } else if (filePath.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json');
            } else if (filePath.endsWith('.html')) {
                res.setHeader('Content-Type', 'text/html');
            } else if (filePath.endsWith('.png')) {
                res.setHeader('Content-Type', 'image/png');
            } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                res.setHeader('Content-Type', 'image/jpeg');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml');
            } else if (filePath.endsWith('.webp')) {
                res.setHeader('Content-Type', 'image/webp');
            } else if (filePath.endsWith('.woff')) {
                res.setHeader('Content-Type', 'font/woff');
            } else if (filePath.endsWith('.woff2')) {
                res.setHeader('Content-Type', 'font/woff2');
            }
        }
    });

    staticMiddleware(req, res, next);
});

// Serve built frontend in production
if (isProduction) {
    // Serve static files from dist directory
    app.use(express.static(path.join(__dirname, 'dist')));

    // Serve index.html for all non-API routes
    app.get('*', (req, res, next) => {
        // Skip API routes and preview routes
        if (req.path.startsWith('/api/') || req.path.startsWith('/preview/')) {
            return next();
        }
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

// Global error handler
app.use((err, req, res, next) => {
    if (err) {
        console.error('Server error:', err);
        return res.status(500).json({
            success: false,
            error: err.message || 'Server error'
        });
    }
    next();
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
    console.log(`📁 Downloads directory: ${path.join(__dirname, 'downloads')}`);
});

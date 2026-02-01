
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs-extra';
import archiver from 'archiver';

// Import services
import downloader from './services/downloader.js';
import modifier from './services/modifier.js';
import NetlifyDeployer from './services/netlify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

// Configure multer for logo uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const websiteName = req.body.websiteName || req.query.websiteName;
        const uploadPath = websiteName
            ? path.join(__dirname, 'downloads', websiteName)
            : path.join(__dirname, 'downloads', '_tmp');
        await fs.ensureDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Keep original extension
        const ext = path.extname(file.originalname);
        cb(null, 'logo' + ext);
    }
});

const upload = multer({ storage });

// ============================================
// API ENDPOINTS
// ============================================

/**
 * GET /api/download-zip/:websiteName
 * Download the zipped code for a site
 */
app.get('/api/download-zip/:websiteName', async (req, res) => {
    try {
        const { websiteName } = req.params;
        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }
        const websitePath = downloader.getWebsitePath(websiteName);
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${websiteName}.zip"`);

        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.directory(websitePath, false);
        archive.on('error', err => {
            throw err;
        });
        archive.pipe(res);
        await archive.finalize();
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
 * POST /api/inject-bundle
 * Inject bundle section into website
 */
app.post('/api/inject-bundle', async (req, res) => {
    try {
        const { websiteName, bundleHtml } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        // Check if website exists
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Injecting bundle into: ${websiteName}`);
        const result = await modifier.injectBundle(websitePath, bundleHtml);

        res.json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Bundle injection error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/site-status
 * Return last modified time for site index.html
 */
app.get('/api/site-status', async (req, res) => {
    try {
        const { websiteName } = req.query;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);
        const indexPath = path.join(websitePath, 'index.html');

        if (!await fs.pathExists(indexPath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const stats = await fs.stat(indexPath);
        res.json({
            success: true,
            lastModified: stats.mtimeMs
        });
    } catch (error) {
        console.error('Site status error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/inject-logo
 * Replace logo in website
 */
app.post('/api/inject-logo', upload.single('logo'), async (req, res) => {
    try {
        const websiteName = req.body.websiteName || req.query.websiteName;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Logo file is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        // Check if website exists
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        const targetLogoPath = path.join(websitePath, req.file.filename);
        if (req.file.path !== targetLogoPath) {
            await fs.move(req.file.path, targetLogoPath, { overwrite: true });
        }

        console.log(`Replacing logo in: ${websiteName}`);
        const result = await modifier.replaceLogo(websitePath, req.file.filename);

        res.json({
            success: true,
            message: result.message,
            logoPath: req.file.filename
        });

    } catch (error) {
        console.error('Logo replacement error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/remove-header-icons
 * Remove header icons and buttons
 */
app.post('/api/remove-header-icons', async (req, res) => {
    try {
        const { websiteName } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        // Check if website exists
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Removing header icons from: ${websiteName}`);
        const result = await modifier.removeHeaderIcons(websitePath);

        res.json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Header icon removal error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/apply-button-redirect
 * Apply button redirect to scroll to specific section
 */
app.post('/api/apply-button-redirect', async (req, res) => {
    try {
        const { websiteName, buttonType, destination } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        if (!buttonType) {
            return res.status(400).json({ error: 'Button type is required' });
        }

        if (!destination) {
            return res.status(400).json({ error: 'Destination is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        // Check if website exists
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Applying button redirect in: ${websiteName}`);
        console.log(`Button: ${buttonType} → Destination: ${destination}`);
        const result = await modifier.applyButtonRedirect(websitePath, buttonType, destination);

        res.json({
            success: true,
            message: result.message
        });

    } catch (error) {
        console.error('Button redirect error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/sites
 * List all downloaded websites
 */
app.get('/api/sites', async (req, res) => {
    try {
        const websites = await downloader.listWebsites();
        res.json({
            success: true,
            websites
        });
    } catch (error) {
        console.error('List sites error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/deploy-netlify
 * Deploy website to Netlify
 */
app.post('/api/deploy-netlify', async (req, res) => {
    try {
        const { websiteName, netlifyToken } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        if (!netlifyToken) {
            return res.status(400).json({ error: 'Netlify token is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        // Check if website exists
        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Deploying ${websiteName} to Netlify...`);
        
        const deployer = new NetlifyDeployer(netlifyToken);
        const result = await deployer.deploySite(websitePath, websiteName);

        res.json({
            success: true,
            message: 'Site deployed successfully!',
            url: result.url,
            siteId: result.siteId,
            deployId: result.deployId,
            adminUrl: result.adminUrl
        });

    } catch (error) {
        console.error('Netlify deployment error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/edit-button-text
 * Edit button text on the website
 */
app.post('/api/edit-button-text', async (req, res) => {
    try {
        const { websiteName, searchText, newText } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        if (!searchText || !newText) {
            return res.status(400).json({ error: 'Search text and new text are required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Editing buttons in: ${websiteName}`);
        const result = await modifier.editButtonText(websitePath, searchText, newText);

        res.json({
            success: true,
            message: result.message,
            modifiedCount: result.count
        });

    } catch (error) {
        console.error('Button edit error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/api/clear-header', async (req, res) => {
    try {
        const { websiteName } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Clearing header in: ${websiteName}`);
        const result = await modifier.clearHeader(websitePath);

        res.json({
            success: true,
            message: result.message,
            clearedElements: result.count
        });

    } catch (error) {
        console.error('Header clearing error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/api/delete-element', async (req, res) => {
    try {
        const { websiteName, selector } = req.body;

        if (!websiteName) {
            return res.status(400).json({ error: 'Website name is required' });
        }

        if (!selector) {
            return res.status(400).json({ error: 'Element selector is required' });
        }

        const websitePath = downloader.getWebsitePath(websiteName);

        if (!await fs.pathExists(websitePath)) {
            return res.status(404).json({ error: 'Website not found' });
        }

        console.log(`Deleting element "${selector}" in: ${websiteName}`);
        const result = await modifier.deleteElement(websitePath, selector);

        res.json({
            success: true,
            message: result.message,
            deletedCount: result.count
        });

    } catch (error) {
        console.error('Element deletion error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /preview/:siteName/*
 * Serve downloaded website files for preview
 */
app.use('/preview/:siteName', (req, res, next) => {
    const siteName = req.params.siteName;
    const sitePath = downloader.getWebsitePath(siteName);
    const requestedPath = req.path;

    // Check if site exists
    if (!fs.existsSync(sitePath)) {
        return res.status(404).send('Website not found');
    }

    if (requestedPath === '/core.min.css') {
        const fallbackCss = path.join(sitePath, 'css', 'core.min.css');
        if (fs.existsSync(fallbackCss)) {
            return res.sendFile(fallbackCss);
        }
    }

    if (requestedPath === '/core.min.js') {
        const fallbackJs = path.join(sitePath, 'js', 'core.min.js');
        if (fs.existsSync(fallbackJs)) {
            return res.sendFile(fallbackJs);
        }
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

// Global error handler (including multer)
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

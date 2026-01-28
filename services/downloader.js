import path from 'path';
import fs from 'fs-extra';
import { URL, fileURLToPath } from 'url';
import websiteScraper from 'website-scraper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Downloader {
    constructor() {
        this.downloadsDir = path.join(__dirname, '../downloads');
    }

    /**
     * Extract website name from URL
     */
    getWebsiteName(url) {
        try {
            const urlObj = new URL(url);
            let name = urlObj.hostname.replace(/^www\./, '');
            // Also include path if it exists
            if (urlObj.pathname && urlObj.pathname !== '/') {
                name += urlObj.pathname.replace(/\//g, '-');
            }
            name = name.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
            name = name.replace(/-+/g, '-').replace(/^-|-$/g, ''); // Clean up multiple dashes
            return name || 'website-' + Date.now();
        } catch (e) {
            return 'website-' + Date.now();
        }
    }

    /**
     * Sanitize filename
     */
    sanitizeFilename(filename) {
        return filename.replace(/[^a-z0-9.-]/gi, '_').substring(0, 100);
    }

    /**
     * Download entire website with all assets
     */
    async downloadWebsite(url) {
        const websiteName = this.getWebsiteName(url);
        const outputPath = path.join(this.downloadsDir, websiteName);

        console.log(`\n========================================`);
        console.log(`Starting download: ${url}`);
        console.log(`Output directory: ${outputPath}`);
        console.log(`========================================\n`);

        // Ensure downloads directory exists
        await fs.ensureDir(this.downloadsDir);

        // Remove existing folder if it exists
        if (await fs.pathExists(outputPath)) {
            console.log('Removing existing folder...');
            await fs.remove(outputPath);
        }

        try {
            console.log('Scraping website with assets...');

            await websiteScraper({
                urls: [url],
                directory: outputPath,
                recursive: false,
                maxDepth: 1,
                request: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Accept-Language': 'en-US,en;q=0.5'
                    }
                }
            });

            await this.ensureIndexFile(outputPath);
            await this.normalizeAssetPaths(outputPath);

            console.log(`\n========================================`);
            console.log(`✓ Download complete: ${websiteName}`);
            console.log(`✓ Files saved to: ${outputPath}`);
            console.log(`========================================\n`);

            return {
                success: true,
                websiteName,
                path: outputPath
            };

        } catch (error) {
            console.error('\n========================================');
            console.error('✗ Download error:', error.message);
            console.error('========================================\n');
            throw new Error(`Failed to download website: ${error.message}`);
        }
    }

    /**
     * List all downloaded websites
     */
    async listWebsites() {
        try {
            await fs.ensureDir(this.downloadsDir);
            const dirs = await fs.readdir(this.downloadsDir);

            const websites = [];
            for (const dir of dirs) {
                const dirPath = path.join(this.downloadsDir, dir);
                const stat = await fs.stat(dirPath);

                if (stat.isDirectory()) {
                    const indexPath = path.join(dirPath, 'index.html');
                    const hasIndex = await fs.pathExists(indexPath);

                    websites.push({
                        name: dir,
                        path: dirPath,
                        hasIndex,
                        created: stat.birthtime
                    });
                }
            }

            return websites;
        } catch (error) {
            console.error('Error listing websites:', error);
            return [];
        }
    }

    /**
     * Get path to a specific website
     */
    getWebsitePath(websiteName) {
        return path.join(this.downloadsDir, websiteName);
    }

    async ensureIndexFile(outputPath) {
        const indexPath = path.join(outputPath, 'index.html');
        if (await fs.pathExists(indexPath)) {
            return;
        }

        const htmlFiles = [];
        await this.findHtmlFiles(outputPath, htmlFiles);
        if (htmlFiles.length === 0) {
            throw new Error('No HTML files found after scraping');
        }

                const targetPath = htmlFiles[0];
                const relativeTarget = path.relative(outputPath, targetPath).split(path.sep).join('/');
                const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${relativeTarget}" />
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="${relativeTarget}">${relativeTarget}</a></p>
</body>
</html>`;
                await fs.writeFile(indexPath, redirectHtml, 'utf-8');
    }

    async findHtmlFiles(dir, result) {
        const entries = await fs.readdir(dir);
        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            const stat = await fs.stat(entryPath);
            if (stat.isDirectory()) {
                await this.findHtmlFiles(entryPath, result);
            } else if (entryPath.endsWith('.html')) {
                result.push(entryPath);
            }
        }
    }

    async normalizeAssetPaths(outputPath) {
        const files = [];
        await this.findFilesByExt(outputPath, files, ['.html', '.css']);

        for (const filePath of files) {
            const content = await fs.readFile(filePath, 'utf-8');
            const updated = content
                .replace(/href="\/(?!\/)/g, 'href="')
                .replace(/src="\/(?!\/)/g, 'src="')
                .replace(/url\(\s*(['"]?)\/(?!\/)/g, 'url($1')
                .replace(/href="core\.min\.css"/g, 'href="css/core.min.css"')
                .replace(/href="\/core\.min\.css"/g, 'href="css/core.min.css"')
                .replace(/src="core\.min\.js"/g, 'src="js/core.min.js"')
                .replace(/src="\/core\.min\.js"/g, 'src="js/core.min.js"')
                .replace(/href="core\.min\.js"/g, 'href="js/core.min.js"')
                .replace(/href="\/core\.min\.js"/g, 'href="js/core.min.js"');

            if (updated !== content) {
                await fs.writeFile(filePath, updated, 'utf-8');
            }
        }
    }

    async findFilesByExt(dir, result, extensions) {
        const entries = await fs.readdir(dir);
        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            const stat = await fs.stat(entryPath);
            if (stat.isDirectory()) {
                await this.findFilesByExt(entryPath, result, extensions);
            } else if (extensions.some((ext) => entryPath.endsWith(ext))) {
                result.push(entryPath);
            }
        }
    }
}

export default new Downloader();

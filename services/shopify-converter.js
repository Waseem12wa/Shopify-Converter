import path from 'path';
import fs from 'fs-extra';
import { JSDOM } from 'jsdom';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';

class ShopifyConverter {
    constructor() {
        this.maxZipSize = 50 * 1024 * 1024; // 50MB
        this.maxAssetSize = 20 * 1024 * 1024; // 20MB
        this.assetMap = new Map(); // Track all assets for reference
    }

    /**
     * Convert downloaded website to Shopify theme structure
     */
    async convertToShopifyTheme(websitePath, websiteName) {
        console.log(`\n========================================`);
        console.log(`Converting to Shopify theme: ${websiteName}`);
        console.log(`========================================\n`);

        const tempThemePath = path.join(websitePath, '..', `${websiteName}-shopify-theme`);

        // Remove existing theme folder if it exists
        if (await fs.pathExists(tempThemePath)) {
            await fs.remove(tempThemePath);
        }

        // Create Shopify theme structure
        await this.createThemeStructure(tempThemePath);

        // Process HTML and extract content
        const indexPath = await this.findIndexFile(websitePath);
        if (!indexPath) {
            throw new Error('No index.html found in website');
        }

        const htmlContent = await fs.readFile(indexPath, 'utf-8');
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        // Extract and process assets FIRST (to build asset map)
        await this.processAssets(websitePath, tempThemePath, document);

        // Create Liquid templates with asset references
        await this.createLiquidTemplates(tempThemePath, document, htmlContent, websitePath);

        // Create config files
        await this.createConfigFiles(tempThemePath, websiteName);

        // Create locale files
        await this.createLocaleFiles(tempThemePath);

        // Create meta-tags snippet
        await this.createMetaTagsSnippet(tempThemePath);

        console.log(`✓ Shopify theme created at: ${tempThemePath}`);

        return {
            success: true,
            themePath: tempThemePath,
            themeName: `${websiteName}-shopify-theme`
        };
    }

    /**
     * Create Shopify theme folder structure
     */
    async createThemeStructure(themePath) {
        const folders = [
            'layout',
            'templates',
            'sections',
            'snippets',
            'assets',
            'config',
            'locales'
        ];

        for (const folder of folders) {
            await fs.ensureDir(path.join(themePath, folder));
        }
    }

    /**
     * Find index.html file
     */
    async findIndexFile(websitePath) {
        const indexPath = path.join(websitePath, 'index.html');
        if (await fs.pathExists(indexPath)) {
            return indexPath;
        }

        // Search for HTML files recursively
        const htmlFiles = [];
        await this.findHtmlFiles(websitePath, htmlFiles);
        return htmlFiles.length > 0 ? htmlFiles[0] : null;
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

    /**
     * Process and copy assets (CSS, JS, images)
     */
    async processAssets(websitePath, themePath, document) {
        const assetsPath = path.join(themePath, 'assets');

        // Find all asset files
        const cssFiles = [];
        const jsFiles = [];
        const imageFiles = [];
        const fontFiles = [];

        await this.findAssetFiles(websitePath, cssFiles, jsFiles, imageFiles, fontFiles);

        // Process CSS files
        for (const cssFile of cssFiles) {
            await this.processCSSFile(cssFile, assetsPath, websitePath);
        }

        // Process JS files
        for (const jsFile of jsFiles) {
            await this.processJSFile(jsFile, assetsPath);
        }

        // Process images
        for (const imageFile of imageFiles) {
            await this.processImageFile(imageFile, assetsPath);
        }

        // Process fonts
        for (const fontFile of fontFiles) {
            await this.processFontFile(fontFile, assetsPath);
        }

        console.log(`✓ Processed ${cssFiles.length} CSS files`);
        console.log(`✓ Processed ${jsFiles.length} JS files`);
        console.log(`✓ Processed ${imageFiles.length} image files`);
        console.log(`✓ Processed ${fontFiles.length} font files`);
    }

    async findAssetFiles(dir, cssFiles, jsFiles, imageFiles, fontFiles) {
        const entries = await fs.readdir(dir);

        for (const entry of entries) {
            const entryPath = path.join(dir, entry);
            const stat = await fs.stat(entryPath);

            if (stat.isDirectory()) {
                await this.findAssetFiles(entryPath, cssFiles, jsFiles, imageFiles, fontFiles);
            } else {
                const ext = path.extname(entry).toLowerCase();
                const filename = path.basename(entryPath);

                if (ext === '.css') {
                    cssFiles.push(entryPath);
                    this.assetMap.set(filename, filename);
                } else if (ext === '.js') {
                    jsFiles.push(entryPath);
                    this.assetMap.set(filename, filename);
                } else if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico', '.bmp'].includes(ext)) {
                    imageFiles.push(entryPath);
                    this.assetMap.set(filename, filename);
                } else if (['.woff', '.woff2', '.ttf', '.eot', '.otf'].includes(ext)) {
                    fontFiles.push(entryPath);
                    this.assetMap.set(filename, filename);
                }
            }
        }
    }

    /**
     * Process CSS file - minify, convert paths, and copy
     */
    async processCSSFile(cssFile, assetsPath, websitePath) {
        try {
            let content = await fs.readFile(cssFile, 'utf-8');
            const originalFilename = path.basename(cssFile);
            const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

            // Convert relative paths in CSS to Shopify asset_url
            content = this.convertCSSPaths(content);

            // Try to minify CSS
            try {
                const minified = new CleanCSS({
                    level: 1, // Less aggressive to avoid breaking
                    compatibility: 'ie9',
                    returnPromise: false
                }).minify(content);

                if (minified.errors.length === 0 && minified.styles) {
                    content = minified.styles;
                }
            } catch (minifyError) {
                console.warn(`CSS minification skipped for ${sanitizedFilename}:`, minifyError.message);
            }

            // Update asset map with both original and sanitized names
            this.assetMap.set(originalFilename, sanitizedFilename);
            this.assetMap.set(sanitizedFilename, sanitizedFilename);

            await fs.writeFile(path.join(assetsPath, sanitizedFilename), content);
        } catch (error) {
            console.warn(`Error processing CSS ${cssFile}:`, error.message);
            // Copy original file as fallback
            const sanitizedFilename = this.sanitizeAssetFilename(path.basename(cssFile));
            await fs.copy(cssFile, path.join(assetsPath, sanitizedFilename));
        }
    }

    /**
     * Convert CSS paths to Shopify asset_url format
     */
    convertCSSPaths(cssContent) {
        // Convert url() references
        cssContent = cssContent.replace(
            /url\s*\(\s*['"]?([^'")\s]+)['"]?\s*\)/gi,
            (match, url) => {
                // Skip external URLs
                if (url.startsWith('http://') || url.startsWith('https://') ||
                    url.startsWith('//') || url.startsWith('data:')) {
                    return match;
                }

                // Extract and sanitize filename from path
                const originalFilename = url.split('/').pop();
                const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

                // Check if this asset exists in our map
                if (this.assetMap.has(originalFilename)) {
                    const mappedFilename = this.assetMap.get(originalFilename);
                    return `url({{ '${mappedFilename}' | asset_url }})`;
                } else if (this.assetMap.has(sanitizedFilename)) {
                    return `url({{ '${sanitizedFilename}' | asset_url }})`;
                }

                return match;
            }
        );

        // Convert @import statements
        cssContent = cssContent.replace(
            /@import\s+(['"])([^'"]+)\1/gi,
            (match, quote, url) => {
                if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
                    return match;
                }

                const originalFilename = url.split('/').pop();
                const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

                if (this.assetMap.has(originalFilename)) {
                    const mappedFilename = this.assetMap.get(originalFilename);
                    return `@import {{ '${mappedFilename}' | asset_url }}`;
                } else if (this.assetMap.has(sanitizedFilename)) {
                    return `@import {{ '${sanitizedFilename}' | asset_url }}`;
                }

                return match;
            }
        );

        return cssContent;
    }

    /**
     * Process JS file - minify and copy with sanitized filename
     */
    async processJSFile(jsFile, assetsPath) {
        try {
            const content = await fs.readFile(jsFile, 'utf-8');
            const originalFilename = path.basename(jsFile);
            const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

            // Update asset map
            this.assetMap.set(originalFilename, sanitizedFilename);
            this.assetMap.set(sanitizedFilename, sanitizedFilename);

            // Skip if already minified
            if (sanitizedFilename.includes('.min.')) {
                await fs.copy(jsFile, path.join(assetsPath, sanitizedFilename));
                return;
            }

            // Try to minify JS (but don't fail if it doesn't work)
            try {
                const minified = await minifyJS(content, {
                    compress: {
                        dead_code: true,
                        drop_console: false, // Keep console for debugging
                        drop_debugger: false
                    },
                    mangle: false, // Don't mangle to avoid breaking
                    format: {
                        comments: false
                    }
                });

                if (minified.code) {
                    await fs.writeFile(path.join(assetsPath, sanitizedFilename), minified.code);
                } else {
                    await fs.writeFile(path.join(assetsPath, sanitizedFilename), content);
                }
            } catch (minifyError) {
                console.warn(`JS minification skipped for ${sanitizedFilename}:`, minifyError.message);
                await fs.writeFile(path.join(assetsPath, sanitizedFilename), content);
            }
        } catch (error) {
            console.warn(`Error processing JS ${jsFile}:`, error.message);
            const sanitizedFilename = this.sanitizeAssetFilename(path.basename(jsFile));
            await fs.copy(jsFile, path.join(assetsPath, sanitizedFilename));
        }
    }

    /**
     * Process image file - copy to assets with sanitized filename
     */
    async processImageFile(imageFile, assetsPath) {
        try {
            const stat = await fs.stat(imageFile);

            // Check file size
            if (stat.size > this.maxAssetSize) {
                console.warn(`Image ${path.basename(imageFile)} exceeds 20MB, skipping`);
                return;
            }

            const originalFilename = path.basename(imageFile);
            const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

            // Update asset map with both original and sanitized names
            this.assetMap.set(originalFilename, sanitizedFilename);
            this.assetMap.set(sanitizedFilename, sanitizedFilename);

            await fs.copy(imageFile, path.join(assetsPath, sanitizedFilename));
        } catch (error) {
            console.warn(`Error processing image ${imageFile}:`, error.message);
        }
    }

    /**
     * Process font file - copy to assets
     */
    async processFontFile(fontFile, assetsPath) {
        try {
            const filename = path.basename(fontFile);
            await fs.copy(fontFile, path.join(assetsPath, filename));
        } catch (error) {
            console.warn(`Error processing font ${fontFile}:`, error.message);
        }
    }

    /**
     * Create Liquid templates
     */
    async createLiquidTemplates(themePath, document, originalHTML, websitePath) {
        // Extract head and body content
        const headContent = this.extractHeadContent(document);
        const bodyContent = this.extractBodyContent(document);
        const bodyAttributes = this.extractBodyAttributes(document);

        // Collect and inline ALL CSS
        const cssFiles = [];
        await this.findAssetFiles(websitePath, cssFiles, [], [], []);
        const inlinedCSS = await this.inlineAllCSS(cssFiles, websitePath);

        // Create layout/theme.liquid with inlined CSS
        const themeLiquid = this.generateThemeLiquid(headContent, bodyAttributes, inlinedCSS);
        await fs.writeFile(
            path.join(themePath, 'layout', 'theme.liquid'),
            themeLiquid
        );

        // Create templates/index.liquid (homepage)
        const indexLiquid = this.generateIndexLiquid(bodyContent);
        await fs.writeFile(
            path.join(themePath, 'templates', 'index.liquid'),
            indexLiquid
        );

        // Create templates/page.liquid (standard page template)
        const pageLiquid = this.generatePageLiquid(bodyContent);
        await fs.writeFile(
            path.join(themePath, 'templates', 'page.liquid'),
            pageLiquid
        );

        // Create templates/product.liquid (for product pages)
        const productLiquid = this.generateProductLiquid();
        await fs.writeFile(
            path.join(themePath, 'templates', 'product.liquid'),
            productLiquid
        );

        // Create templates/collection.liquid (for collection pages)
        const collectionLiquid = this.generateCollectionLiquid();
        await fs.writeFile(
            path.join(themePath, 'templates', 'collection.liquid'),
            collectionLiquid
        );

        // Create templates/404.liquid (error page)
        const notFoundLiquid = this.generate404Liquid();
        await fs.writeFile(
            path.join(themePath, 'templates', '404.liquid'),
            notFoundLiquid
        );

        // Create templates/cart.liquid (cart page)
        const cartLiquid = this.generateCartLiquid();
        await fs.writeFile(
            path.join(themePath, 'templates', 'cart.liquid'),
            cartLiquid
        );

        // Create sections/main-clone.liquid with actual content
        const sectionLiquid = this.generateSectionLiquid(bodyContent);
        await fs.writeFile(
            path.join(themePath, 'sections', 'main-clone.liquid'),
            sectionLiquid
        );

        console.log(`✓ Created Liquid templates`);
    }

    /**
     * Extract body attributes (class, id, data-*, etc.)
     */
    extractBodyAttributes(document) {
        const body = document.querySelector('body');
        if (!body) return '';

        const attributes = [];
        for (const attr of body.attributes) {
            if (attr.name !== 'class') { // Handle class separately
                attributes.push(`${attr.name}="${attr.value}"`);
            }
        }

        return attributes.join(' ');
    }

    /**
     * Extract head content and convert to Liquid
     */
    extractHeadContent(document) {
        const head = document.querySelector('head');
        if (!head) return '';

        let headHTML = head.innerHTML;

        // Convert CSS links to Shopify asset_url
        headHTML = headHTML.replace(
            /<link([^>]*?)href=["']([^"']*?\.css[^"']*)["']([^>]*?)>/gi,
            (match, before, href, after) => {
                // Skip external URLs
                if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
                    return match;
                }

                const filename = href.split('/').pop().split('?')[0];
                if (this.assetMap.has(filename)) {
                    return `<link${before}href="{{ '${filename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // Convert JS script tags to Shopify asset_url
        headHTML = headHTML.replace(
            /<script([^>]*?)src=["']([^"']*?\.js[^"']*)["']([^>]*?)>/gi,
            (match, before, src, after) => {
                // Skip external URLs
                if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
                    return match;
                }

                const filename = src.split('/').pop().split('?')[0];
                if (this.assetMap.has(filename)) {
                    return `<script${before}src="{{ '${filename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // Convert favicon and other image links
        headHTML = headHTML.replace(
            /<link([^>]*?)href=["']([^"']*?\.(png|jpg|jpeg|ico|svg)[^"']*)["']([^>]*?)>/gi,
            (match, before, href, ext, after) => {
                if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
                    return match;
                }

                const filename = href.split('/').pop().split('?')[0];
                if (this.assetMap.has(filename)) {
                    return `<link${before}href="{{ '${filename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // Convert inline style URLs
        headHTML = this.convertInlineStyleURLs(headHTML);

        return headHTML;
    }

    /**
     * Sanitize asset filename to prevent 404 errors
     */
    sanitizeAssetFilename(url) {
        // Extract filename from URL
        let filename = url.split('/').pop();

        // Remove query strings (?v=123)
        filename = filename.split('?')[0];

        // Remove URL fragments (#section)
        filename = filename.split('#')[0];

        // Replace special characters with underscores
        filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

        // Remove multiple consecutive underscores
        filename = filename.replace(/_+/g, '_');

        // Ensure filename isn't empty
        if (!filename || filename === '_') {
            filename = 'asset_' + Date.now();
        }

        return filename;
    }

    /**
     * Inline all CSS content into a single style tag
     */
    async inlineAllCSS(cssFiles, websitePath) {
        let combinedCSS = '';

        for (const cssFile of cssFiles) {
            try {
                let content = await fs.readFile(cssFile, 'utf-8');

                // Convert relative paths in CSS to asset_url
                content = this.convertCSSPaths(content);

                combinedCSS += `\n/* ${path.basename(cssFile)} */\n${content}\n`;
            } catch (error) {
                console.warn(`Failed to read CSS file ${cssFile}:`, error.message);
            }
        }

        return combinedCSS;
    }

    /**
     * Remove complex JavaScript that won't work in Shopify
     */
    removeComplexScripts(html) {
        // Remove external script tags
        html = html.replace(/<script[^>]*src=["'][^"']*["'][^>]*>[\s\S]*?<\/script>/gi, '');

        // Remove inline scripts (keep only if very simple)
        html = html.replace(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi, '');

        // Remove inline event handlers
        html = html.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');

        return html;
    }

    /**
     * Extract body content and convert to Liquid
     */
    extractBodyContent(document) {
        const body = document.querySelector('body');
        if (!body) return '';

        let bodyHTML = body.innerHTML;

        // Convert image sources to Shopify asset_url
        bodyHTML = bodyHTML.replace(
            /<img([^>]*?)src=["']([^"']+?)["']([^>]*?)>/gi,
            (match, before, src, after) => {
                // Skip external URLs and data URIs
                if (src.startsWith('http://') || src.startsWith('https://') ||
                    src.startsWith('//') || src.startsWith('data:')) {
                    return match;
                }

                const originalFilename = src.split('/').pop();
                const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

                if (this.assetMap.has(originalFilename)) {
                    const mappedFilename = this.assetMap.get(originalFilename);
                    return `<img${before}src="{{ '${mappedFilename}' | asset_url }}"${after}>`;
                } else if (this.assetMap.has(sanitizedFilename)) {
                    return `<img${before}src="{{ '${sanitizedFilename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // Convert srcset attributes
        bodyHTML = bodyHTML.replace(
            /srcset=["']([^"']+)["']/gi,
            (match, srcset) => {
                const converted = srcset.split(',').map(src => {
                    const parts = src.trim().split(/\s+/);
                    const url = parts[0];

                    if (url.startsWith('http://') || url.startsWith('https://') ||
                        url.startsWith('//') || url.startsWith('data:')) {
                        return src;
                    }

                    const originalFilename = url.split('/').pop();
                    const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

                    if (this.assetMap.has(originalFilename)) {
                        const mappedFilename = this.assetMap.get(originalFilename);
                        parts[0] = `{{ '${mappedFilename}' | asset_url }}`;
                        return parts.join(' ');
                    } else if (this.assetMap.has(sanitizedFilename)) {
                        parts[0] = `{{ '${sanitizedFilename}' | asset_url }}`;
                        return parts.join(' ');
                    }
                    return src;
                }).join(', ');

                return `srcset="${converted}"`;
            }
        );

        // Convert data-src (lazy loading)
        bodyHTML = bodyHTML.replace(
            /data-src=["']([^"']+)["']/gi,
            (match, src) => {
                if (src.startsWith('http://') || src.startsWith('https://') ||
                    src.startsWith('//') || src.startsWith('data:')) {
                    return match;
                }

                const originalFilename = src.split('/').pop();
                const sanitizedFilename = this.sanitizeAssetFilename(originalFilename);

                if (this.assetMap.has(originalFilename)) {
                    const mappedFilename = this.assetMap.get(originalFilename);
                    return `data-src="{{ '${mappedFilename}' | asset_url }}"`;
                } else if (this.assetMap.has(sanitizedFilename)) {
                    return `data-src="{{ '${sanitizedFilename}' | asset_url }}"`;
                }
                return match;
            }
        );

        // Convert background images in inline styles
        bodyHTML = this.convertInlineStyleURLs(bodyHTML);

        // Convert JS script tags in body
        bodyHTML = bodyHTML.replace(
            /<script([^>]*?)src=["']([^"']*?\.js[^"']*)["']([^>]*?)>/gi,
            (match, before, src, after) => {
                if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
                    return match;
                }

                const filename = src.split('/').pop().split('?')[0];
                if (this.assetMap.has(filename)) {
                    return `<script${before}src="{{ '${filename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // Convert video/audio sources
        bodyHTML = bodyHTML.replace(
            /<(source|video|audio)([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi,
            (match, tag, before, src, after) => {
                if (src.startsWith('http://') || src.startsWith('https://') ||
                    src.startsWith('//') || src.startsWith('data:')) {
                    return match;
                }

                const filename = src.split('/').pop().split('?')[0];
                if (this.assetMap.has(filename)) {
                    return `<${tag}${before}src="{{ '${filename}' | asset_url }}"${after}>`;
                }
                return match;
            }
        );

        // **NEW: Convert Add to Cart buttons to Shopify forms**
        bodyHTML = this.convertCartButtons(bodyHTML);

        return bodyHTML;
    }

    /**
     * Convert Add to Cart buttons to Shopify cart forms
     */
    convertCartButtons(html) {
        let buttonIndex = 0;

        // Find buttons with "add to cart", "buy now", "purchase" text
        html = html.replace(
            /<(button|a)([^>]*?)>(.*?)<\/(button|a)>/gis,
            (match, tag, attributes, content, closingTag) => {
                const lowerContent = content.toLowerCase();
                const lowerAttrs = attributes.toLowerCase();

                // Check if this is likely a cart button
                const isCartButton =
                    lowerContent.includes('add to cart') ||
                    lowerContent.includes('buy now') ||
                    lowerContent.includes('purchase') ||
                    lowerContent.includes('add to bag') ||
                    lowerAttrs.includes('cart') ||
                    lowerAttrs.includes('buy');

                if (isCartButton) {
                    buttonIndex++;
                    const productIdSetting = `product_id_${buttonIndex}`;

                    // Preserve original classes and styling
                    const classMatch = attributes.match(/class=["']([^"']*)["']/i);
                    const styleMatch = attributes.match(/style=["']([^"']*)["']/i);
                    const idMatch = attributes.match(/id=["']([^"']*)["']/i);

                    const classes = classMatch ? classMatch[1] : '';
                    const style = styleMatch ? styleMatch[1] : '';
                    const id = idMatch ? idMatch[1] : `cart-button-${buttonIndex}`;

                    // Generate Shopify cart form
                    return `<form action="/cart/add" method="post" class="shopify-cart-form" data-button-index="${buttonIndex}">
  <input type="hidden" name="id" value="{{ settings.${productIdSetting} }}" data-product-id="${buttonIndex}">
  <button type="submit" class="${classes}" style="${style}" id="${id}">
    ${content}
  </button>
</form>`;
                }

                return match;
            }
        );

        // Store button count for settings generation
        this.cartButtonCount = buttonIndex;

        return html;
    }

    /**
     * Convert URLs in inline style attributes
     */
    convertInlineStyleURLs(html) {
        return html.replace(
            /style=["']([^"']*?)["']/gi,
            (match, styleContent) => {
                const converted = styleContent.replace(
                    /url\s*\(\s*['"]?([^'")\s]+)['"]?\s*\)/gi,
                    (urlMatch, url) => {
                        if (url.startsWith('http://') || url.startsWith('https://') ||
                            url.startsWith('//') || url.startsWith('data:')) {
                            return urlMatch;
                        }

                        const filename = url.split('/').pop().split('?')[0];
                        if (this.assetMap.has(filename)) {
                            return `url({{ '${filename}' | asset_url }})`;
                        }
                        return urlMatch;
                    }
                );
                return `style="${converted}"`;
            }
        );
    }

    /**
     * Generate theme.liquid layout file with inlined CSS
     */
    generateThemeLiquid(headContent, bodyAttributes, inlinedCSS = '') {
        return `<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="">
  <link rel="canonical" href="{{ canonical_url }}">
  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>

  {%- if settings.favicon != blank -%}
    <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
  {%- endif -%}

  <title>
    {{ page_title }}
    {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
    {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
  </title>

  {% if page_description %}
    <meta name="description" content="{{ page_description | escape }}">
  {% endif %}

  {% render 'meta-tags' %}

  ${headContent}

  <!-- Inlined CSS for guaranteed loading -->
  ${inlinedCSS ? `<style>\n${inlinedCSS}\n  </style>` : ''}

  {{ content_for_header }}

  <script>document.documentElement.className = document.documentElement.className.replace('no-js', 'js');</script>
</head>

<body class="template-{{ template.name }}" ${bodyAttributes}>
  <a class="skip-to-content-link button visually-hidden" href="#MainContent">
    {{ "accessibility.skip_to_text" | t }}
  </a>

  {{ content_for_layout }}

  <ul hidden>
    <li id="a11y-refresh-page-message">{{ 'accessibility.refresh_page' | t }}</li>
  </ul>

  <script>
    window.shopUrl = '{{ request.origin }}';
    window.routes = {
      cart_add_url: '{{ routes.cart_add_url }}',
      cart_change_url: '{{ routes.cart_change_url }}',
      cart_update_url: '{{ routes.cart_update_url }}',
      predictive_search_url: '{{ routes.predictive_search_url }}'
    };

    window.cartStrings = {
      error: {{ 'sections.cart.cart_error' | t | json }},
      quantityError: {{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' | json }}
    }

    window.variantStrings = {
      addToCart: {{ 'products.product.add_to_cart' | t | json }},
      soldOut: {{ 'products.product.sold_out' | t | json }},
      unavailable: {{ 'products.product.unavailable' | t | json }},
    }
  </script>
</body>
</html>`;
    }

    /**
     * Generate index.liquid template (homepage) - Simple approach
     */
    generateIndexLiquid(bodyContent) {
        // Simple Liquid template that renders content directly
        return `<div id="MainContent" class="content-for-layout" role="main">
  <div class="page-width">
${bodyContent}
  </div>
</div>`;
    }

    /**
     * Generate page.liquid template - Simple approach
     */
    generatePageLiquid(bodyContent) {
        // Simple Liquid template that renders content directly
        return `<div id="MainContent" class="content-for-layout" role="main">
  <div class="page-width">
    <h1>{{ page.title }}</h1>
${bodyContent}
  </div>
</div>`;
    }

    /**
     * Generate main-clone.liquid section (for theme editor)
     */
    generateSectionLiquid(bodyContent) {
        return `<div class="shopify-section section-clone">
  <div id="MainContent" class="content-for-layout">
    <div class="page-width">
      <div class="clone-content">
${bodyContent}
      </div>
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Cloned Content",
  "tag": "section",
  "class": "section-clone",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "default": "Cloned Content"
    }
  ]
}
{% endschema %}`;
    }

    /**
     * Generate product.liquid template
     */
    generateProductLiquid() {
        return `<div id="MainContent" class="content-for-layout">
  {% section 'main-clone' %}
  
  <div class="product-placeholder" style="padding: 2rem; text-align: center; background: #f5f5f5; margin: 2rem 0;">
    <h2>Product Template</h2>
    <p>This is a placeholder for Shopify product pages.</p>
    <p>You can customize this template in the Shopify theme editor.</p>
  </div>
</div>`;
    }

    /**
     * Generate collection.liquid template
     */
    generateCollectionLiquid() {
        return `<div id="MainContent" class="content-for-layout">
  {% section 'main-clone' %}
  
  <div class="collection-placeholder" style="padding: 2rem; text-align: center; background: #f5f5f5; margin: 2rem 0;">
    <h2>Collection Template</h2>
    <p>This is a placeholder for Shopify collection pages.</p>
    <p>You can customize this template in the Shopify theme editor.</p>
  </div>
</div>`;
    }

    /**
     * Generate 404.liquid template
     */
    generate404Liquid() {
        return `<div id="MainContent" class="content-for-layout">
  <div class="page-width" style="padding: 4rem 2rem; text-align: center;">
    <h1>{{ 'general.404.title' | t }}</h1>
    <p>{{ 'general.404.subtext' | t }}</p>
    <a href="/" class="button" style="display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: #000; color: #fff; text-decoration: none;">
      Continue shopping
    </a>
  </div>
</div>`;
    }

    /**
     * Generate cart.liquid template
     */
    generateCartLiquid() {
        return `<div id="MainContent" class="content-for-layout">
  <div class="page-width" style="padding: 2rem;">
    <h1>Shopping Cart</h1>
    
    {% if cart.item_count > 0 %}
      <form action="{{ routes.cart_url }}" method="post">
        {% for item in cart.items %}
          <div class="cart-item" style="padding: 1rem; border-bottom: 1px solid #eee;">
            <h3>{{ item.product.title }}</h3>
            <p>Price: {{ item.price | money }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </div>
        {% endfor %}
        
        <div class="cart-footer" style="margin-top: 2rem; text-align: right;">
          <p><strong>Total: {{ cart.total_price | money }}</strong></p>
          <button type="submit" name="checkout" style="padding: 1rem 2rem; background: #000; color: #fff; border: none; cursor: pointer;">
            Checkout
          </button>
        </div>
      </form>
    {% else %}
      <p>Your cart is empty.</p>
      <a href="/" style="display: inline-block; margin-top: 1rem;">Continue shopping</a>
    {% endif %}
  </div>
</div>`;
    }

    /**
     * Create config files
     */
    async createConfigFiles(themePath, websiteName) {
        // Create settings_schema.json
        const settingsSchema = [
            {
                "name": "theme_info",
                "theme_name": websiteName,
                "theme_version": "1.0.0",
                "theme_author": "Website Clone Tool",
                "theme_documentation_url": "",
                "theme_support_url": ""
            },
            {
                "name": "Colors",
                "settings": [
                    {
                        "type": "header",
                        "content": "Theme Colors"
                    }
                ]
            },
            {
                "name": "Typography",
                "settings": [
                    {
                        "type": "header",
                        "content": "Font Settings"
                    }
                ]
            }
        ];

        await fs.writeFile(
            path.join(themePath, 'config', 'settings_schema.json'),
            JSON.stringify(settingsSchema, null, 2)
        );

        // Create settings_data.json
        const settingsData = {
            "current": {
                "sections": {
                    "main-clone": {
                        "type": "main-clone"
                    }
                }
            }
        };

        await fs.writeFile(
            path.join(themePath, 'config', 'settings_data.json'),
            JSON.stringify(settingsData, null, 2)
        );

        console.log(`✓ Created config files`);
    }

    /**
     * Create locale files
     */
    async createLocaleFiles(themePath) {
        const localeData = {
            "general": {
                "404": {
                    "title": "Page not found",
                    "subtext": "The page you requested does not exist."
                }
            },
            "accessibility": {
                "skip_to_text": "Skip to content",
                "refresh_page": "Choosing a selection results in a full page refresh."
            },
            "sections": {
                "cart": {
                    "cart_error": "There was an error updating your cart. Please try again.",
                    "cart_quantity_error_html": "You can only add [quantity] of this item to your cart."
                }
            },
            "products": {
                "product": {
                    "add_to_cart": "Add to cart",
                    "sold_out": "Sold out",
                    "unavailable": "Unavailable"
                }
            }
        };

        await fs.writeFile(
            path.join(themePath, 'locales', 'en.default.json'),
            JSON.stringify(localeData, null, 2)
        );

        console.log(`✓ Created locale files`);
    }

    /**
     * Create meta-tags snippet
     */
    async createMetaTagsSnippet(themePath) {
        const metaTags = `{%- comment -%}
  Meta tags for SEO and social sharing
{%- endcomment -%}

<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="website">
<meta property="og:description" content="{{ page_description | default: shop.description | default: shop.name }}">

{%- if settings.share_image -%}
  <meta property="og:image" content="http:{{ settings.share_image | image_url: width: 1200 }}">
  <meta property="og:image:secure_url" content="https:{{ settings.share_image | image_url: width: 1200 }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{%- endif -%}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page_title | default: shop.name }}">
<meta name="twitter:description" content="{{ page_description | default: shop.description | default: shop.name }}">`;

        await fs.writeFile(
            path.join(themePath, 'snippets', 'meta-tags.liquid'),
            metaTags
        );
    }

    /**
     * Create settings_schema.json with product ID fields
     */
    async createSettingsSchema(themePath) {
        const buttonCount = this.cartButtonCount || 0;

        const settings = [
            {
                "name": "theme_info",
                "theme_name": "Cloned Theme",
                "theme_version": "1.0.0",
                "theme_author": "Shopify Converter",
                "theme_documentation_url": "",
                "theme_support_url": ""
            },
            {
                "name": "Product Mappings",
                "settings": [
                    {
                        "type": "header",
                        "content": "Add to Cart Button Configuration"
                    },
                    {
                        "type": "paragraph",
                        "content": `Found ${buttonCount} Add to Cart button(s). Enter the Shopify product variant ID for each button below. You can find variant IDs in your Shopify admin under Products.`
                    }
                ]
            }
        ];

        // Add a setting for each cart button
        for (let i = 1; i <= buttonCount; i++) {
            settings[1].settings.push({
                "type": "text",
                "id": `product_id_${i}`,
                "label": `Product Variant ID for Button ${i}`,
                "default": "",
                "info": "Enter the Shopify product variant ID (numeric)"
            });
        }

        // Add general theme settings
        settings.push({
            "name": "General",
            "settings": [
                {
                    "type": "header",
                    "content": "General Settings"
                },
                {
                    "type": "image_picker",
                    "id": "favicon",
                    "label": "Favicon"
                }
            ]
        });

        await fs.writeFile(
            path.join(themePath, 'config', 'settings_schema.json'),
            JSON.stringify(settings, null, 2)
        );

        console.log(`✓ Created settings schema with ${buttonCount} product ID field(s)`);
    }
}

export default new ShopifyConverter();

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Modifier {
    constructor() {
        this.templatesDir = path.join(__dirname, '../templates');
        this.testDir = path.join(__dirname, '../Test');
    }

    /**
     * Read HTML file and return Cheerio instance
     */
    async loadHTML(htmlPath) {
        const html = await fs.readFile(htmlPath, 'utf-8');
        return cheerio.load(html);
    }

    /**
     * Save Cheerio instance back to HTML file
     */
    async saveHTML($, htmlPath) {
        await fs.writeFile(htmlPath, $.html(), 'utf-8');
    }

    /**
     * Find FAQ section in the HTML
     * Returns the FAQ element or null
     */
    findFAQSection($) {
        // Try multiple selectors to find FAQ
        const selectors = [
            '[id*="faq" i]',
            '[class*="faq" i]',
            '[id*="question" i]',
            '[class*="question" i]',
            '[class*="accordion" i]',
            'section:has(h1:contains("FAQ"))',
            'section:has(h2:contains("FAQ"))',
            'section:has(h3:contains("FAQ"))',
            'section:has(h4:contains("FAQ"))',
            'div:has(h1:contains("FAQ"))',
            'div:has(h2:contains("FAQ"))',
            'div:has(h3:contains("FAQ"))',
            'div:has(h4:contains("FAQ"))',
            'section:has(h1:contains("Questions"))',
            'section:has(h2:contains("Questions"))',
            'section:has(h3:contains("Questions"))',
            'section:has(h4:contains("Questions"))',
            'div:has(h1:contains("Questions"))',
            'div:has(h2:contains("Questions"))',
            'div:has(h3:contains("Questions"))',
            'div:has(h4:contains("Questions"))',
            'section:has(h1:contains("Frequently Asked"))',
            'section:has(h2:contains("Frequently Asked"))',
            'section:has(h3:contains("Frequently Asked"))',
            'section:has(h4:contains("Frequently Asked"))',
            'div:has(h1:contains("Frequently Asked"))',
            'div:has(h2:contains("Frequently Asked"))',
            'div:has(h3:contains("Frequently Asked"))',
            'div:has(h4:contains("Frequently Asked"))',
            'div[class*="faq"]',
            'div[id*="faq"]',
            '[data-section-type*="faq" i]',
            '[data-type*="faq" i]',
            '[data-section-id*="faq" i]'
        ];

        for (const selector of selectors) {
            try {
                const element = $(selector).first();
                if (element.length > 0) {
                    console.log(`✓ Found FAQ section with selector: ${selector}`);
                    return element;
                }
            } catch (e) {
                // Selector might be invalid, continue
            }
        }

        // Additional search: look for headings with FAQ-related text
        console.log('Searching through all headings for FAQ text...');
        const headings = $('h1, h2, h3, h4, h5, h6');
        for (let i = 0; i < headings.length; i++) {
            const heading = $(headings[i]);
            const text = heading.text().toLowerCase();
            if (text.includes('faq') || text.includes('frequently asked') || text.includes('questions')) {
                console.log(`✓ Found FAQ heading: "${heading.text()}"`);
                return heading.closest('section, div[class], div[id]').length > 0 
                    ? heading.closest('section, div[class], div[id]') 
                    : heading.parent();
            }
        }

        console.log('⚠ FAQ section not found with any selector');
        return null;
        for (let i = 0; i < allSections.length; i++) {
            const $section = $(allSections[i]);
            const text = $section.text().toLowerCase();
            const id = ($section.attr('id') || '').toLowerCase();
            const className = ($section.attr('class') || '').toLowerCase();
            
            // Check if this looks like an FAQ section
            const hasFAQText = text.includes('frequently asked') || text.includes('common question');
            const hasFAQInAttributes = id.includes('faq') || className.includes('faq') || 
                                      id.includes('question') || className.includes('question');
            
            if (hasFAQText || hasFAQInAttributes) {
                console.log(`Found FAQ section by content search:`, id || className || 'unnamed');
                return $section;
            }
        }

        console.log('No FAQ section found');
        return null;
    }

    findExistingBundleSection($) {
        const bundleSelectors = [
            '#bundle-section',
            '.pricing-grid',
            '[id*="bundle" i]',
            '[class*="bundle" i]',
            'section:has(h2:contains("Bundle"))',
            'section:has(h2:contains("Bundle & Save"))',
            'section:has(h3:contains("Bundle"))'
        ];

        for (const selector of bundleSelectors) {
            try {
                const element = $(selector).first();
                if (element.length > 0) {
                    return element;
                }
            } catch (e) {
                // ignore invalid selectors
            }
        }

        return null;
    }

    findCardSection($) {
        const cardSelectors = [
            '.pricing-grid',
            '.product-grid',
            '.product-grid__item',
            '[class*="product-grid" i]',
            '[class*="pricing" i]',
            '[class*="bundle" i] .card',
            '[class*="bundle" i] [class*="card" i]'
        ];

        for (const selector of cardSelectors) {
            try {
                const element = $(selector).first();
                if (element.length > 0) {
                    return element;
                }
            } catch (e) {
                // ignore invalid selectors
            }
        }

        return null;
    }

    findFAQInsertTarget($) {
        const faqSection = this.findFAQSection($);
        if (!faqSection || faqSection.length === 0) {
            return null;
        }

        const itemSelectors = [
            '[class*="accordion" i] > *',
            '[class*="accordion" i] [class*="item" i]',
            '[class*="faq" i] [class*="item" i]',
            '[class*="faq" i] [class*="question" i]',
            '[class*="faq" i] [class*="accordion" i] > *'
        ];

        for (const selector of itemSelectors) {
            try {
                const items = faqSection.find(selector);
                if (items.length > 0) {
                    const lastItem = items.last();
                    const container = lastItem.closest('section, div');
                    return container.length > 0 ? container : lastItem;
                }
            } catch (e) {
                // ignore invalid selectors
            }
        }

        const faqContainer = faqSection.closest('section, div');
        return faqContainer.length > 0 ? faqContainer : faqSection;
    }

    /**
     * Inject bundle section BEFORE FAQ
     */
    async injectBundle(websitePath, bundleHtml) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);

            const bundleSection = await this.getBundleSectionHtml(bundleHtml);
            if (!bundleSection) {
                throw new Error('Bundle section not found');
            }

            // Remove any existing injected bundles first
            console.log('🧹 Removing any existing bundles...');
            $('#bundle-section').remove();
            $('.injected-bundle-wrapper').remove();
            $('.offer-container').remove();
            
            // STEP 1: Search for FAQ text and inject above it
            console.log('📍 STEP 1: Searching for FAQ section...');
            const faqElement = this.findFAQSection($);
            
            if (faqElement && faqElement.length > 0) {
                console.log('✅ FAQ found! Injecting bundle RIGHT BEFORE the FAQ element...');
                faqElement.before(bundleSection);
                console.log('✓ Bundle successfully injected before FAQ');
            } else {
                // STEP 2: No FAQ found, look for existing product cards/bundles to replace
                console.log('📍 STEP 2: FAQ not found. Searching for existing product cards/bundles...');
                
                const cardSection = this.findCardSection($);
                if (cardSection && cardSection.length > 0) {
                    console.log('✅ Found existing cards! Replacing them with new bundle...');
                    // Find the parent container of the cards
                    const cardContainer = cardSection.closest('section, div[class], div[id]').first();
                    if (cardContainer.length > 0) {
                        cardContainer.replaceWith(bundleSection);
                        console.log('✓ Replaced existing card container with bundle');
                    } else {
                        cardSection.replaceWith(bundleSection);
                        console.log('✓ Replaced existing cards with bundle');
                    }
                } else {
                    // STEP 3: Fallback - inject before footer
                    console.log('📍 STEP 3: No cards found. Injecting before footer...');
                    const footer = $('footer').first();
                    if (footer.length > 0) {
                        footer.before(bundleSection);
                        console.log('✓ Bundle injected before footer');
                    } else {
                        // Last resort: inject after main content
                        const main = $('main, [role="main"], .main, #main').first();
                        if (main.length > 0) {
                            main.append(bundleSection);
                            console.log('✓ Bundle appended to main content');
                        } else {
                            $('body').append(bundleSection);
                            console.log('✓ Bundle appended to body');
                        }
                    }
                }
            }

            await this.ensureBundleAssets(websitePath);

            // Inject CSS links in head
            const head = $('head');
            if (head.find('link[href="bundle.css"]').length === 0) {
                head.append('<link rel="stylesheet" href="bundle.css">');
            }
            if (head.find('link[href="mobile-fix.css"]').length === 0) {
                head.append('<link rel="stylesheet" href="mobile-fix.css">');
            }

            this.ensureBundleTimerScript($);

            // Save modified HTML
            await this.saveHTML($, indexPath);

            return {
                success: true,
                message: 'Bundle section injected successfully'
            };

        } catch (error) {
            console.error('Error injecting bundle:', error);
            throw new Error(`Failed to inject bundle: ${error.message}`);
        }
    }

    async getBundleSectionHtml(bundleHtml) {
        if (bundleHtml) {
            const $bundle = cheerio.load(bundleHtml);
            
            console.log('Processing bundle HTML for injection...');
            
            // Remove contenteditable attributes
            const editableCount = $bundle('[contenteditable]').length;
            $bundle('[contenteditable]').each((_, el) => {
                $bundle(el).removeAttr('contenteditable');
            });
            console.log(`Removed contenteditable from ${editableCount} elements`);
            
            // AGGRESSIVE removal of ALL close/remove buttons
            let removedButtons = 0;
            
            // 1. Direct removal by class
            removedButtons += $bundle('.card-remove').length;
            $bundle('.card-remove').remove();
            removedButtons += $bundle('.close-btn').length;
            $bundle('.close-btn').remove();
            removedButtons += $bundle('.close-button').length;
            $bundle('.close-button').remove();
            removedButtons += $bundle('.dismiss-btn').length;
            $bundle('.dismiss-btn').remove();
            removedButtons += $bundle('.remove-btn').length;
            $bundle('.remove-btn').remove();
            
            // 2. Remove ANY button with × character
            $bundle('button').each((_, el) => {
                const $btn = $bundle(el);
                const text = $btn.text();
                if (text && (text.includes('×') || text.trim() === 'x' || text.trim() === 'X')) {
                    $btn.remove();
                    removedButtons++;
                }
            });
            
            // 3. Remove any element with title="Remove bundle" or similar
            removedButtons += $bundle('[title*="Remove" i], [title*="Close" i], [title*="Delete" i]').length;
            $bundle('[title*="Remove" i], [title*="Close" i], [title*="Delete" i]').remove();
            
            // 4. Remove any element that looks like a close button (× text only)
            $bundle('*').each((_, el) => {
                const $el = $bundle(el);
                const text = $el.text().trim();
                const html = $el.html();
                // Only remove if the element ONLY contains ×
                if ((text === '×' || text === 'x' || text === 'X') && html && html.length <= 10) {
                    $el.remove();
                    removedButtons++;
                }
            });
            
            console.log(`Removed ${removedButtons} close/remove buttons from bundle`);
            
            // 6. Apply redirect URLs from data-redirect-url attributes on each card
            let redirectedCount = 0;
            $bundle('.card').each((_, card) => {
                const $card = $bundle(card);
                const redirectUrl = $card.attr('data-redirect-url');
                
                if (redirectUrl && redirectUrl.trim()) {
                    // Find CTA button in this card
                    const button = $card.find('button.cta-btn, a.cta-btn, button, a').filter(function() {
                        const $el = $bundle(this);
                        const text = $el.text();
                        const hasCtaClass = $el.attr('class') && $el.attr('class').includes('cta');
                        const hasGetOff = text && (text.includes('GET') || text.includes('OFF') || text.includes('Off') || text.includes('Get'));
                        return hasCtaClass || hasGetOff;
                    }).first();
                    
                    if (button.length > 0) {
                        const $btn = $bundle(button);
                        if ($btn[0].tagName.toLowerCase() === 'button') {
                            // Convert button to anchor
                            const classes = $btn.attr('class') || '';
                            const style = $btn.attr('style') || '';
                            const innerHTML = $btn.html();
                            $btn.replaceWith(`<a href="${redirectUrl}" class="${classes}" style="${style}; text-decoration: none; display: inline-block;">${innerHTML}</a>`);
                        } else {
                            // Update anchor href
                            $btn.attr('href', redirectUrl);
                        }
                        redirectedCount++;
                    }
                }
            });
            
            if (redirectedCount > 0) {
                console.log(`Applied ${redirectedCount} redirect URLs to cards`);
            }
            
            // 7. Ensure the section has the correct ID and visibility styles
            const section = $bundle('#bundle-section, section, .offer-container').first();
            if (section.length > 0) {
                // Force the correct ID on the section
                if (!section.attr('id') || section.attr('id') !== 'bundle-section') {
                    section.attr('id', 'bundle-section');
                    console.log('Set bundle section ID to: bundle-section');
                }
                
                // Add critical inline styles to ensure visibility
                const existingStyle = section.attr('style') || '';
                const criticalStyles = 'display: block !important; visibility: visible !important; opacity: 1 !important; position: relative !important; z-index: 1 !important; width: 100% !important; overflow: visible !important; min-height: 100px !important;';
                section.attr('style', existingStyle + ' ' + criticalStyles);
                
                // Wrap the content in a centered container div
                // First check if there's already a wrapper div inside the section
                const existingWrapper = section.find('> div[style*="max-width"]').first();
                if (existingWrapper.length === 0) {
                    // No wrapper exists, so wrap all direct children
                    const children = section.children();
                    if (children.length > 0) {
                        children.wrapAll('<div style="max-width: 1600px; margin: 0 auto;"></div>');
                        console.log('Wrapped bundle content in centered container');
                    }
                }
                
                // Also ensure the pricing-grid is visible
                const grid = $bundle('.pricing-grid');
                if (grid.length > 0) {
                    const gridStyle = grid.attr('style') || '';
                    grid.attr('style', gridStyle + ' display: flex !important; visibility: visible !important; opacity: 1 !important;');
                }
                
                // Ensure all cards are visible
                $bundle('.card').each((_, card) => {
                    const $card = $bundle(card);
                    const cardStyle = $card.attr('style') || '';
                    $card.attr('style', cardStyle + ' display: flex !important; visibility: visible !important; opacity: 1 !important;');
                });
                
                console.log('Added visibility styles to bundle section');
                console.log('Returning bundle section HTML with ID:', section.attr('id'));
                return $bundle.html(section);
            }
            console.log('Returning full body HTML');
            return $bundle('body').html() || bundleHtml;
        }

        const testTemplatePath = path.join(this.testDir, 'bundle.html');
        const bundleTemplate = await fs.readFile(testTemplatePath, 'utf-8');
        const $bundle = cheerio.load(bundleTemplate);
        const section = $bundle('#bundle-section');
        if (section.length === 0) {
            return null;
        }
        return $bundle.html(section);
    }

    async ensureBundleAssets(websitePath) {
        await fs.copy(
            path.join(this.testDir, 'bundle.css'),
            path.join(websitePath, 'bundle.css')
        );
        await fs.copy(
            path.join(this.testDir, 'mobile-fix.css'),
            path.join(websitePath, 'mobile-fix.css')
        );
    }

    ensureBundleTimerScript($) {
        if ($('#bundle-timer-script').length > 0) {
            return;
        }
        const timerScript = `
<script id="bundle-timer-script">
(function () {
  const end = new Date().getTime() + (24 * 60 * 60 * 1000);
  setInterval(() => {
    const now = new Date().getTime();
    const dist = end - now;
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }, 1000);
})();
</script>`;
        $('body').append(timerScript);
    }

    /**
     * Replace logo in the website
     */
    async replaceLogo(websitePath, logoFileName) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);

            // Find logo image in header
            const logoSelectors = [
                'header img[class*="logo" i]',
                'header img[alt*="logo" i]',
                'header img[id*="logo" i]',
                '.header__logo img',
                '.site-header__logo img',
                '.logo img',
                'header .logo img',
                'header img:first'
            ];

            let logoFound = false;
            for (const selector of logoSelectors) {
                const logo = $(selector).first();
                if (logo.length > 0) {
                    // Get current dimensions
                    const currentWidth = logo.attr('width') || logo.css('width') || 'auto';
                    const currentHeight = logo.attr('height') || logo.css('height') || 'auto';
                    
                    // Parse and increase dimensions by 2pt
                    let newWidth = currentWidth;
                    let newHeight = currentHeight;
                    
                    if (currentWidth && currentWidth !== 'auto') {
                        const widthNum = parseFloat(currentWidth);
                        if (!isNaN(widthNum)) {
                            newWidth = `${widthNum + 2}px`;
                        }
                    }
                    
                    if (currentHeight && currentHeight !== 'auto') {
                        const heightNum = parseFloat(currentHeight);
                        if (!isNaN(heightNum)) {
                            newHeight = `${heightNum + 2}px`;
                        }
                    }
                    
                    // Update src to point to new logo
                    logo.attr('src', logoFileName);
                    logo.attr('srcset', ''); // Clear srcset
                    
                    // Center the logo
                    logo.attr('style', `display:block;margin:0 auto;width:${newWidth};height:${newHeight};`);
                    
                    // Center the header element
                    const header = $('header').first();
                    if (header.length > 0) {
                        const headerStyle = header.attr('style') || '';
                        header.attr('style', `${headerStyle};text-align:center;`);
                    }
                    
                    logoFound = true;
                    console.log(`Logo replaced using selector: ${selector}`);
                    break;
                }
            }

            if (!logoFound) {
                console.log('Searching for brand text to replace...');
                
                const textLogoSelectors = [
                    // Prioritize header-specific selectors FIRST
                    'header h1',
                    'header h2',
                    'header h3',
                    'header h3 strong',
                    'header .logo',
                    'header .site-title',
                    'header .brand',
                    'header [class*="logo" i]',
                    'header [class*="brand" i]',
                    'header strong',
                    'header a[href="/"]',
                    'header a[href="./"]',
                    'header span[class*="title" i]',
                    // Landing page builders - check SECOND section (first section is usually banner)
                    'section:nth-of-type(2) .headline-inner h3 strong',
                    'section:nth-of-type(2) .headline-inner h3',
                    'section:nth-of-type(2) .headline-inner h2 strong',
                    'section:nth-of-type(2) .headline-inner strong',
                    'section:nth-of-type(2) .el-612877 strong',
                    'section:nth-of-type(2) h3 strong',
                    // Generic landing page structures
                    '.scraped-container-box:has(h3) h3 strong',
                    '.cbox-246567-1 strong',
                    '#i7xif strong',
                    '.headline.el-612877 strong'
                ];

                for (const selector of textLogoSelectors) {
                    const elements = $(selector);
                    console.log(`Checking selector "${selector}": found ${elements.length} elements`);
                    
                    // Find FIRST element with short brand-like text (header/top of page)
                    for (let i = 0; i < elements.length; i++) {
                        const $el = $(elements[i]);
                        const text = $el.text().trim();
                        console.log(`  Element ${i}: text="${text}" (length: ${text.length})`);
                        
                        // Generic: find short text (likely brand name) - prioritize first match
                        // Exclude empty, very long text, or navigation items
                        const isLikelyBrand = text.length > 0 && text.length <= 35 && 
                                            !/^(home|about|contact|shop|products|services|menu|cart|search|account|login|signup|sale|off|today|only|trustscore|customer|reviews?|charge|all|your|devices?|faster|with)$/i.test(text);
                        
                        if (isLikelyBrand) {
                            $el.empty();
                            // Increase base size by 2pt (1.1em becomes ~1.25em)
                            $el.append(`<img src="${logoFileName}" alt="Logo" style="height:calc(1.1em + 2pt);width:auto;display:block;margin:0 auto;">`);
                            
                            // Center the header element
                            const header = $('header').first();
                            if (header.length > 0) {
                                const headerStyle = header.attr('style') || '';
                                header.attr('style', `${headerStyle};text-align:center;`);
                            }
                            
                            logoFound = true;
                            console.log(`✓ Text logo replaced using selector: ${selector}, text was: "${text}"`);
                            break;
                        }
                    }
                    if (logoFound) break;
                }
                
                if (!logoFound) {
                    console.log('WARNING: No brand text found with standard selectors');
                }
            }

            if (!logoFound) {
                const header = $('header').first();
                if (header.length > 0) {
                    const titleFallback = header.find('h1, h2, h3, .site-title, .logo, .brand, strong, [class*="logo" i], [class*="brand" i]').first();
                    if (titleFallback.length > 0) {
                        titleFallback.empty();
                        titleFallback.append(`<img src="${logoFileName}" alt="Logo" style="height:calc(1.1em + 2pt);width:auto;display:block;margin:0 auto;">`);
                    } else {
                        header.prepend(`<div style="text-align:center;padding:10px;"><img src="${logoFileName}" alt="Logo" style="height:calc(1.1em + 2pt);width:auto;display:block;margin:0 auto;"></div>`);
                    }
                    // Center header
                    const headerStyle = header.attr('style') || '';
                    header.attr('style', `${headerStyle};text-align:center;`);
                    logoFound = true;
                } else {
                    // Look for brand text in page top area (not in body content)
                    const brandTargets = $('h1, h2, h3, strong, a').filter((_, el) => {
                        const $el = $(el);
                        const text = $el.text().trim();
                        // Find short brand-like text near top of page
                        const isShortText = text.length > 0 && text.length <= 25;
                        const notNavigation = !/^(home|about|contact|shop|products|services|menu|cart|search|account|login|signup)$/i.test(text);
                        return isShortText && notNavigation;
                    }).first();

                    if (brandTargets.length > 0) {
                        brandTargets.empty();
                        brandTargets.append(`<img src="${logoFileName}" alt="Logo" style="height:calc(1.1em + 2pt);width:auto;display:block;margin:0 auto;">`);
                        logoFound = true;
                    } else {
                        throw new Error('Logo not found in header');
                    }
                }
            }

            // Do not force layout changes; only replace the brand text element.

            // Save modified HTML
            await this.saveHTML($, indexPath);

            return {
                success: true,
                message: 'Logo replaced successfully'
            };

        } catch (error) {
            console.error('Error replacing logo:', error);
            throw new Error(`Failed to replace logo: ${error.message}`);
        }
    }

    /**
     * Remove header icons and buttons
     */
    async removeHeaderIcons(websitePath) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);
            
            console.log('Starting header icon removal...');
            console.log(`Total sections in page: ${$('section').length}`);
            console.log(`Has <header> tag: ${$('header').length > 0}`);

            // Comprehensive header icon selectors
            const iconSelectors = [
                '.header__icons',
                '.site-header__icons',
                'header .icon',
                'header svg.icon',
                'header svg',
                'header [class*="icon"]',
                'header [class*="cart"]',
                'header [class*="search"]',
                'header [class*="account"]',
                'header [class*="menu-icon"]',
                'header [class*="hamburger"]',
                'header [class*="nav-toggle"]',
                'header [class*="mobile-menu"]',
                'header button[aria-label*="cart" i]',
                'header button[aria-label*="search" i]',
                'header button[aria-label*="menu" i]',
                'header button[aria-label*="navigation" i]',
                'header a[href*="cart"]',
                'header a[href*="search"]',
                'header .menu-toggle',
                'header .nav-toggle',
                'header button.menu',
                'header button[class*="menu" i]',
                '.hamburger',
                '.mobile-menu-toggle'
            ];

            let removedCount = 0;
            iconSelectors.forEach(selector => {
                const elements = $(selector);
                if (elements.length > 0) {
                    elements.remove();
                    removedCount += elements.length;
                    console.log(`Removed ${elements.length} elements with selector: ${selector}`);
                }
            });

            // Additional: Remove small images/icons ONLY in the header section (first 2 sections)
            // Target landing page builder icon containers
            const $headerSections = $('section').slice(0, 2);
            console.log(`Checking first 2 sections for header icons...`);
            
            $headerSections.each((sectionIndex, section) => {
                const $section = $(section);
                
                // Look for small images in specific container patterns (likely icons)
                // Only check containers that end with -0 or -2 (typically left/right icons in headers)
                const $containers = $section.find('[class*="cbox-"]').filter((_, el) => {
                    const className = $(el).attr('class') || '';
                    // Only match containers ending with -0 or -2 (not -1, -3, etc which are content)
                    return /cbox-\d+-0\b/.test(className) || /cbox-\d+-2\b/.test(className);
                });
                
                console.log(`Section ${sectionIndex}: Found ${$containers.length} potential icon containers`);
                
                $containers.each((_, container) => {
                    const $container = $(container);
                    const hasContent = $container.find('img, svg, button, a, div, span').length > 0;
                    
                    if (hasContent) {
                        let shouldHide = false;
                        
                        // Check for small images (icons)
                        const imgs = $container.find('img');
                        imgs.each((_, img) => {
                            const $img = $(img);
                            const src = $img.attr('src') || '';
                            const width = $img.attr('width') || '';
                            const widthNum = parseInt(width);
                            
                            console.log(`  Checking image: src="${src}", width="${width}"`);
                            
                            const isSmallIcon = width && widthNum > 0 && widthNum <= 60;
                            const isNotLogo = !src.toLowerCase().includes('logo') && !src.toLowerCase().includes('brand');
                            
                            if (isSmallIcon && isNotLogo) {
                                shouldHide = true;
                            }
                        });
                        
                        // Check for navigation/menu elements (hamburger menus)
                        if ($container.find('svg, button, [class*="menu"], [class*="hamburger"], [class*="nav"]').length > 0) {
                            shouldHide = true;
                            console.log(`  Found navigation/menu element in container`);
                        }
                        
                        // Hide even if no image but is in position 0 or 2 (likely placeholders for icons)
                        if (!shouldHide && imgs.length === 0) {
                            // Empty containers in icon positions should also be hidden
                            shouldHide = true;
                            console.log(`  Empty icon position container`);
                        }
                        
                        if (shouldHide) {
                            $container.css({
                                'display': 'none !important',
                                'visibility': 'hidden',
                                'opacity': '0',
                                'width': '0',
                                'height': '0'
                            });
                            removedCount++;
                            console.log(`  ✓ Hidden icon container`);
                        }
                    }
                });
            });

            if (removedCount === 0) {
                console.warn('No header icons found to remove');
            } else {
                console.log(`Total icons removed: ${removedCount}`);
            }

            // Save modified HTML
            await this.saveHTML($, indexPath);

            return {
                success: true,
                message: `Removed ${removedCount} header icons/buttons`
            };

        } catch (error) {
            console.error('Error removing header icons:', error);
            throw new Error(`Failed to remove header icons: ${error.message}`);
        }
    }

    /**
     * Apply button redirect to scroll to specific section
     */
    async applyButtonRedirect(websitePath, buttonType, destination) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);

            console.log(`Applying redirect for: ${buttonType} → ${destination}`);

            // Map button types to search patterns
            const buttonPatterns = {
                'add-to-cart': ['add to cart', 'add to bag', 'add-to-cart', 'addtocart'],
                'buy-now': ['buy now', 'buy-now', 'buynow'],
                'shop-now': ['shop now', 'shop-now', 'shopnow'],
                'add-cart': ['add cart', 'add-cart', 'addcart'],
                'checkout': ['checkout', 'check out']
            };

            const patterns = buttonPatterns[buttonType] || [buttonType];
            let buttonsFound = 0;

            // Search for buttons/links with matching text
            $('button, a, input[type="submit"], input[type="button"], [role="button"]').each((_, element) => {
                const $el = $(element);
                const text = $el.text().trim().toLowerCase();
                const value = ($el.attr('value') || '').toLowerCase();
                const ariaLabel = ($el.attr('aria-label') || '').toLowerCase();
                
                // Check if element matches any pattern
                const matches = patterns.some(pattern => 
                    text.includes(pattern) || 
                    value.includes(pattern) || 
                    ariaLabel.includes(pattern)
                );

                if (matches) {
                    // Remove existing href or onclick
                    $el.removeAttr('href');
                    $el.removeAttr('onclick');
                    $el.removeAttr('data-action');
                    
                    // Add smooth scroll behavior - single line for onclick attribute
                    const scrollScript = `(function(e){e.preventDefault();e.stopPropagation();var t=document.querySelector('${destination}');if(t){t.scrollIntoView({behavior:'smooth',block:'center'});}else{console.warn('Target not found: ${destination}');}return false;})(event||window.event);`;
                    
                    $el.attr('onclick', scrollScript);
                    $el.css('cursor', 'pointer');
                    
                    // For links, set href to destination as fallback
                    if ($el.is('a')) {
                        $el.attr('href', destination);
                    }
                    
                    // Change button type to prevent form submission
                    if ($el.is('button') && !$el.attr('type')) {
                        $el.attr('type', 'button');
                    }
                    
                    buttonsFound++;
                    console.log(`✓ Applied redirect to button: "${text}" → ${destination}`);
                }
            });

            if (buttonsFound === 0) {
                console.warn(`No buttons found matching pattern: ${buttonType}`);
                // Still save and return success - user might add buttons later
            }

            // Add a global script as backup to ensure redirects work
            // This handles cases where onclick might be overridden or removed
            const redirectScriptId = 'button-redirect-script';
            $(`#${redirectScriptId}`).remove(); // Remove existing script if any
            
            const globalRedirectScript = `
<script id="${redirectScriptId}">
(function() {
    'use strict';
    console.log('[Button Redirect] Script loaded for destination: ${destination}');
    
    // Function to scroll to target
    function scrollToTarget(targetSelector) {
        console.log('[Button Redirect] Attempting to scroll to:', targetSelector);
        
        // Try multiple methods to find the target
        var target = document.querySelector(targetSelector);
        
        // If not found and it's an ID selector, try without the #
        if (!target && targetSelector.startsWith('#')) {
            var id = targetSelector.substring(1);
            target = document.getElementById(id);
            console.log('[Button Redirect] Tried getElementById:', id, 'Found:', !!target);
        }
        
        // If still not found, try to find by class or attribute
        if (!target) {
            // Try finding element with partial match
            var allSections = document.querySelectorAll('section, div[id], div[class*="bundle"]');
            for (var i = 0; i < allSections.length; i++) {
                var section = allSections[i];
                if (section.id && targetSelector.includes(section.id)) {
                    target = section;
                    console.log('[Button Redirect] Found by ID match:', section.id);
                    break;
                }
                if (section.className && targetSelector.includes('bundle') && section.className.includes('bundle')) {
                    target = section;
                    console.log('[Button Redirect] Found by class match:', section.className);
                    break;
                }
            }
        }
        
        if (target) {
            console.log('[Button Redirect] Target found! Scrolling...', target);
            
            // Scroll with smooth behavior
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            
            // Fallback for browsers that don't support smooth scroll
            setTimeout(function() {
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                var offsetPosition = targetPosition - (window.innerHeight / 2) + (target.offsetHeight / 2);
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
            
            // Highlight the target briefly
            var originalBorder = target.style.border;
            target.style.border = '3px solid #6366f1';
            target.style.transition = 'border 0.3s ease';
            setTimeout(function() {
                target.style.border = originalBorder;
            }, 2000);
            
            return true;
        } else {
            console.error('[Button Redirect] Target not found:', targetSelector);
            // List all sections for debugging
            console.log('[Button Redirect] Available sections:', 
                Array.from(document.querySelectorAll('section[id], div[id]')).map(function(el) {
                    return el.id;
                }).filter(Boolean)
            );
            alert('Redirect target not found: ' + targetSelector + '\\n\\nMake sure the bundle section is injected first!');
            return false;
        }
    }
    
    // Add click listeners to all buttons matching the pattern
    function setupRedirects() {
        var patterns = ${JSON.stringify(patterns)};
        var destination = '${destination}';
        
        console.log('[Button Redirect] Setting up redirects for patterns:', patterns);
        console.log('[Button Redirect] Destination:', destination);
        
        // Find all buttons/links
        var elements = document.querySelectorAll('button, a[href*="cart"], a[href*="buy"], input[type="submit"], input[type="button"], [role="button"]');
        var redirectedCount = 0;
        
        console.log('[Button Redirect] Found ' + elements.length + ' potential elements');
        
        elements.forEach(function(el) {
            var text = (el.textContent || el.innerText || '').trim().toLowerCase();
            var value = (el.getAttribute('value') || '').toLowerCase();
            var ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
            
            var matches = patterns.some(function(pattern) {
                return text.includes(pattern) || value.includes(pattern) || ariaLabel.includes(pattern);
            });
            
            if (matches) {
                console.log('[Button Redirect] Setting up redirect for button:', text || value || ariaLabel);
                
                // Remove existing listeners by cloning
                var newEl = el.cloneNode(true);
                el.parentNode.replaceChild(newEl, el);
                
                newEl.addEventListener('click', function(e) {
                    console.log('[Button Redirect] Button clicked!', text);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    scrollToTarget(destination);
                    return false;
                }, true); // Use capture phase
                
                redirectedCount++;
            }
        });
        
        console.log('[Button Redirect] Setup complete. Redirected ' + redirectedCount + ' button(s)');
        
        if (redirectedCount === 0) {
            console.warn('[Button Redirect] No buttons found matching patterns:', patterns);
        }
    }
    
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupRedirects);
    } else {
        setupRedirects();
    }
    
    // Also run after a delay to catch dynamically added buttons
    setTimeout(setupRedirects, 1000);
    setTimeout(setupRedirects, 3000);
})();
</script>`;
            
            $('body').append(globalRedirectScript);

            // Save modified HTML
            await this.saveHTML($, indexPath);

            return {
                success: true,
                message: `Applied redirect to ${buttonsFound} button(s)`
            };

        } catch (error) {
            console.error('Error applying button redirect:', error);
            throw new Error(`Failed to apply button redirect: ${error.message}`);
        }
    }

    /**
     * Edit button text on the website
     * @param {string} websitePath - Path to the website folder
     * @param {string} searchText - Text to search for in buttons
     * @param {string} newText - New text to replace with
     * @returns {Promise<Object>} - Result with count of edited buttons
     */
    async editButtonText(websitePath, searchText, newText) {
        try {
            console.log(`Editing button text in ${websitePath}`);
            console.log(`Search: "${searchText}" -> Replace: "${newText}"`);

            const indexPath = path.join(websitePath, 'index.html');
            const html = await fs.readFile(indexPath, 'utf-8');
            const $ = cheerio.load(html);

            let editedCount = 0;

            // Search in buttons and links
            $('button, a, input[type="button"], input[type="submit"]').each((_, el) => {
                const $el = $(el);
                const text = $el.text().trim();
                const value = $el.attr('value');

                // Check text content
                if (text && text.toLowerCase().includes(searchText.toLowerCase())) {
                    // Replace text content
                    const newContent = text.replace(new RegExp(searchText, 'gi'), newText);
                    $el.text(newContent);
                    editedCount++;
                    console.log(`Replaced: "${text}" -> "${newContent}"`);
                }

                // Check value attribute for input buttons
                if (value && value.toLowerCase().includes(searchText.toLowerCase())) {
                    const newValue = value.replace(new RegExp(searchText, 'gi'), newText);
                    $el.attr('value', newValue);
                    editedCount++;
                    console.log(`Replaced value: "${value}" -> "${newValue}"`);
                }
            });

            if (editedCount > 0) {
                // Save modified HTML
                await this.saveHTML($, indexPath);
                console.log(`Edited ${editedCount} button(s)`);
            } else {
                console.log('No buttons found matching the search text');
            }

            return {
                success: true,
                count: editedCount,
                message: editedCount > 0 
                    ? `Edited ${editedCount} button(s)` 
                    : `No buttons found with text "${searchText}"`
            };

        } catch (error) {
            console.error('Error editing button text:', error);
            throw new Error(`Failed to edit button text: ${error.message}`);
        }
    }

    /**
     * Apply all modifications at once
     */
    async applyModifications(websitePath, options = {}) {
        const results = {};

        try {
            if (options.injectBundle) {
                results.bundle = await this.injectBundle(websitePath);
            }

            if (options.replaceLogo && options.logoFileName) {
                results.logo = await this.replaceLogo(websitePath, options.logoFileName);
            }

            if (options.removeHeaderIcons) {
                results.headerIcons = await this.removeHeaderIcons(websitePath);
            }

            return {
                success: true,
                results
            };

        } catch (error) {
            console.error('Error applying modifications:', error);
            throw error;
        }
    }

    /**
     * Delete element from website using CSS selector
     * @param {string} websitePath - Path to the website directory
     * @param {string} selector - CSS selector for the element to delete
     */
    async deleteElement(websitePath, selector) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);

            console.log(`🗑️ Attempting to delete element(s) matching: ${selector}`);
            
            // Find and count matching elements
            const elements = $(selector);
            const count = elements.length;
            
            if (count === 0) {
                console.log('⚠️ No elements found matching selector');
                return {
                    success: false,
                    message: `No elements found matching selector: ${selector}`,
                    count: 0
                };
            }

            console.log(`Found ${count} element(s) to delete`);
            
            // Remove the element(s)
            elements.remove();
            
            // Save modified HTML
            await this.saveHTML($, indexPath);

            console.log(`✅ Successfully deleted ${count} element(s)`);
            
            return {
                success: true,
                message: `Successfully deleted ${count} element(s)`,
                count
            };

        } catch (error) {
            console.error('Error deleting element:', error);
            throw new Error(`Failed to delete element: ${error.message}`);
        }
    }

    /**
     * Clear header content above navigation to prepare for logo injection
     * @param {string} websitePath - Path to the website directory
     */
    async clearHeader(websitePath) {
        try {
            const indexPath = path.join(websitePath, 'index.html');
            const $ = await this.loadHTML(indexPath);

            console.log('🧹 Clearing header content...');
            
            let clearedCount = 0;

            // Find header element
            const header = $('header').first();
            
            if (header.length > 0) {
                console.log('Found header element, clearing all content...');
                
                // Remove ALL children from header (nav, buttons, links, everything)
                header.children().each((_, el) => {
                    $(el).remove();
                    clearedCount++;
                });
                
                // Also remove any direct text nodes
                header.contents().filter(function() {
                    return this.type === 'text' && $(this).text().trim() !== '';
                }).remove();
                
                // Add centered logo placeholder
                const logoPlaceholder = `
                    <div style="display: flex; justify-content: center; align-items: center; padding: 40px 20px; background: transparent; width: 100%;">
                        <div style="text-align: center;">
                            <div style="font-size: 48px; color: #95a5a6; margin-bottom: 10px;">📷</div>
                            <p style="color: #95a5a6; font-size: 14px; margin: 0;">Logo Placeholder - Inject your logo here</p>
                        </div>
                    </div>
                `;
                header.html(logoPlaceholder);
                
                console.log(`✅ Cleared entire header (${clearedCount} elements removed)`);
            } else {
                console.log('⚠️ No header element found, searching for nav...');
                
                // If no header, find and remove nav elements
                const nav = $('nav').first();
                if (nav.length > 0) {
                    const navParent = nav.parent();
                    nav.remove();
                    clearedCount++;
                    
                    // Add logo placeholder where nav was
                    const logoPlaceholder = `
                        <div style="display: flex; justify-content: center; align-items: center; padding: 40px 20px; background: #f8f9fa; width: 100%;">
                            <div style="text-align: center;">
                                <div style="font-size: 48px; color: #95a5a6; margin-bottom: 10px;">📷</div>
                                <p style="color: #95a5a6; font-size: 14px; margin: 0;">Logo Placeholder - Inject your logo here</p>
                            </div>
                        </div>
                    `;
                    navParent.prepend(logoPlaceholder);
                } else {
                    // No nav found either, add placeholder at top of body
                    const logoPlaceholder = `
                        <div style="display: flex; justify-content: center; align-items: center; padding: 40px 20px; background: #f8f9fa; width: 100%;">
                            <div style="text-align: center;">
                                <div style="font-size: 48px; color: #95a5a6; margin-bottom: 10px;">📷</div>
                                <p style="color: #95a5a6; font-size: 14px; margin: 0;">Logo Placeholder - Inject your logo here</p>
                            </div>
                        </div>
                    `;
                    $('body').prepend(logoPlaceholder);
                }
                
                console.log(`✅ Cleared navigation elements`);
            }
            
            // Also remove any standalone nav menus anywhere in the page
            $('nav').remove();
            
            // Remove common header menu classes
            $('[class*="menu"]').first().remove();
            $('[class*="navigation"]').first().remove();
            $('[class*="nav-"]').first().remove();

            // Save modified HTML
            await this.saveHTML($, indexPath);

            return {
                success: true,
                message: `Header completely cleared. All navigation and buttons removed. Logo placeholder added.`,
                count: clearedCount
            };

        } catch (error) {
            console.error('Error clearing header:', error);
            throw new Error(`Failed to clear header: ${error.message}`);
        }
    }
}

export default new Modifier();

export const Manipulator = {
    injectBundle(doc) {
        if (doc.getElementById('custom-bundle-section')) return; // already injected

        const bundleHTML = `
        <div id="custom-bundle-section" style="
            background: #f9fafb;
            padding: 4rem 2rem;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
            font-family: inherit;
        ">
            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #111;">Frequent Bundles</h2>
            <p style="color: #666; margin-bottom: 2rem;">Buy together and save 20%</p>
            <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px; background: white; width: 200px;">
                    <div style="height: 150px; background: #eee; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center;">Product A</div>
                    <h3 style="font-size: 1rem; margin: 0;">Main Item</h3>
                    <p style="color: #6366f1; font-weight: bold;">$49.00</p>
                </div>
                <div style="display: flex; align-items: center; font-size: 2rem;">+</div>
                <div style="border: 1px solid #ddd; padding: 1rem; border-radius: 8px; background: white; width: 200px;">
                    <div style="height: 150px; background: #eee; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center;">Product B</div>
                    <h3 style="font-size: 1rem; margin: 0;">Accessory</h3>
                    <p style="color: #6366f1; font-weight: bold;">$19.00</p>
                </div>
            </div>
            <button style="
                margin-top: 2rem;
                background: #000;
                color: white;
                border: none;
                padding: 1rem 2rem;
                font-size: 1rem;
                cursor: pointer;
                border-radius: 4px;
            ">Add Bundle to Cart - $54.40</button>
        </div>
        `;

        // Try to inject before footer, or at end of main
        const main = doc.querySelector('main') || doc.querySelector('body');
        const footer = doc.querySelector('footer');

        const tempDiv = doc.createElement('div');
        tempDiv.innerHTML = bundleHTML;

        if (footer && footer.parentNode === main) {
            main.insertBefore(tempDiv.firstElementChild, footer);
        } else if (doc.body) {
            // If main exists, append to main, else append to body before scripts
            if (doc.querySelector('main')) {
                doc.querySelector('main').appendChild(tempDiv.firstElementChild);
            } else {
                doc.body.appendChild(tempDiv.firstElementChild);
            }
        }
    },

    removeIcons(doc) {
        // Heuristic: remove likely icon containers in header
        const selectors = [
            '.header__icons',
            '.site-header__icons',
            '.icon',
            'svg.icon',
            '[class*="icon-"]',
            '[class*="cart"]',
            '[class*="search"]'
        ];

        // Be careful not to remove everything. Let's target the header specifically.
        const header = doc.querySelector('header');
        if (header) {
            selectors.forEach(sel => {
                const els = header.querySelectorAll(sel);
                els.forEach(el => el.style.display = 'none');
            });
        }
    },

    removeHomeMenu(doc) {
        // Find links in nav that say "Home"
        const links = doc.querySelectorAll('nav a, header a, ul li a');
        links.forEach(a => {
            if (a.textContent.trim().toLowerCase() === 'home') {
                // Hide the li if it's in a list
                if (a.parentElement.tagName === 'LI') {
                    a.parentElement.style.display = 'none';
                } else {
                    a.style.display = 'none';
                }
            }
        });
    },

    injectLogo(doc) {
        const logoImg = doc.querySelector('header img, .logo img, .site-header__logo img');
        if (logoImg) {
            // Get current dimensions
            const currentWidth = logoImg.width || parseFloat(logoImg.style.width) || 0;
            const currentHeight = logoImg.height || parseFloat(logoImg.style.height) || 0;
            
            // Increase dimensions by 2pt
            const newWidth = currentWidth > 0 ? `${currentWidth + 2}px` : 'auto';
            const newHeight = currentHeight > 0 ? `${currentHeight + 2}px` : 'auto';
            
            // Replace with a sample logo (using placeholder)
            logoImg.src = 'https://via.placeholder.com/150x50/333/fff?text=NEW+LOGO';
            logoImg.srcset = ''; // clear srcset to prevent high-res overrides
            logoImg.style.cssText = `display:block !important;margin:0 auto !important;width:${newWidth};height:${newHeight};`;
            
            // Center parent element
            if (logoImg.parentElement) {
                logoImg.parentElement.style.cssText += 'text-align:center;display:flex;justify-content:center;align-items:center;';
            }
        } else {
            // If no img found, maybe text logo?
            const textLogo = doc.querySelector('.h2, .site-header__logo, header h1, header h2, header .logo');
            if (textLogo) {
                textLogo.innerHTML = '<img src="https://via.placeholder.com/150x50/333/fff?text=NEW+LOGO" alt="Logo" style="height:calc(1.1em + 2pt);width:auto;display:block;margin:0 auto;">';
                textLogo.style.cssText += 'text-align:center;display:flex;justify-content:center;align-items:center;';
            }
        }
    },

    injectProductImage(doc) {
        // Find first main product image
        const productImg = doc.querySelector('.product__media img, .product-single__media img, .grid-view-item__image');
        if (productImg) {
            productImg.src = 'https://via.placeholder.com/400x400/6366f1/fff?text=NEW+PRODUCT';
            productImg.srcset = '';
        }
    }
};

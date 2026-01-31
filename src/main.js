// Home button for mobile view
const homeBtn = document.getElementById('homeBtn');

function showHomeBtn(show) {
    if (homeBtn) homeBtn.style.display = show ? '' : 'none';
}

homeBtn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('visible');
    }
});
// --- Preview Mode Toggle ---
const previewDesktopBtn = document.getElementById('previewDesktopBtn');
const previewMobileBtn = document.getElementById('previewMobileBtn');
const appRoot = document.getElementById('app');

function setPreviewMode(mode) {
    if (!appRoot) return;
    if (mode === 'mobile') {
        appRoot.classList.add('preview-mobile');
        appRoot.classList.remove('preview-desktop');
        previewMobileBtn.classList.add('active');
        previewDesktopBtn.classList.remove('active');
        showHomeBtn(true);
    } else {
        appRoot.classList.add('preview-desktop');
        appRoot.classList.remove('preview-mobile');
        previewDesktopBtn.classList.add('active');
        previewMobileBtn.classList.remove('active');
        showHomeBtn(false);
    }
}

previewDesktopBtn.addEventListener('click', () => setPreviewMode('desktop'));
previewMobileBtn.addEventListener('click', () => setPreviewMode('mobile'));

// Default to desktop preview
setPreviewMode('desktop');
// State
let currentWebsiteName = null;
let currentDoc = null;

const urlInput = document.getElementById('urlInput');
const extractBtn = document.getElementById('extractBtn');
const previewFrame = document.getElementById('previewFrame');
const controlsPanel = document.getElementById('controlsPanel');
const placeholderState = document.getElementById('placeholderState');
const statusIndicator = document.getElementById('statusIndicator');

// Element remover state
let isElementRemoverActive = false;

// Re-inject element remover script when iframe reloads
previewFrame.addEventListener('load', () => {
    if (isElementRemoverActive) {
        setTimeout(() => {
            injectElementRemoverScript();
        }, 100);
    }
});

// Controls
const injectBundleBtn = document.getElementById('injectBundleBtn');
const removeIconsCheck = document.getElementById('removeIconsCheck');
const clearHeaderBtn = document.getElementById('clearHeaderBtn');
const clearHeaderStatus = document.getElementById('clearHeaderStatus');
const elementRemoverCheck = document.getElementById('elementRemoverCheck');
const elementRemoverStatus = document.getElementById('elementRemoverStatus');
const injectLogoBtn = document.getElementById('injectLogoBtn');
const refreshBtn = document.getElementById('refreshBtn');
const logoInput = document.getElementById('logoInput');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const deployNetlifyBtn = document.getElementById('deployNetlifyBtn');
const netlifyTokenInput = document.getElementById('netlifyTokenInput');
const deployStatus = document.getElementById('deployStatus');

// Button Redirect
const buttonTargetSelect = document.getElementById('buttonTargetSelect');
const redirectDestinationSelect = document.getElementById('redirectDestinationSelect');
const applyRedirectBtn = document.getElementById('applyRedirectBtn');
const redirectStatus = document.getElementById('redirectStatus');

// Card Redirect URL (in bundle builder)
const cardRedirectUrl = document.getElementById('cardRedirectUrl');

// Button Text Editor
const buttonSelectorInput = document.getElementById('buttonSelectorInput');
const newButtonTextInput = document.getElementById('newButtonTextInput');
const editButtonTextBtn = document.getElementById('editButtonTextBtn');
const buttonEditStatus = document.getElementById('buttonEditStatus');

// Bundle Builder
const bundleBuilder = document.getElementById('bundleBuilder');
const bundleBackBtn = document.getElementById('bundleBackBtn');
const bundleSaveBtn = document.getElementById('bundleSaveBtn');
const bundleSubmitBtn = document.getElementById('bundleSubmitBtn');
const bundleImageInput = document.getElementById('bundleImageInput');
const bundlePreview = document.getElementById('bundlePreview');
const bundleDraftStatus = document.getElementById('bundleDraftStatus');
const themeToggleBtnBundle = document.getElementById('themeToggleBtnBundle');
const bundleAddImageBtn = document.getElementById('bundleAddImageBtn');
const bundleRemoveImageBtn = document.getElementById('bundleRemoveImageBtn');

// Bundle Styling Controls
const bundleBgColor = document.getElementById('bundleBgColor');
const bundleBgColorText = document.getElementById('bundleBgColorText');
const bundlePrimaryFont = document.getElementById('bundlePrimaryFont');
const bundleHeadingSize = document.getElementById('bundleHeadingSize');
const bundleHeadingColor = document.getElementById('bundleHeadingColor');
const bundleHeadingColorText = document.getElementById('bundleHeadingColorText');
const bundleAccentColor = document.getElementById('bundleAccentColor');

// ============================================
// Helper: Safe JSON parsing with error handling
// ============================================
async function parseJSON(response) {
    // Check if response is ok
    if (!response.ok) {
        let errorMessage;
        try {
            const text = await response.text();
            errorMessage = text || response.statusText;
        } catch (e) {
            errorMessage = response.statusText;
        }
        throw new Error(`Server error (${response.status}): ${errorMessage}`);
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response but got ${contentType || 'unknown type'}. Response: ${text.substring(0, 200)}`);
    }

    // Parse JSON safely
    try {
        return await response.json();
    } catch (e) {
        throw new Error(`Failed to parse JSON response: ${e.message}`);
    }
}
const bundleAccentColorText = document.getElementById('bundleAccentColorText');
const bundleButtonColor = document.getElementById('bundleButtonColor');
const bundleButtonColorText = document.getElementById('bundleButtonColorText');
const bundleTextColor = document.getElementById('bundleTextColor');
const bundleTextColorText = document.getElementById('bundleTextColorText');
const bundleBodySize = document.getElementById('bundleBodySize');
const bundleBorderRadius = document.getElementById('bundleBorderRadius');
const bundlePadding = document.getElementById('bundlePadding');
const bundleApplyStyleBtn = document.getElementById('bundleApplyStyleBtn');
const bundleResetStyleBtn = document.getElementById('bundleResetStyleBtn');

let bundleDraft = null;
let bundleImageData = null;
let bundleTimerInterval = null;
let selectedBundleCard = null;
let liveUpdateInterval = null;
let lastSiteModified = null;

const THEME_STORAGE_KEY = 'shopifyforger-theme';

// Backend API base URL
// In development, Vite runs on 5173 but backend is on 3000
const API_BASE = import.meta.env.DEV
    ? 'http://localhost:3000'
    : window.location.origin;

/**
 * Extract website and download all assets
 */
async function extractWebsite() {
    const url = urlInput.value.trim();
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    statusIndicator.textContent = "Extracting...";
    statusIndicator.classList.add('loading');
    extractBtn.disabled = true;
    extractBtn.textContent = 'Extracting...';

    try {
        const res = await fetch(`${API_BASE}/api/extract`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Extraction failed');
        }

        currentWebsiteName = data.websiteName;

        // Load the extracted site in iframe
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html`;

        startLiveUpdates();

        statusIndicator.textContent = "Active";
        statusIndicator.classList.remove('loading');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="icon">⚡</span> Extract Front-end';
        placeholderState.classList.add('hidden');
        controlsPanel.classList.remove('hidden');

        console.log('Website extracted:', data);

    } catch (err) {
        console.error(err);
        statusIndicator.textContent = "Error";
        statusIndicator.classList.remove('loading');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="icon">⚡</span> Extract Front-end';
        alert(`Extraction failed: ${err.message}`);
    }
}

/**
 * Inject bundle section
 */
async function applyBundleToSite(bundleHtml) {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    statusIndicator.textContent = "Injecting Bundle...";
    statusIndicator.classList.add('loading');
    bundleSubmitBtn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/api/inject-bundle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                websiteName: currentWebsiteName,
                bundleHtml
            })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Bundle injection failed');
        }

        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
        statusIndicator.textContent = "Bundle injected";
        statusIndicator.classList.remove('loading');
        bundleSubmitBtn.disabled = false;

        console.log('Bundle injected:', data);
    } catch (err) {
        console.error(err);
        statusIndicator.textContent = "Error";
        statusIndicator.classList.remove('loading');
        bundleSubmitBtn.disabled = false;
        alert(`Bundle injection failed: ${err.message}`);
    }
}

function openBundleBuilder() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    bundleBuilder.classList.remove('hidden');
    bundleBuilder.setAttribute('aria-hidden', 'false');

    if (bundleDraft) {
        loadBundleDraft();
    }

    startBundleTimer();
}

function closeBundleBuilder() {
    bundleBuilder.classList.add('hidden');
    bundleBuilder.setAttribute('aria-hidden', 'true');
    if (bundleTimerInterval) {
        clearInterval(bundleTimerInterval);
        bundleTimerInterval = null;
    }
}

function updateBundleDraftStatus(message) {
    bundleDraftStatus.textContent = message;
    statusIndicator.textContent = message;
    statusIndicator.classList.remove('loading');
}

function handleBundleImagePreview(file) {
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        bundleImageData = reader.result;
        bundlePreview.querySelectorAll('img.bundle-image').forEach((img) => {
            img.src = reader.result;
        });
    };
    reader.readAsDataURL(file);
}

function startBundleTimer() {
    if (bundleTimerInterval) {
        clearInterval(bundleTimerInterval);
    }

    const end = new Date().getTime() + 24 * 60 * 60 * 1000;
    bundleTimerInterval = setInterval(() => {
        const now = new Date().getTime();
        const dist = end - now;
        const h = Math.max(0, Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const m = Math.max(0, Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)));
        const s = Math.max(0, Math.floor((dist % (1000 * 60)) / 1000));
        const hEl = bundlePreview.querySelector('#hours');
        const mEl = bundlePreview.querySelector('#minutes');
        const sEl = bundlePreview.querySelector('#seconds');
        if (hEl) hEl.textContent = String(h).padStart(2, '0');
        if (mEl) mEl.textContent = String(m).padStart(2, '0');
        if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }, 1000);
}

function collectBundleDraft() {
    bundleDraft = {
        html: bundlePreview.innerHTML,
        image: bundleImageData
    };
}

function loadBundleDraft() {
    if (bundleDraft.html) {
        bundlePreview.innerHTML = bundleDraft.html;
    }
    if (bundleDraft.image) {
        bundleImageData = bundleDraft.image;
        bundlePreview.querySelectorAll('img.bundle-image').forEach((img) => {
            img.src = bundleDraft.image;
        });
    }
    selectedBundleCard = null;
}

function getCardTemplate(cardIndex) {
    const firstCard = bundlePreview.querySelector('.card');
    if (!firstCard) return null;
    const clone = firstCard.cloneNode(true);
    clone.classList.remove('recommended');
    clone.style.border = '1px solid #E0E0E0';
    const badge = clone.querySelector('.badge-red, .badge-gray');
    if (badge) {
        badge.classList.remove('badge-red');
        badge.classList.add('badge-gray');
        badge.style.background = '#EBEBEB';
        badge.style.color = '#000';
        badge.textContent = 'PROMO';
    }
    const editableItems = Array.from(clone.querySelectorAll('[contenteditable="true"]'));
    editableItems.forEach((el) => {
        el.textContent = '';
    });
    const title = clone.querySelector('h3[contenteditable="true"]');
    if (title) {
        title.textContent = `New Bundle ${cardIndex}`;
    }
    const subtitle = clone.querySelector('.info p[contenteditable="true"]');
    if (subtitle) {
        subtitle.innerHTML = 'Edit bundle subtitle';
    }
    const priceLines = clone.querySelectorAll('.info p[contenteditable="true"]');
    if (priceLines.length >= 4) {
        priceLines[1].textContent = 'Total: £0.00';
        priceLines[2].innerHTML = '<del>£0.00</del>';
        priceLines[3].textContent = 'Only £0.00 each';
    }
    const shipping = clone.querySelectorAll('.info p[contenteditable="true"]');
    if (shipping.length >= 5) {
        shipping[4].textContent = '+ Free Shipping';
    }
    const cta = clone.querySelector('button[contenteditable="true"]');
    if (cta) {
        cta.textContent = 'GET 0% OFF';
    }
    const footer = clone.querySelector('p[contenteditable="true"]');
    if (footer) {
        footer.textContent = '180 Day Money Back Guarantee';
    }
    return clone;
}

function addBundleCard() {
    const grid = bundlePreview.querySelector('.pricing-grid');
    const cardIndex = grid ? grid.querySelectorAll('.card').length + 1 : 1;
    const template = getCardTemplate(cardIndex);
    if (!grid || !template) return;
    grid.appendChild(template);
}

function removeBundleCard(card) {
    const grid = bundlePreview.querySelector('.pricing-grid');
    if (!grid || !card) return;
    if (grid.querySelectorAll('.card').length <= 1) {
        alert('At least one bundle card is required.');
        return;
    }
    card.remove();
    selectedBundleCard = null;
}

function addImageToSelectedCard() {
    if (!selectedBundleCard) {
        alert('Select a bundle card first.');
        return;
    }
    const imageContainer = selectedBundleCard.querySelector('.card-content > div');
    if (!imageContainer) return;
    const templateImg = imageContainer.querySelector('img.bundle-image');
    if (!templateImg) return;
    const newImg = templateImg.cloneNode(true);
    newImg.style.marginLeft = '-35px';
    newImg.style.position = 'relative';
    newImg.style.zIndex = String(imageContainer.querySelectorAll('img.bundle-image').length + 1);
    newImg.style.top = `-${10 * (imageContainer.querySelectorAll('img.bundle-image').length)}px`;
    imageContainer.appendChild(newImg);
}

function removeImageFromSelectedCard() {
    if (!selectedBundleCard) {
        alert('Select a bundle card first.');
        return;
    }
    const images = selectedBundleCard.querySelectorAll('img.bundle-image');
    if (images.length <= 1) {
        alert('At least one image is required.');
        return;
    }
    images[images.length - 1].remove();
}

function saveBundleDraft() {
    collectBundleDraft();
    updateBundleDraftStatus('Bundle draft saved');
}

function submitBundleDraft() {
    collectBundleDraft();
    const bundleHtml = bundlePreview.outerHTML;
    updateBundleDraftStatus('Sending bundle to backend...');
    applyBundleToSite(bundleHtml);
    closeBundleBuilder();
}

/**
 * Remove header icons
 */
async function removeHeaderIcons() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    statusIndicator.textContent = "Removing Icons...";
    statusIndicator.classList.add('loading');

    try {
        const res = await fetch(`${API_BASE}/api/remove-header-icons`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteName: currentWebsiteName })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Icon removal failed');
        }

        // Reload iframe to show changes
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;

        statusIndicator.textContent = "Active";
        statusIndicator.classList.remove('loading');

        console.log('Icons removed:', data);
        alert(data.message);

    } catch (err) {
        console.error(err);
        statusIndicator.textContent = "Error";
        statusIndicator.classList.remove('loading');
        alert(`Icon removal failed: ${err.message}`);
    }
}

/**
 * Clear header content for logo placement
 */
async function clearHeader() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    if (!confirm('This will remove all header content above the navigation menu. Continue?')) {
        return;
    }

    try {
        clearHeaderBtn.disabled = true;
        clearHeaderBtn.textContent = 'Clearing...';
        clearHeaderStatus.style.display = 'block';
        clearHeaderStatus.textContent = '⏳ Clearing header...';
        clearHeaderStatus.style.color = '#3498db';

        const res = await fetch(`${API_BASE}/api/clear-header`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteName: currentWebsiteName })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Header clearing failed');
        }

        // Reload iframe to show changes
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;

        clearHeaderStatus.textContent = '✓ Header cleared! You can now inject your logo.';
        clearHeaderStatus.style.color = '#27ae60';

        console.log('Header cleared:', data);

    } catch (err) {
        console.error(err);
        clearHeaderStatus.textContent = `❌ Error: ${err.message}`;
        clearHeaderStatus.style.color = '#e74c3c';
    } finally {
        clearHeaderBtn.disabled = false;
        clearHeaderBtn.textContent = 'Clear Header for Logo';
    }
}

/**
 * Edit button text on the site
 */
async function editButtonText() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    const searchText = buttonSelectorInput.value.trim();
    const newText = newButtonTextInput.value.trim();

    if (!searchText || !newText) {
        buttonEditStatus.textContent = 'Please enter both search text and new text';
        buttonEditStatus.style.color = '#e74c3c';
        return;
    }

    buttonEditStatus.textContent = 'Editing button text...';
    buttonEditStatus.style.color = '#3498db';
    editButtonTextBtn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/api/edit-button-text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                websiteName: currentWebsiteName,
                searchText,
                newText
            })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Button text edit failed');
        }

        // Reload iframe to show changes
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;

        buttonEditStatus.textContent = data.message;
        buttonEditStatus.style.color = data.count > 0 ? '#27ae60' : '#e67e22';

        console.log('Button text edited:', data);

    } catch (err) {
        console.error(err);
        buttonEditStatus.textContent = `Error: ${err.message}`;
        buttonEditStatus.style.color = '#e74c3c';
    } finally {
        editButtonTextBtn.disabled = false;
    }
}

/**
 * Toggle element remover mode
 */
let elementRemoverActive = false;
let elementRemoverStyle = null;

function toggleElementRemoverMode(enabled) {
    elementRemoverActive = enabled;
    isElementRemoverActive = enabled;

    if (enabled) {
        elementRemoverStatus.textContent = '📸 Click and drag to select area to delete';
        elementRemoverStatus.style.color = '#e74c3c';
        elementRemoverStatus.style.fontWeight = '600';

        // Inject styles for selection mode
        if (!elementRemoverStyle) {
            elementRemoverStyle = document.createElement('style');
            elementRemoverStyle.id = 'element-remover-styles';
            elementRemoverStyle.textContent = `
                iframe#previewFrame {
                    pointer-events: auto !important;
                }
                #selection-overlay {
                    position: absolute;
                    border: 3px dashed #e74c3c;
                    background: rgba(231, 76, 60, 0.1);
                    pointer-events: none;
                    z-index: 999999;
                }
            `;
            document.head.appendChild(elementRemoverStyle);
        }

        // Add message listener for iframe interaction
        window.addEventListener('message', handleElementRemoverClick);

        // Inject the selection script into iframe
        injectElementRemoverScript();
    } else {
        elementRemoverStatus.textContent = '';
        elementRemoverStatus.style.color = '';
        elementRemoverStatus.style.fontWeight = '';

        // Remove event listener
        window.removeEventListener('message', handleElementRemoverClick);

        // Remove script from iframe
        removeElementRemoverScript();

        // Remove styles
        if (elementRemoverStyle) {
            elementRemoverStyle.remove();
            elementRemoverStyle = null;
        }
    }
}

function injectElementRemoverScript() {
    try {
        const iframe = previewFrame;
        if (!iframe || !iframe.contentWindow) {
            console.error('❌ Iframe not ready');
            elementRemoverStatus.textContent = '❌ Error: Preview not loaded';
            elementRemoverStatus.style.color = '#e74c3c';
            return;
        }

        // Check if iframe document is accessible
        try {
            if (!iframe.contentDocument || !iframe.contentDocument.body) {
                console.error('❌ Iframe document not accessible, retrying...');
                // Retry after a short delay
                setTimeout(() => {
                    if (isElementRemoverActive) {
                        injectElementRemoverScript();
                    }
                }, 500);
                return;
            }
        } catch (e) {
            console.error('❌ Cannot access iframe document:', e);
            elementRemoverStatus.textContent = '❌ Error: Cannot access preview';
            elementRemoverStatus.style.color = '#e74c3c';
            return;
        }

        // Remove existing overlays and scripts
        const existingOverlay = iframe.contentDocument.getElementById('screenshot-overlay');
        if (existingOverlay) {
            console.log('🧹 Removing existing overlay');
            existingOverlay.remove();
        }

        const existingScript = iframe.contentDocument.getElementById('element-remover-script');
        if (existingScript) {
            console.log('🧹 Removing existing script');
            existingScript.remove();
        }

        console.log('✅ Injecting element remover script into iframe...');

        const script = iframe.contentDocument.createElement('script');
        script.id = 'element-remover-script';
        script.textContent = `
            (function() {
                console.log('📸 Element Remover: Screenshot mode loaded');
                
                let isSelecting = false;
                let startX = 0;
                let startY = 0;
                let selectionBox = null;
                let confirmButton = null;
                let cancelButton = null;
                let selectedElements = [];
                
                // Create semi-transparent overlay with instructions
                const overlay = document.createElement('div');
                overlay.id = 'screenshot-overlay';
                overlay.style.cssText = \`
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    background: rgba(0, 0, 0, 0.5) !important;
                    z-index: 2147483647 !important;
                    cursor: crosshair !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin: 0 !important;
                    padding: 0 !important;
                \`;
                
                console.log('✅ Overlay element created');
                
                // Add instruction text
                const instructionBox = document.createElement('div');
                instructionBox.id = 'instruction-box';
                instructionBox.style.cssText = \`
                    background: white !important;
                    padding: 30px 50px !important;
                    border-radius: 10px !important;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3) !important;
                    text-align: center !important;
                    pointer-events: none !important;
                    animation: fadeIn 0.3s ease-out !important;
                    z-index: 2147483647 !important;
                \`;
                instructionBox.innerHTML = \`
                    <div style="font-size: 48px; margin-bottom: 15px;">📸</div>
                    <div style="font-size: 20px; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">
                        Selection Mode Active
                    </div>
                    <div style="font-size: 16px; color: #7f8c8d;">
                        Click and drag to select area to delete
                    </div>
                \`;
                overlay.appendChild(instructionBox);
                document.body.appendChild(overlay);
                
                console.log('✅ Overlay appended to body');
                console.log('📍 Overlay element:', overlay);
                console.log('📍 Body element:', document.body);
                
                // Force visibility
                setTimeout(() => {
                    overlay.style.display = 'flex';
                    overlay.style.visibility = 'visible';
                    overlay.style.opacity = '1';
                    console.log('🔄 Forced overlay visibility');
                }, 50);
                
                // Add fade in animation
                const style = document.createElement('style');
                style.textContent = \`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.9); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                \`;
                document.head.appendChild(style);
                
                function startSelection(e) {
                    // Hide instruction box on first interaction
                    if (instructionBox) {
                        instructionBox.style.animation = 'fadeOut 0.2s ease-out';
                        setTimeout(() => instructionBox.remove(), 200);
                    }
                    
                    isSelecting = true;
                    const rect = document.body.getBoundingClientRect();
                    startX = e.clientX;
                    startY = e.clientY;
                    
                    // Create selection box
                    if (selectionBox) selectionBox.remove();
                    selectionBox = document.createElement('div');
                    selectionBox.id = 'selection-box';
                    selectionBox.style.cssText = \`
                        position: fixed;
                        border: 3px dashed #e74c3c;
                        background: rgba(231, 76, 60, 0.15);
                        pointer-events: none;
                        z-index: 999999;
                        left: \${startX}px;
                        top: \${startY}px;
                        box-shadow: 0 0 20px rgba(231, 76, 60, 0.5);
                    \`;
                    document.body.appendChild(selectionBox);
                    
                    console.log('📸 Selection started at:', startX, startY);
                }
                
                function updateSelection(e) {
                    if (!isSelecting || !selectionBox) return;
                    
                    const currentX = e.clientX;
                    const currentY = e.clientY;
                    
                    const width = Math.abs(currentX - startX);
                    const height = Math.abs(currentY - startY);
                    const left = Math.min(startX, currentX);
                    const top = Math.min(startY, currentY);
                    
                    selectionBox.style.left = left + 'px';
                    selectionBox.style.top = top + 'px';
                    selectionBox.style.width = width + 'px';
                    selectionBox.style.height = height + 'px';
                }
                
                function endSelection(e) {
                    if (!isSelecting) return;
                    isSelecting = false;
                    
                    const currentX = e.clientX;
                    const currentY = e.clientY;
                    
                    const width = Math.abs(currentX - startX);
                    const height = Math.abs(currentY - startY);
                    
                    // Ignore very small selections
                    if (width < 10 || height < 10) {
                        cleanup();
                        console.log('❌ Selection too small, cancelled');
                        return;
                    }
                    
                    const left = Math.min(startX, currentX);
                    const top = Math.min(startY, currentY);
                    const right = left + width;
                    const bottom = top + height;
                    
                    console.log('📸 Selection area:', { left, top, right, bottom, width, height });
                    
                    // Find all elements within selection
                    selectedElements = findElementsInArea(left, top, right, bottom);
                    console.log('🎯 Found', selectedElements.length, 'elements in selection');
                    
                    if (selectedElements.length === 0) {
                        cleanup();
                        alert('No elements found in selected area');
                        return;
                    }
                    
                    // Highlight selected elements
                    selectedElements.forEach(el => {
                        el.style.outline = '3px solid #e74c3c';
                    });
                    
                    // Show confirmation buttons
                    showConfirmationButtons(left + width / 2, bottom + 10);
                }
                
                function findElementsInArea(left, top, right, bottom) {
                    const elements = [];
                    const allElements = document.querySelectorAll('body *:not(#screenshot-overlay):not(#selection-box):not(#element-remover-script):not(.confirm-button):not(.cancel-button):not(#instruction-box)');
                    
                    allElements.forEach(el => {
                        const rect = el.getBoundingClientRect();
                        
                        // Check if element is within or overlaps the selection
                        const elementLeft = rect.left;
                        const elementTop = rect.top;
                        const elementRight = rect.right;
                        const elementBottom = rect.bottom;
                        
                        const isIntersecting = !(
                            elementRight < left ||
                            elementLeft > right ||
                            elementBottom < top ||
                            elementTop > bottom
                        );
                        
                        if (isIntersecting && rect.width > 0 && rect.height > 0) {
                            elements.push(el);
                        }
                    });
                    
                    return elements;
                }
                
                function showConfirmationButtons(x, y) {
                    // Remove old buttons if exist
                    if (confirmButton) confirmButton.remove();
                    if (cancelButton) cancelButton.remove();
                    
                    // Create confirm button
                    confirmButton = document.createElement('button');
                    confirmButton.className = 'confirm-button';
                    confirmButton.textContent = '✓ Delete';
                    confirmButton.style.cssText = \`
                        position: fixed;
                        left: \${x - 80}px;
                        top: \${y}px;
                        padding: 10px 20px;
                        background: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: bold;
                        z-index: 1000000;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                        transition: all 0.2s;
                    \`;
                    
                    // Create cancel button
                    cancelButton = document.createElement('button');
                    cancelButton.className = 'cancel-button';
                    cancelButton.textContent = '✗ Cancel';
                    cancelButton.style.cssText = \`
                        position: fixed;
                        left: \${x + 10}px;
                        top: \${y}px;
                        padding: 10px 20px;
                        background: #95a5a6;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: bold;
                        z-index: 1000000;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                        transition: all 0.2s;
                    \`;
                    
                    document.body.appendChild(confirmButton);
                    document.body.appendChild(cancelButton);
                    
                    confirmButton.addEventListener('click', confirmDeletion);
                    cancelButton.addEventListener('click', cancelDeletion);
                    
                    // Add hover effects
                    confirmButton.addEventListener('mouseenter', () => {
                        confirmButton.style.transform = 'scale(1.05)';
                    });
                    confirmButton.addEventListener('mouseleave', () => {
                        confirmButton.style.transform = 'scale(1)';
                    });
                    cancelButton.addEventListener('mouseenter', () => {
                        cancelButton.style.transform = 'scale(1.05)';
                    });
                    cancelButton.addEventListener('mouseleave', () => {
                        cancelButton.style.transform = 'scale(1)';
                    });
                }
                
                function confirmDeletion() {
                    console.log('✓ Deletion confirmed');
                    
                    // Get selectors for all selected elements
                    const selectors = selectedElements.map(el => getUniqueSelector(el));
                    
                    // Send to parent
                    window.parent.postMessage({
                        type: 'deleteElements',
                        selectors: selectors,
                        count: selectors.length
                    }, '*');
                    
                    cleanup();
                }
                
                function cancelDeletion() {
                    console.log('❌ Deletion cancelled');
                    cleanup();
                }
                
                function cleanup() {
                    if (selectionBox) selectionBox.remove();
                    if (confirmButton) confirmButton.remove();
                    if (cancelButton) cancelButton.remove();
                    
                    // Remove highlights
                    selectedElements.forEach(el => {
                        if (el && el.style) el.style.outline = '';
                    });
                    
                    selectedElements = [];
                    isSelecting = false;
                }
                
                function getUniqueSelector(element) {
                    if (element.id) {
                        return '#' + element.id;
                    }
                    
                    let path = [];
                    while (element && element.nodeType === Node.ELEMENT_NODE) {
                        let selector = element.nodeName.toLowerCase();
                        if (element.id) {
                            selector += '#' + element.id;
                            path.unshift(selector);
                            break;
                        } else {
                            let sibling = element;
                            let nth = 1;
                            while (sibling.previousElementSibling) {
                                sibling = sibling.previousElementSibling;
                                if (sibling.nodeName.toLowerCase() === selector) nth++;
                            }
                            if (nth !== 1) selector += ':nth-of-type(' + nth + ')';
                        }
                        path.unshift(selector);
                        element = element.parentNode;
                    }
                    return path.join(' > ');
                }
                
                // Add event listeners
                overlay.addEventListener('mousedown', startSelection);
                overlay.addEventListener('mousemove', updateSelection);
                overlay.addEventListener('mouseup', endSelection);
                
                // Cleanup function
                window.elementRemoverCleanup = function() {
                    cleanup();
                    if (overlay) overlay.remove();
                    if (instructionBox) instructionBox.remove();
                    console.log('✓ Element Remover: Cleaned up');
                };
                
                console.log('✓ Element Remover: Screenshot mode ready');
            })();
        `;

        iframe.contentDocument.body.appendChild(script);
        console.log('✅ Element remover script injected successfully!');
        console.log('📸 Screenshot overlay should now be visible in iframe');

        // Verify overlay was created
        setTimeout(() => {
            const overlay = iframe.contentDocument.getElementById('screenshot-overlay');
            if (overlay) {
                console.log('✅ Overlay confirmed visible');
                elementRemoverStatus.textContent = '📸 Overlay active - Click and drag to select';
                elementRemoverStatus.style.color = '#27ae60';
            } else {
                console.error('❌ Overlay not found after injection');
                elementRemoverStatus.textContent = '❌ Overlay failed to load';
                elementRemoverStatus.style.color = '#e74c3c';
            }
        }, 100);
    } catch (error) {
        console.error('❌ Failed to inject element remover script:', error);
        elementRemoverStatus.textContent = '❌ Error: ' + error.message;
        elementRemoverStatus.style.color = '#e74c3c';
    }
}

function removeElementRemoverScript() {
    try {
        const iframe = previewFrame;
        if (!iframe || !iframe.contentWindow) return;

        if (iframe.contentWindow.elementRemoverCleanup) {
            iframe.contentWindow.elementRemoverCleanup();
        }
        const script = iframe.contentDocument.getElementById('element-remover-script');
        if (script) script.remove();
        console.log('✓ Element remover script removed');
    } catch (e) {
        console.error('Error removing element remover script:', e);
    }
}

async function handleElementRemoverClick(event) {
    if (event.data && event.data.type === 'deleteElements') {
        const selectors = event.data.selectors;
        const count = event.data.count;

        console.log('📩 Received delete request for', count, 'elements');
        console.log('🎯 Selectors:', selectors);
        console.log('📝 Current website name:', currentWebsiteName);

        if (!currentWebsiteName) {
            elementRemoverStatus.textContent = '❌ Error: No website loaded';
            elementRemoverStatus.style.color = '#e74c3c';
            console.error('❌ Cannot delete: currentWebsiteName is not set');
            return;
        }

        try {
            elementRemoverStatus.textContent = `⏳ Deleting ${count} element(s)...`;
            console.log('🔄 Sending delete requests to server...');

            // Delete all elements
            let deletedTotal = 0;
            for (const selector of selectors) {
                const res = await fetch(`${API_BASE}/api/delete-element`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        websiteName: currentWebsiteName,
                        selector: selector
                    })
                });

                const data = await parseJSON(res);
                if (data.success) {
                    deletedTotal += data.deletedCount;
                }
            }

            console.log(`✓ Deleted ${deletedTotal} element(s) total`);

            elementRemoverStatus.textContent = `✓ Deleted ${deletedTotal} element(s)!`;
            elementRemoverStatus.style.color = '#27ae60';

            console.log('✓ Elements deleted, reloading preview...');

            // Reload iframe
            setTimeout(() => {
                previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
                setTimeout(() => {
                    elementRemoverStatus.textContent = '📸 Click and drag to select area to delete';
                    elementRemoverStatus.style.color = '#e74c3c';
                }, 1500);
            }, 300);

        } catch (err) {
            console.error('❌ Delete error:', err);
            elementRemoverStatus.textContent = `❌ Error: ${err.message}`;
            elementRemoverStatus.style.color = '#e74c3c';
        }
    }
}

/**
 * Apply bundle styling
 */
function applyBundleStyles() {
    const bgColor = bundleBgColor.value;
    const primaryFont = bundlePrimaryFont.value;
    const headingSize = bundleHeadingSize.value + 'px';
    const headingColor = bundleHeadingColor.value;
    const accentColor = bundleAccentColor.value;
    const buttonColor = bundleButtonColor.value;
    const textColor = bundleTextColor.value;
    const bodySize = bundleBodySize.value + 'px';
    const borderRadius = bundleBorderRadius.value + 'px';
    const padding = bundlePadding.value + 'px 16px';

    // Apply background color and padding
    bundlePreview.style.backgroundColor = bgColor;
    bundlePreview.style.padding = padding;

    // Apply heading styles (h1, h2)
    bundlePreview.querySelectorAll('h1, h2').forEach((heading) => {
        heading.style.fontFamily = primaryFont;
        heading.style.fontSize = headingSize;

        // Apply different colors based on content
        if (heading.textContent.includes('Save') || heading.textContent.includes('Protect') || heading.style.color === 'rgb(227, 45, 45)') {
            heading.style.color = accentColor;
        } else {
            heading.style.color = headingColor;
        }
    });

    // Apply body text styles
    bundlePreview.querySelectorAll('p').forEach((p) => {
        if (!p.closest('button')) {
            p.style.fontFamily = primaryFont;
            p.style.fontSize = bodySize;

            // Keep accent color for specific elements
            if (p.style.color === 'rgb(227, 45, 45)' || p.textContent.includes('Limited') || p.textContent.includes('Only')) {
                p.style.color = accentColor;
            } else if (p.style.color !== 'rgb(153, 153, 153)' && p.style.color !== 'rgb(102, 102, 102)') {
                p.style.color = textColor;
            }
        }
    });

    // Apply card styles
    bundlePreview.querySelectorAll('.card').forEach((card) => {
        card.style.borderRadius = borderRadius;
    });

    // Apply button styles
    bundlePreview.querySelectorAll('button.cta-btn').forEach((btn) => {
        btn.style.backgroundColor = buttonColor;
        btn.style.fontFamily = primaryFont;
    });

    // Apply accent colors to timer and other accent elements
    bundlePreview.querySelectorAll('.timer-units span').forEach((span) => {
        if (span.id === 'hours' || span.id === 'minutes' || span.id === 'seconds') {
            span.style.color = accentColor;
        }
    });

    bundlePreview.querySelectorAll('.timer-section span').forEach((span) => {
        if (span.textContent.includes('Limited')) {
            span.style.color = accentColor;
        }
    });

    // Apply accent color to badges
    bundlePreview.querySelectorAll('.badge-red').forEach((badge) => {
        badge.style.backgroundColor = accentColor;
    });

    console.log('Bundle styles applied successfully');
}

/**
 * Reset bundle styles to default
 */
function resetBundleStyles() {
    bundleBgColor.value = '#FFF7F6';
    bundleBgColorText.value = '#FFF7F6';
    bundlePrimaryFont.value = 'Poppins, sans-serif';
    bundleHeadingSize.value = '34';
    bundleHeadingColor.value = '#000000';
    bundleHeadingColorText.value = '#000000';
    bundleAccentColor.value = '#E32D2D';
    bundleAccentColorText.value = '#E32D2D';
    bundleButtonColor.value = '#1EB13A';
    bundleButtonColorText.value = '#1EB13A';
    bundleTextColor.value = '#000000';
    bundleTextColorText.value = '#000000';
    bundleBodySize.value = '16';
    bundleBorderRadius.value = '10';
    bundlePadding.value = '64';

    applyBundleStyles();
}

/**
 * Upload and inject logo
 */
async function uploadLogo() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    const file = logoInput.files[0];
    if (!file) {
        alert('Please select a logo file');
        return;
    }

    statusIndicator.textContent = "Uploading Logo...";
    statusIndicator.classList.add('loading');
    injectLogoBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('logo', file);
        formData.append('websiteName', currentWebsiteName);

        const res = await fetch(`${API_BASE}/api/inject-logo?websiteName=${encodeURIComponent(currentWebsiteName)}`, {
            method: 'POST',
            body: formData
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Logo upload failed');
        }

        // Reload iframe to show changes
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;

        statusIndicator.textContent = "Active";
        statusIndicator.classList.remove('loading');
        injectLogoBtn.disabled = false;

        console.log('Logo uploaded:', data);
        alert(data.message);

    } catch (err) {
        console.error(err);
        statusIndicator.textContent = "Error";
        statusIndicator.classList.remove('loading');
        injectLogoBtn.disabled = false;
        alert(`Logo upload failed: ${err.message}`);
    }
}

/**
 * Refresh preview
 */
function refreshPreview() {
    if (currentWebsiteName) {
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
    }
}

async function checkSiteStatus() {
    if (!currentWebsiteName) return;
    try {
        const res = await fetch(`${API_BASE}/api/site-status?websiteName=${encodeURIComponent(currentWebsiteName)}`);
        const data = await parseJSON(res);
        if (!data.success) return;
        if (lastSiteModified === null) {
            lastSiteModified = data.lastModified;
            return;
        }
        if (data.lastModified > lastSiteModified) {
            lastSiteModified = data.lastModified;
            previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
        }
    } catch (error) {
        console.warn('Live update check failed:', error);
    }
}

function startLiveUpdates() {
    if (liveUpdateInterval) {
        clearInterval(liveUpdateInterval);
    }
    lastSiteModified = null;
    liveUpdateInterval = setInterval(checkSiteStatus, 5000);
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const label = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    themeToggleBtn.textContent = label;
    themeToggleBtnBundle.textContent = label;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// Event Listeners
extractBtn.addEventListener('click', extractWebsite);
injectBundleBtn.addEventListener('click', openBundleBuilder);
removeIconsCheck.addEventListener('change', (e) => {
    if (e.target.checked) {
        removeHeaderIcons();
    }
});

clearHeaderBtn.addEventListener('click', clearHeader);

elementRemoverCheck.addEventListener('change', (e) => {
    // Check if a website has been loaded
    if (!currentWebsiteName) {
        elementRemoverStatus.textContent = '⚠️ Please load a website first';
        elementRemoverStatus.style.color = '#e67e22';
        elementRemoverCheck.checked = false;
        setTimeout(() => {
            elementRemoverStatus.textContent = '';
        }, 3000);
        return;
    }
    toggleElementRemoverMode(e.target.checked);
});
injectLogoBtn.addEventListener('click', () => logoInput.click());
logoInput.addEventListener('change', uploadLogo);
refreshBtn.addEventListener('click', refreshPreview);
applyRedirectBtn.addEventListener('click', applyButtonRedirect);
editButtonTextBtn.addEventListener('click', editButtonText);
themeToggleBtn.addEventListener('click', toggleTheme);
themeToggleBtnBundle.addEventListener('click', toggleTheme);

bundleBackBtn.addEventListener('click', () => {
    closeBundleBuilder();
});

bundleSaveBtn.addEventListener('click', () => {
    saveBundleDraft();
});

bundleSubmitBtn.addEventListener('click', () => {
    submitBundleDraft();
});

bundleImageInput.addEventListener('change', (e) => {
    handleBundleImagePreview(e.target.files[0]);
});

bundlePreview.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-remove')) {
        const card = e.target.closest('.card');
        removeBundleCard(card);
        return;
    }
    const card = e.target.closest('.card');
    if (card && card.closest('#bundlePreview')) {
        bundlePreview.querySelectorAll('.card').forEach((item) => {
            item.classList.remove('recommended');
            item.style.border = '1px solid #E0E0E0';
            const badge = item.querySelector('.badge-red, .badge-gray');
            if (badge) {
                badge.classList.remove('badge-red');
                badge.classList.add('badge-gray');
                badge.style.background = '#EBEBEB';
                badge.style.color = '#000';
            }
        });

        card.classList.add('recommended');
        card.style.border = '2px solid #FC0000';
        const badge = card.querySelector('.badge-gray, .badge-red');
        if (badge) {
            badge.classList.remove('badge-gray');
            badge.classList.add('badge-red');
            badge.style.background = '#FC0000';
            badge.style.color = '#fff';
        }
        selectedBundleCard = card;

        // Load redirect URL if exists
        const redirectUrl = card.getAttribute('data-redirect-url') || '';
        cardRedirectUrl.value = redirectUrl;
    }
});

// Save redirect URL to selected card when input changes
cardRedirectUrl.addEventListener('input', (e) => {
    if (selectedBundleCard) {
        const url = e.target.value.trim();
        if (url) {
            selectedBundleCard.setAttribute('data-redirect-url', url);
            // Apply to button immediately for preview
            const button = selectedBundleCard.querySelector('.cta-btn');
            if (button) {
                // If button exists, convert to anchor or update href
                if (button.tagName.toLowerCase() === 'button') {
                    const a = document.createElement('a');
                    a.href = url;
                    a.className = button.className;
                    a.textContent = button.textContent;
                    a.style.cssText = button.style.cssText + '; text-decoration: none; display: inline-block;';
                    button.replaceWith(a);
                } else if (button.tagName.toLowerCase() === 'a') {
                    button.href = url;
                }
            }
        } else {
            selectedBundleCard.removeAttribute('data-redirect-url');
        }
    }
});

bundleAddImageBtn.addEventListener('click', () => {
    addImageToSelectedCard();
});

bundleRemoveImageBtn.addEventListener('click', () => {
    removeImageFromSelectedCard();
});

// Bundle Styling Event Listeners
bundleBgColor.addEventListener('input', (e) => {
    bundleBgColorText.value = e.target.value;
});

bundleBgColorText.addEventListener('input', (e) => {
    bundleBgColor.value = e.target.value;
});

bundleHeadingColor.addEventListener('input', (e) => {
    bundleHeadingColorText.value = e.target.value;
});

bundleHeadingColorText.addEventListener('input', (e) => {
    bundleHeadingColor.value = e.target.value;
});

bundleAccentColor.addEventListener('input', (e) => {
    bundleAccentColorText.value = e.target.value;
});

bundleAccentColorText.addEventListener('input', (e) => {
    bundleAccentColor.value = e.target.value;
});

bundleButtonColor.addEventListener('input', (e) => {
    bundleButtonColorText.value = e.target.value;
});

bundleButtonColorText.addEventListener('input', (e) => {
    bundleButtonColor.value = e.target.value;
});

bundleTextColor.addEventListener('input', (e) => {
    bundleTextColorText.value = e.target.value;
});

bundleTextColorText.addEventListener('input', (e) => {
    bundleTextColor.value = e.target.value;
});

bundleApplyStyleBtn.addEventListener('click', () => {
    applyBundleStyles();
});

bundleResetStyleBtn.addEventListener('click', () => {
    resetBundleStyles();
});

deployNetlifyBtn.addEventListener('click', async () => {
    await deployToNetlify();
});

// Allow Enter key
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') extractWebsite();
});

/**
 * Apply button redirect
 */
async function applyButtonRedirect() {
    const buttonType = buttonTargetSelect.value;
    const destination = redirectDestinationSelect.value;

    if (!buttonType) {
        redirectStatus.textContent = 'Please select a button to redirect';
        redirectStatus.style.color = '#dc2626';
        return;
    }

    if (!destination) {
        redirectStatus.textContent = 'Please select a destination';
        redirectStatus.style.color = '#dc2626';
        return;
    }

    if (!currentWebsiteName) {
        redirectStatus.textContent = 'Please extract a website first';
        redirectStatus.style.color = '#dc2626';
        return;
    }

    try {
        applyRedirectBtn.disabled = true;
        redirectStatus.textContent = 'Applying redirect...';
        redirectStatus.style.color = '#6366f1';

        const res = await fetch(`${API_BASE}/api/apply-button-redirect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                websiteName: currentWebsiteName,
                buttonType: buttonType,
                destination: destination
            })
        });

        const data = await parseJSON(res);

        if (data.success) {
            redirectStatus.textContent = `✓ Redirect applied: ${buttonType} → ${destination}`;
            redirectStatus.style.color = '#16a34a';
            console.log('Button redirect applied successfully');
            // Refresh preview
            setTimeout(() => reloadPreview(), 500);
        } else {
            throw new Error(data.error || 'Failed to apply redirect');
        }

    } catch (error) {
        console.error('Button redirect error:', error);
        redirectStatus.textContent = `✗ Error: ${error.message}`;
        redirectStatus.style.color = '#dc2626';
    } finally {
        applyRedirectBtn.disabled = false;
    }
}

/**
 * Deploy site to Netlify
 */
async function deployToNetlify() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    const token = netlifyTokenInput.value.trim();
    if (!token) {
        alert('Please enter your Netlify Personal Access Token');
        netlifyTokenInput.focus();
        return;
    }

    deployStatus.textContent = 'Deploying to Netlify...';
    deployStatus.style.color = '#666';
    deployNetlifyBtn.disabled = true;
    deployNetlifyBtn.textContent = '🚀 Deploying...';

    try {
        const res = await fetch(`${API_BASE}/api/deploy-netlify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                websiteName: currentWebsiteName,
                netlifyToken: token
            })
        });

        const data = await parseJSON(res);

        if (!data.success) {
            throw new Error(data.error || 'Deployment failed');
        }

        deployStatus.textContent = `✅ Deployed successfully!`;
        deployStatus.style.color = '#1EB13A';

        // Open the deployed site in new tab
        window.open(data.url, '_blank');

        console.log('Deployment successful:', data);
        alert(`Site deployed successfully!\n\nLive URL: ${data.url}\n\nOpening in new tab...`);

    } catch (err) {
        console.error('Deployment error:', err);
        deployStatus.textContent = `❌ ${err.message}`;
        deployStatus.style.color = '#E32D2D';
        alert(`Deployment failed: ${err.message}`);
    } finally {
        deployNetlifyBtn.disabled = false;
        deployNetlifyBtn.textContent = '🚀 Deploy to Netlify';
    }
}

// Load saved token from localStorage or use default
const savedToken = localStorage.getItem('netlifyToken') || 'nfp_hTepyurcDd2DRXTYM6yi8zBxpBc6Bw5Ccd72';
if (savedToken) {
    netlifyTokenInput.value = savedToken;
}

// Save token to localStorage when changed
netlifyTokenInput.addEventListener('change', () => {
    const token = netlifyTokenInput.value.trim();
    if (token) {
        localStorage.setItem('netlifyToken', token);
    }
});

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
setTheme(savedTheme);

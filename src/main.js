// State
let currentWebsiteName = null;

const urlInput = document.getElementById('urlInput');
const extractBtn = document.getElementById('extractBtn');
const previewFrame = document.getElementById('previewFrame');
const controlsPanel = document.getElementById('controlsPanel');
const placeholderState = document.getElementById('placeholderState');
const statusIndicator = document.getElementById('statusIndicator');
const downloadShopifyBtn = document.getElementById('downloadShopifyBtn');
const downloadHeadlessBtn = document.getElementById('downloadHeadlessBtn');
const downloadStatus = document.getElementById('downloadStatus');
const refreshBtn = document.getElementById('refreshBtn');

// Backend API base URL
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

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.error || 'Extraction failed');
        }

        currentWebsiteName = data.websiteName;

        // Load the extracted site in iframe
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html`;

        statusIndicator.textContent = "Active";
        statusIndicator.classList.remove('loading');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="icon">⚡</span> Extract Website';
        placeholderState.classList.add('hidden');
        controlsPanel.classList.remove('hidden');

        console.log('Website extracted:', data);

    } catch (err) {
        console.error(err);
        statusIndicator.textContent = "Error";
        statusIndicator.classList.remove('loading');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="icon">⚡</span> Extract Website';
        alert(`Extraction failed: ${err.message}`);
    }
}

/**
 * Download as Shopify Theme
 */
async function downloadShopifyTheme() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    downloadStatus.textContent = 'Converting to Shopify theme...';
    downloadStatus.style.color = '#3498db';
    downloadShopifyBtn.disabled = true;

    try {
        const url = `${API_BASE}/api/download-zip/${encodeURIComponent(currentWebsiteName)}?shopify=true`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to convert to Shopify theme');
        }

        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `${currentWebsiteName}-shopify-theme.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        downloadStatus.textContent = '✅ Shopify theme downloaded! Ready to upload to Shopify.';
        downloadStatus.style.color = '#27ae60';

    } catch (err) {
        downloadStatus.textContent = 'Conversion failed: ' + err.message;
        downloadStatus.style.color = '#e74c3c';
    } finally {
        downloadShopifyBtn.disabled = false;
        setTimeout(() => {
            downloadStatus.textContent = '';
            downloadStatus.style.color = '';
        }, 5000);
    }
}

/**
 * Download as Headless Shopify (Netlify)
 */
async function downloadHeadless() {
    if (!currentWebsiteName) {
        alert('Please extract a website first');
        return;
    }

    downloadStatus.textContent = 'Preparing Headless package (Netlify)...';
    downloadStatus.style.color = '#3498db';
    downloadHeadlessBtn.disabled = true;

    try {
        const res = await fetch(`${API_BASE}/api/download-headless`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteName: currentWebsiteName })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || 'Failed to create headless package');
        }

        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `${currentWebsiteName}-headless-deploy.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        downloadStatus.textContent = '✅ Headless package downloaded! Ready for Netlify.';
        downloadStatus.style.color = '#27ae60';

    } catch (err) {
        console.error(err);
        downloadStatus.textContent = 'Headless conversion failed: ' + err.message;
        downloadStatus.style.color = '#e74c3c';
    } finally {
        downloadHeadlessBtn.disabled = false;
        setTimeout(() => {
            if (downloadStatus.textContent.includes('Headless')) {
                downloadStatus.textContent = '';
            }
        }, 5000);
    }
}

// Headless Panel Logic
openHeadlessBtn.addEventListener('click', () => {
    controlsPanel.classList.add('hidden');
    headlessPanel.classList.remove('hidden');
});

closeHeadlessBtn.addEventListener('click', () => {
    headlessPanel.classList.add('hidden');
    controlsPanel.classList.remove('hidden');
});

const mappingContainer = document.getElementById('mappingContainer');
const deploymentResult = document.getElementById('deploymentResult');
const liveUrlLink = document.getElementById('liveUrlLink');

// Add Row using Template
addMappingBtn.addEventListener('click', () => {
    const template = document.querySelector('.mapping-row.template');
    const clone = template.cloneNode(true);
    clone.classList.remove('template');
    clone.style.display = 'flex';

    clone.querySelector('.remove-btn').addEventListener('click', () => clone.remove());
    mappingContainer.appendChild(clone);
});

async function deployHeadless() {
    if (!currentWebsiteName) return alert('No website extracted');

    const domain = document.getElementById('shopifyDomain').value;
    const token = document.getElementById('shopifyToken').value;
    const netlifyToken = document.getElementById('netlifyToken').value;

    // Collect Mappings
    // Collect Mappings
    const productMapping = {};
    document.querySelectorAll('.mapping-row:not(.template)').forEach(row => {
        const key = row.querySelector('.map-key').value.trim();
        const val = row.querySelector('.map-val').value.trim();
        const action = row.querySelector('.map-action').value;

        if (key && val) {
            productMapping[key] = {
                variantId: val,
                action: action // 'cart' or 'checkout'
            };
        }
    });

    const shopifyConfig = {
        domain,
        storefrontAccessToken: token,
        productMapping
    };

    headlessStatus.textContent = 'Processing...';
    headlessStatus.style.color = '#3498db';
    deployHeadlessBtn.disabled = true;
    deployHeadlessBtn.innerHTML = '⏳ Deploying...';
    saveHeadlessBtn.disabled = true;
    deploymentResult.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE}/api/deploy-headless`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                websiteName: currentWebsiteName,
                shopifyConfig: shopifyConfig,
                netlifyToken: netlifyToken
            })
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error);

        if (data.deploy) {
            headlessStatus.textContent = '🚀 Live on Netlify!';
            headlessStatus.style.color = '#27ae60';
            liveUrlLink.href = data.deploy.url;
            deploymentResult.classList.remove('hidden');
        } else {
            headlessStatus.innerHTML = `✅ Configured & Zipped! <a href="${API_BASE}${data.downloadUrl}">Download Zip</a>`;
            headlessStatus.style.color = '#f39c12';
        }

    } catch (err) {
        console.error(err);
        headlessStatus.textContent = 'Error: ' + err.message;
        headlessStatus.style.color = '#e74c3c';
    } finally {
        deployHeadlessBtn.disabled = false;
        deployHeadlessBtn.innerHTML = '🚀 Deploy to Netlify';
        saveHeadlessBtn.disabled = false;
    }
}

// Save Settings Only
function saveHeadlessSettings() {
    const domain = document.getElementById('shopifyDomain').value.trim();
    const token = document.getElementById('shopifyToken').value.trim();
    const netlifyToken = document.getElementById('netlifyToken').value.trim();

    // Collect Mappings
    const rows = document.querySelectorAll('.mapping-row:not(.template)');
    const mappings = [];
    rows.forEach(row => {
        const key = row.querySelector('.map-key').value.trim();
        const val = row.querySelector('.map-val').value.trim();
        const action = row.querySelector('.map-action').value;
        if (key && val) {
            mappings.push({ key, val, action });
        }
    });

    const settings = {
        domain,
        token,
        netlifyToken,
        mappings
    };

    localStorage.setItem('headless_settings', JSON.stringify(settings));

    headlessStatus.textContent = '💾 Settings Saved!';
    headlessStatus.style.color = '#27ae60';
    setTimeout(() => {
        headlessStatus.textContent = '';
    }, 3000);
}

// Load Settings
function loadHeadlessSettings() {
    const saved = localStorage.getItem('headless_settings');
    if (!saved) return;

    try {
        const settings = JSON.parse(saved);
        if (settings.domain) document.getElementById('shopifyDomain').value = settings.domain;
        if (settings.token) document.getElementById('shopifyToken').value = settings.token;
        if (settings.netlifyToken) document.getElementById('netlifyToken').value = settings.netlifyToken;

        if (settings.mappings && Array.isArray(settings.mappings)) {
            const container = document.getElementById('mappingContainer');
            // Clear existing except template
            container.querySelectorAll('.mapping-row:not(.template)').forEach(el => el.remove());

            settings.mappings.forEach(m => {
                const row = document.querySelector('.mapping-row.template').cloneNode(true);
                row.classList.remove('template');
                row.style.display = 'flex';
                row.querySelector('.map-key').value = m.key;
                row.querySelector('.map-val').value = m.val;
                row.querySelector('.map-action').value = m.action || 'cart';

                row.querySelector('.remove-btn').addEventListener('click', () => {
                    row.remove();
                });

                container.appendChild(row);
            });
        }
    } catch (e) {
        console.error('Error loading settings', e);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadHeadlessSettings);

deployHeadlessBtn.addEventListener('click', async () => {
    saveHeadlessSettings(); // Auto-save on deploy
    await deployHeadless();
});
saveHeadlessBtn.addEventListener('click', saveHeadlessSettings);

// Refresh preview
function refreshPreview() {
    if (currentWebsiteName) {
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
    }
}

// Event Listeners
extractBtn.addEventListener('click', extractWebsite);
downloadShopifyBtn.addEventListener('click', downloadShopifyTheme);
downloadHeadlessBtn.addEventListener('click', downloadHeadless); // Keep old button functional if needed or remove
refreshBtn.addEventListener('click', refreshPreview);

// Allow Enter key to trigger extraction
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        extractWebsite();
    }
});

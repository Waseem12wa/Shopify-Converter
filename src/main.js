// State
let currentWebsiteName = null;

const urlInput = document.getElementById('urlInput');
const extractBtn = document.getElementById('extractBtn');
const previewFrame = document.getElementById('previewFrame');
const controlsPanel = document.getElementById('controlsPanel');
const placeholderState = document.getElementById('placeholderState');
const statusIndicator = document.getElementById('statusIndicator');
const downloadShopifyBtn = document.getElementById('downloadShopifyBtn');
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

// Refresh preview
function refreshPreview() {
    if (currentWebsiteName) {
        previewFrame.src = `${API_BASE}/preview/${currentWebsiteName}/index.html?t=${Date.now()}`;
    }
}

// Event Listeners
extractBtn.addEventListener('click', extractWebsite);
downloadShopifyBtn.addEventListener('click', downloadShopifyTheme);
refreshBtn.addEventListener('click', refreshPreview);

// Allow Enter key to trigger extraction
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        extractWebsite();
    }
});

// Initialize App
function startApp() {
    const shopifyDeployPanel = document.getElementById('shopifyDeployPanel');
    const openShopifyDeployBtn = document.getElementById('openShopifyDeployBtn');
    const closeShopifyDeployBtn = document.getElementById('closeShopifyDeployBtn');
    const startDeployBtn = document.getElementById('startDeployBtn');
    const shopifyDeployStatus = document.getElementById('shopifyDeployStatus');
    const shopifyDeployResult = document.getElementById('shopifyDeployResult');
    const shopifyPreviewLink = document.getElementById('shopifyPreviewLink');

    if (openShopifyDeployBtn) {
        openShopifyDeployBtn.addEventListener('click', () => {
            console.log('Deploy button clicked');
            if (controlsPanel) controlsPanel.classList.add('hidden');
            if (shopifyDeployPanel) {
                shopifyDeployPanel.classList.remove('hidden');
                console.log('Panel should be visible now');
            } else {
                console.error('Shopify Deploy Panel not found');
            }

            // Load saved settings
            try {
                const saved = localStorage.getItem('shopify_deploy_settings');
                if (saved) {
                    const settings = JSON.parse(saved);
                    if (settings.domain) document.getElementById('deployShopDomain').value = settings.domain;
                    if (settings.token) document.getElementById('deployShopToken').value = settings.token;
                }
            } catch (e) {
                console.error('Error loading settings', e);
            }
        });
    } else {
        console.error('Deploy button element not found in DOM');
    }

    if (closeShopifyDeployBtn) {
        closeShopifyDeployBtn.addEventListener('click', () => {
            shopifyDeployPanel.classList.add('hidden');
            controlsPanel.classList.remove('hidden');
        });
    }

    if (startDeployBtn) {
        startDeployBtn.addEventListener('click', async () => {
            const domain = document.getElementById('deployShopDomain').value.trim();
            const token = document.getElementById('deployShopToken').value.trim();

            if (!domain || !token) {
                alert('Please enter both Shop Domain and Access Token');
                return;
            }

            if (!currentWebsiteName) {
                alert('Please extract a website first');
                return;
            }

            // Save settings
            localStorage.setItem('shopify_deploy_settings', JSON.stringify({ domain, token }));

            startDeployBtn.disabled = true;
            startDeployBtn.textContent = 'Deploying...';
            shopifyDeployStatus.textContent = 'Converting and Uploading... This may take a minute.';
            shopifyDeployStatus.style.color = '#3498db';
            shopifyDeployResult.classList.add('hidden');

            try {
                const res = await fetch(`${API_BASE}/api/deploy-shopify-theme`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        websiteName: currentWebsiteName,
                        shopDomain: domain,
                        accessToken: token
                    })
                });

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.error || 'Deployment failed');
                }

                shopifyDeployStatus.textContent = '✅ Deployment Successful!';
                shopifyDeployStatus.style.color = '#27ae60';

                shopifyPreviewLink.href = data.previewUrl;
                shopifyDeployResult.classList.remove('hidden');

            } catch (err) {
                console.error(err);
                shopifyDeployStatus.textContent = 'Error: ' + err.message;
                shopifyDeployStatus.style.color = '#e74c3c';
            } finally {
                startDeployBtn.disabled = false;
                startDeployBtn.textContent = '🚀 Upload Theme';
            }
        });
    } else {
        console.error('Start Deploy Button not found');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}

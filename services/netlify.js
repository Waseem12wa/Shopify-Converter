import axios from 'axios';
import FormData from 'form-data';
import archiver from 'archiver';
import fs from 'fs-extra';
import path from 'path';

class NetlifyDeployer {
    constructor(token) {
        this.token = token;
        this.apiUrl = 'https://api.netlify.com/api/v1';
    }

    /**
     * Deploy a site folder to Netlify
     */
    async deploySite(sitePath, siteName) {
        try {
            console.log(`Starting Netlify deployment for: ${siteName}`);
            
            // Create a zip file of the site
            const zipPath = path.join(path.dirname(sitePath), `${siteName}.zip`);
            await this.zipDirectory(sitePath, zipPath);
            
            console.log('Site zipped successfully');
            
            // Create or get site
            const site = await this.createSite(siteName);
            console.log(`Site created/retrieved: ${site.id}`);
            
            // Deploy the zip file
            const deployment = await this.deployZip(site.id, zipPath);
            
            // Clean up zip file
            await fs.remove(zipPath);
            
            console.log('Deployment successful!');
            console.log(`Site URL: ${deployment.deploy_ssl_url || deployment.ssl_url}`);
            
            return {
                success: true,
                siteId: site.id,
                deployId: deployment.id,
                url: deployment.deploy_ssl_url || deployment.ssl_url,
                adminUrl: site.admin_url
            };
            
        } catch (error) {
            console.error('Netlify deployment error:', error.response?.data || error.message);
            throw new Error(`Netlify deployment failed: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Create a zip file from directory
     */
    async zipDirectory(sourceDir, outPath) {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(outPath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            output.on('close', () => {
                console.log(`Zip created: ${archive.pointer()} bytes`);
                resolve();
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);
            archive.directory(sourceDir, false);
            archive.finalize();
        });
    }

    /**
     * Create a new site or get existing one
     */
    async createSite(siteName) {
        try {
            const response = await axios.post(
                `${this.apiUrl}/sites`,
                {
                    name: siteName.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            // If site already exists, try to get it
            if (error.response?.status === 422) {
                const sites = await this.getSites();
                const existingSite = sites.find(s => 
                    s.name.includes(siteName.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
                );
                if (existingSite) {
                    return existingSite;
                }
            }
            throw error;
        }
    }

    /**
     * Get all sites
     */
    async getSites() {
        const response = await axios.get(`${this.apiUrl}/sites`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return response.data;
    }

    /**
     * Deploy zip file to site
     */
    async deployZip(siteId, zipPath) {
        const zipBuffer = await fs.readFile(zipPath);
        
        const response = await axios.post(
            `${this.apiUrl}/sites/${siteId}/deploys`,
            zipBuffer,
            {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/zip'
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );
        
        return response.data;
    }
}

export default NetlifyDeployer;

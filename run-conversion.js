import HeadlessConverter from './services/headless-converter.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteName = 'get-clariohome-com-sp-review-1-hyper-charge-pro-us-v2';
const websitePath = path.resolve(__dirname, 'downloads', websiteName);

console.log('Starting conversion for:', websiteName);
console.log('Website Path:', websitePath);

HeadlessConverter.convertToHeadless(websitePath, websiteName)
    .then(res => {
        console.log('Conversion successful!');
        console.log(JSON.stringify(res, null, 2));
    })
    .catch(err => {
        console.error('Conversion failed:', err);
        process.exit(1);
    });

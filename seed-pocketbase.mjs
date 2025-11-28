import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        await pb.admins.authWithPassword('admin@zoo.local', '1234567890');

        const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));

        for (const p of productsData) {
            // Check if product exists
            try {
                const existing = await pb.collection('products').getFirstListItem(`name="${p.name}"`);
                if (existing) {
                    console.log(`Product "${p.name}" already exists.`);
                    continue;
                }
            } catch (e) {
                // Not found, proceed
            }

            const formData = new FormData();
            formData.append('name', p.name);
            formData.append('description', p.description);
            formData.append('price', p.price);

            // Handle image
            if (p.image) {
                const imagePath = path.join(__dirname, 'public', p.image);
                if (fs.existsSync(imagePath)) {
                    const fileBuffer = fs.readFileSync(imagePath);
                    const blob = new Blob([fileBuffer]);
                    formData.append('image', blob, path.basename(imagePath));
                } else {
                    console.warn(`Image not found: ${imagePath}`);
                }
            }

            await pb.collection('products').create(formData);
            console.log(`Created product: ${p.name}`);
        }

    } catch (error) {
        console.error('Error seeding:', error);
    }
}

main();

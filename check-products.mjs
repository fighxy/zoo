import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function checkProducts() {
    try {
        // Authenticate as admin
        await pb.admins.authWithPassword('admin@zoo.local', '1234567890');

        // Get all products
        const products = await pb.collection('products').getFullList();

        console.log(`\nFound ${products.length} products:\n`);

        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.Name || 'No name'}`);
            console.log(`   ID: ${product.id}`);
            console.log(`   Price: ${product.Price || 'N/A'}`);
            console.log(`   Description: ${product.Description || 'N/A'}`);
            console.log(`   Category: ${product.Category || 'N/A'}`);
            console.log(`   Image: ${JSON.stringify(product.Image)}`);
            console.log('');
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

checkProducts();

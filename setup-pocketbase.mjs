import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        // 1. Authenticate as Admin
        await pb.admins.authWithPassword('admin@zoo.local', '1234567890');
        console.log('Logged in as admin');

        // 2. Check if collection exists
        try {
            await pb.collections.getFirstListItem('name="products"');
            console.log('Collection "products" already exists');
            return;
        } catch (e) {
            // Collection doesn't exist, proceed to create
        }

        // 3. Create 'products' collection
        const collection = await pb.collections.create({
            name: 'products',
            type: 'base',
            schema: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'price',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'file',
                    required: false,
                    options: {
                        maxSelect: 1,
                        maxSize: 5242880, // 5MB
                        mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
                    }
                }
            ],
            listRule: '', // Public
            viewRule: '', // Public
            createRule: null, // Admin only
            updateRule: null, // Admin only
            deleteRule: null, // Admin only
        });

        console.log('Created collection "products"');

    } catch (error) {
        console.error('Error:', error);
    }
}

main();

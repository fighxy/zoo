import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
    try {
        await pb.admins.authWithPassword('admin@zoo.local', '1234567890');

        const collections = await pb.collections.getFullList();
        console.log('Collections found:', collections.length);

        for (const col of collections) {
            console.log(`\nCollection: ${col.name} (ID: ${col.id})`);
            const fields = col.fields || col.schema || [];
            console.log('Fields:', fields.map(f => `${f.name} (${f.type})`).join(', '));

            if (col.name === 'products') {
                console.log('Full definition:', JSON.stringify(col, null, 2));
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

main();

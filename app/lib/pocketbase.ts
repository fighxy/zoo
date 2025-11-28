import PocketBase from 'pocketbase';

// Create a new PocketBase instance
// When running on the server, we might want to use the internal Docker URL if applicable,
// but for now, localhost is fine.
export const pb = new PocketBase('http://127.0.0.1:8090');

// Disable auto-cancellation to avoid issues with React Strict Mode in dev
pb.autoCancellation(false);

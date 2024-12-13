import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve (__dirname, 'index.html'),
                login: resolve (__dirname, 'account/auth.html'),
                profile: resolve (__dirname, 'profile/index.html'),
                create: resolve (__dirname, 'profile/create.html'),
                listing: resolve (__dirname, 'listing/singleListing.html'),
            },
        },
    },
});
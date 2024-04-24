import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const port = 5173;
let origin = '';
if (process.env.IS_DDEV_PROJECT && process.env.DDEV_HOSTNAME) {
    // get first additional domain name from DDEV env vars
    origin = `https://${process.env.DDEV_HOSTNAME.split(',')[1]}`;
}
console.log(`Starting dev server with origin "${origin}"`);

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    server: {
        host: '0.0.0.0', // respond to all network requests
        origin: origin, // important
        strictPort: true,
        port: port
    }
});

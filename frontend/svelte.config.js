import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {

    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),

        // Only check CSRF in prod (thx to https://stackoverflow.com/a/70343901)
        // TODO: try to re-enable this for local dev as well, ORIGIN= did not work in package.json
        csrf: {
            checkOrigin: process.env.NODE_ENV !== 'development',
        },
    }
};

export default config;

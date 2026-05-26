// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://limchayseng.com',
	integrations: [mdx(), sitemap()],
	// Skip on-build image optimization. Sharp wasn't running reliably on
	// Cloudflare Pages, leaving images served via the dev-only `/_image?`
	// endpoint which 404s on a static deploy. Passthrough ships originals.
	image: {
		service: passthroughImageService(),
	},
});

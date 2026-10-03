import { defineConfig } from 'vite';

// Update SITE_URL once the final domain is known; it feeds canonical/OG tags,
// robots.txt and sitemap.xml.
const SITE_URL = 'https://hanagumori.vercel.app';

export default defineConfig({
  plugins: [{
    name: 'site-url',
    transformIndexHtml: html => html.replaceAll('__SITE_URL__', SITE_URL),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc></url>\n</urlset>\n` });
    },
  }],
});

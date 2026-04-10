// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [mdx()],
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [{
      name: 'portfolio-json-reload',
      configureServer(server) {
        server.watcher.setMaxListeners(20);
        server.watcher.add('./src/content/portfolio/*.json');
        server.watcher.on('change', (file) => {
          if (file.includes('content/portfolio') && file.endsWith('.json')) {
            server.ws.send({ type: 'full-reload' });
          }
        });
      }
    }]
  }
});

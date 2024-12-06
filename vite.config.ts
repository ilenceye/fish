import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import { createMpaPlugin } from 'vite-plugin-virtual-mpa';

import { Config } from './config';

const getNewHtml = (html: string, filename: string) => {
  return html.replace(
    '<title></title>',
    `<title>${filename === 'index' ? Config.title : filename}</title>`,
  );
};

export default defineConfig({
  plugins: [
    react(),
    createMpaPlugin({
      scanOptions: {
        scanDirs: 'src/pages',
        entryFile: 'main.tsx',
        filename: (name) =>
          name === 'index' ? 'index.html' : `${name}/index.html`,
        template: '../../template.html',
      },
      transformHtml(html, ctx) {
        return {
          html: getNewHtml(html, ctx.page.name),
          tags: [],
        };
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});

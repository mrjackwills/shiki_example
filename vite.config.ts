import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
	Components(),
	AutoImport({
		include: [
			/\.[tj]sx?$/,
			/\.vue$/, /\.vue\?vue/,
			/\.md$/,
		],
		imports: [
			'vue',
		],
		dts: 'src/auto-imports.d.ts',
		eslintrc: {
			enabled: true,
		},
		vueTemplate: false,
	}),
	viteCompression({ algorithm: 'brotliCompress' }),
	viteCompression({ algorithm: 'gzip' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  html:{
	cspNonce: '**CSP_NONCE**'
  },
  server: {
	port: 8002,
	host: '127.0.0.1'
},
})

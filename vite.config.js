import 'dotenv/config'
import restart from 'vite-plugin-restart'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default {
    root: 'sources/', // Sources files (typically where index.html is)
    envDir: '../',  // Directory where the env file is located
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    base: './', // Public path (what's after the domain)
    server:
    {
        // https: true,
        host: true, // Open to local network and display URL
        open: true // Open in browser
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: false, // Add sourcemap
        // Three.js WebGPU/TSL, çalışma anında sınıf/fonksiyon isimlerine güvenir.
        // Minification bu isimleri bozunca bazı GPU'larda shader derlemesi başarısız olup
        // lacivert/siyah ekrana yol açıyor. İsimleri koruyarak bunu engelliyoruz.
        minify: 'terser',
        terserOptions:
        {
            keep_classnames: true,
            keep_fnames: true
        }
    },
    esbuild:
    {
        keepNames: true
    },
    plugins:
    [
        wasm(),
        topLevelAwait(),
        restart({ restart: [ '../static/**', ] }), // Restart server on static file change
        nodePolyfills(),
        // basicSsl()
    ]
}
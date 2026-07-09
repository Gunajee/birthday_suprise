import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
  },

  preview: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: ["rubigabirthday.up.railway.app"],
  },

  // ── Dependency pre-bundling ──────────────────────────────────
  // Forces Vite to pre-bundle react-player during dev so its CJS
  // exports are handled the same way in dev and production.
  optimizeDeps: {
    include: ["react-player"],
  },

  build: {
    // ── CJS/ESM interop ─────────────────────────────────────────
    // react-player ships as CommonJS. Without this, Rollup's
    // production build can resolve its default export as undefined
    // (works fine in dev, breaks only after build) — this is what
    // was causing "Minified React error #130" when clicking a video
    // card, since <ReactPlayer /> resolved to undefined.
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    // ── Minification & obfuscation ─────────────────────────────
    // 'terser' gives better obfuscation than the default 'esbuild'
    // minifier — it renames variables to single letters, removes
    // comments, mangles function names, etc. making source unreadable
    // even if someone extracts the JS bundle.
    minify: false,
    terserOptions: {
      compress: {
        drop_console: true, // removes all console.log/warn/info calls
        drop_debugger: true, // removes debugger statements
        pure_funcs: [
          "console.log",
          "console.warn",
          "console.info",
          "console.debug",
        ],
        passes: 3, // multiple compression passes = smaller + harder to read
        unsafe: true,
        unsafe_comps: true,
        unsafe_proto: true,
      },
      mangle: {
        // toplevel: false — mangling top-level names was breaking the
        // link between chunks (React ending up undefined in chunks
        // that depend on it, e.g. framer-motion / react-three-fiber
        // calling useLayoutEffect on an undefined React object).
        toplevel: false,
        properties: {
          regex: /^_/, // mangle any property starting with _ (private convention)
        },
      },
      format: {
        comments: false, // strip all comments from output
        ascii_only: true, // encode unicode as \uXXXX (harder to read)
      },
    },

    // ── Chunk splitting ────────────────────────────────────────
    // manualChunks removed for now — splitting React away from
    // libraries that depend on its internals (framer-motion, three/
    // @react-three) was causing those chunks to load before/without
    // a valid React reference. Letting Vite/Rollup handle chunking
    // automatically keeps React bundled with whatever needs it.
    rollupOptions: {
      output: {
        // Randomise chunk filenames (hash-based, not name-based)
        chunkFileNames: "assets/[hash].js",
        entryFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
      },
    },

    // ── Source maps ────────────────────────────────────────────
    // NEVER generate source maps for production — source maps are
    // essentially the unminified source code bundled alongside the
    // build. With sourcemap: false, even if she opens DevTools →
    // Sources, she only sees the minified/obfuscated bundle.
    sourcemap: false,
  },
});

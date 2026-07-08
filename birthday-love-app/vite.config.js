import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
  },

  build: {
    // ── Minification & obfuscation ─────────────────────────────
    // 'terser' gives better obfuscation than the default 'esbuild'
    // minifier — it renames variables to single letters, removes
    // comments, mangles function names, etc. making source unreadable
    // even if someone extracts the JS bundle.
    minify: "terser",
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
        toplevel: true, // renames top-level variable/function names
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
    // Split into many small chunks — makes it harder to find any
    // specific piece of logic because it's spread across many files.
    rollupOptions: {
      output: {
        // Randomise chunk filenames (hash-based, not name-based)
        chunkFileNames: "assets/[hash].js",
        entryFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",

        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // Vendor libraries in their own chunk
            if (id.includes("react") || id.includes("react-dom"))
              return "v-react";
            if (id.includes("framer-motion")) return "v-motion";
            if (id.includes("three") || id.includes("@react-three"))
              return "v-3d";
            return "v-libs";
          }
        },
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

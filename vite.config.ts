import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "5173-ikt6svlgpaw4yo0jhcmn6-58c53dbc.us2.manus.computer"
    ],
  hmr: {
    overlay: false,
  },
},
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

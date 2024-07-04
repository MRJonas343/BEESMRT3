import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import * as path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@store": path.resolve(__dirname, "./src/store"),
		},
	},
	plugins: [react()],
})

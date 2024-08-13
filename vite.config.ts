import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import * as path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@context": path.resolve(__dirname, "./src/context"),
			"@adapters": path.resolve(__dirname, "./src/adapters"),
			"@guards": path.resolve(__dirname, "./src/guards"),
			"@interceptors": path.resolve(__dirname, "./src/interceptors"),
			"@models": path.resolve(__dirname, "./src/models"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@services": path.resolve(__dirname, "./src/services"),
		},
	},
	plugins: [react()],
})

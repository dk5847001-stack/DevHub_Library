import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const transformJsxInJs = () => ({
    name: "transform-jsx-in-js",

    enforce: "pre",

    async transform(code, id) {
        if (!id.endsWith(".js")) {
            return null;
        }

        return await transformWithOxc(code, id, {
            lang: "jsx",
        });
    },
});

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        transformJsxInJs(),
    ],
});
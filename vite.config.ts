import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/raithan': {
                target: 'https://backend.barabaricollective.org',
                changeOrigin: true,
                secure: false, // For HTTPS
            },
        },
        hmr: {
            clientPort: 5173, // Ensure the client port matches your Vite server port
        },
    },
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
 
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    base: env.VITE_APP_MODE === 'production' ? '/mental_wellness_web/' : '/mental_wellness_web/',

  };
});
 
 
 
 
 
 
 
 
 
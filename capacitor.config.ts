import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.atlas.chefsetoiles',
  appName: 'Atlas des Chefs Étoilés',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;

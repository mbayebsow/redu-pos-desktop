import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.redupos.app',
  appName: 'redu-pos',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

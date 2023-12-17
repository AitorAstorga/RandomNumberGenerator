import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'aichan.ovh.random_number_generator',
  appName: 'Random Number Generator',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

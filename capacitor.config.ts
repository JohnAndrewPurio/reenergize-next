import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.energy.reenergize',
  appName: 'ReEnergize',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    }
  }
};

export default config;

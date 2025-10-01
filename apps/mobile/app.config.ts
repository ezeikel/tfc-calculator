import { ConfigContext, ExpoConfig } from "expo/config"
import pkg from "./package.json"

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
    name: "TFC Calculator",
    slug: "tfc-calculator",
    owner: "chewybytes",
    version: pkg.version,
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "tfccalculator",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.chewybytes.tfccalculator",
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      package: "com.chewybytes.tfccalculator",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#2C9C9D"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#2C9C9D',
      },
    ],
      "expo-font",
      "expo-dev-client",
    ],
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      "url": "https://u.expo.dev/640d884b-bd20-42a6-b5f0-a26ebe06660c",
      fallbackToCacheTimeout: 0,
      checkAutomatically: "ON_LOAD"
    },
    extra: {
      "eas": {
        "projectId": "640d884b-bd20-42a6-b5f0-a26ebe06660c"
      }
    }
});

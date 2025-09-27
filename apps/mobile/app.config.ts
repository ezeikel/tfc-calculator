import { ConfigContext, ExpoConfig } from "expo/config"
import pkg from "./package.json"

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
    name: "TFC Calculator",
    slug: "tfc-calculator",
    owner: "chewybytes",
    version: pkg.version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "tfccalculator",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      favicon: "./assets/favicon.png"
    }
});

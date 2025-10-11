export const APP_STORE_LINKS = {
  APPLE: "https://apps.apple.com/gb/app/tfc-calculator/id6753323659",
  GOOGLE: "#", // TODO: Add Google Play Store link when available
} as const;

export const APP_STORE_IMAGES = {
  APPLE: {
    LIGHT: "/app-store-light.svg",
    DARK: "/app-store-dark.svg",
  },
  GOOGLE: {
    LIGHT: "/play-store-light.svg",
    DARK: "/play-store-dark.svg",
  },
} as const;
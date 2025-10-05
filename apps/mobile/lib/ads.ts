import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

type Sided = { ios: string; android: string };

type UnitMap = {
  banners: {
    calculator: Sided;
    settings: Sided;
  };
  interstitial: Sided;
};

const UNITS: UnitMap = {
  banners: {
    calculator: {
      ios: 'ca-app-pub-7677365102925875/3013200472',
      android: 'ca-app-pub-7677365102925875/4389861325',
    },
    settings: {
      ios: 'ca-app-pub-7677365102925875/4733476252',
      android: 'ca-app-pub-7677365102925875/6824452970',
    },
  },
  interstitial: {
    ios: 'ca-app-pub-7677365102925875/3336510397',
    android: 'ca-app-pub-7677365102925875/3196909597',
  },
};

// helper
const pick = (prodId: string, testId: string) => (__DEV__ ? testId : prodId);

export const bannerUnitId = (placement: keyof UnitMap['banners']) =>
  Platform.select({
    ios: pick(UNITS.banners[placement].ios, TestIds.BANNER),
    android: pick(UNITS.banners[placement].android, TestIds.BANNER),
  }) ?? TestIds.BANNER;

export const interstitialUnitId =
  Platform.select({
    ios: pick(UNITS.interstitial.ios, TestIds.INTERSTITIAL),
    android: pick(UNITS.interstitial.android, TestIds.INTERSTITIAL),
  }) ?? TestIds.INTERSTITIAL;

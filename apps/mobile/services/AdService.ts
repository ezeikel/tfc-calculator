import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { interstitialUnitId } from '../lib/ads';
import { purchaseService } from './PurchaseService';

class AdService {
  private interstitial: InterstitialAd;
  private isLoaded = false;

  constructor() {
    this.interstitial = InterstitialAd.createForAdRequest(interstitialUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    this.setupInterstitial();
  }

  private setupInterstitial() {
    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.isLoaded = true;
    });

    this.interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Interstitial ad failed to load:', error);
      this.isLoaded = false;
    });

    this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      this.isLoaded = false;
      this.requestAd(); // Preload next ad
    });

    this.requestAd();
  }

  private requestAd() {
    try {
      this.interstitial.load();
    } catch (error) {
      console.log('Failed to request interstitial ad:', error);
    }
  }

  async showAd(): Promise<boolean> {
    const isAdFree = await purchaseService.isAdFree();
    if (isAdFree) {
      return false;
    }

    if (!this.isLoaded) {
      this.requestAd();
      return false;
    }

    try {
      this.interstitial.show();
      return true;
    } catch (error) {
      console.log('Failed to show interstitial ad:', error);
      return false;
    }
  }
}

export const adService = new AdService();
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { purchaseService } from '../services/PurchaseService';
import { bannerUnitId } from '../lib/ads';

interface AdBannerProps {
  placement: 'calculator' | 'settings';
  size?: BannerAdSize;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, size = BannerAdSize.BANNER }) => {
  const [isAdFree, setIsAdFree] = useState(false);

  useEffect(() => {
    const checkAdFreeStatus = async () => {
      const adFree = await purchaseService.isAdFree();
      setIsAdFree(adFree);
    };
    checkAdFreeStatus();
  }, []);

  if (isAdFree) {
    return null; // Don't show ads if user purchased ad removal
  }

  return (
    <View className="items-center py-2">
      <BannerAd
        unitId={bannerUnitId(placement)}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdFailedToLoad={(error) => {
          console.log('Ad failed to load:', error);
        }}
      />
    </View>
  );
};
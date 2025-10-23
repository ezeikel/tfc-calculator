import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { purchaseService } from '../services/PurchaseService';
import { bannerUnitId } from '../lib/ads';
import { logger } from '@/lib/logger';

interface AdBannerProps {
  placement: 'calculator' | 'settings';
  size?: BannerAdSize;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, size = BannerAdSize.BANNER }) => {
  const [isAdFree, setIsAdFree] = useState(false);

  useEffect(() => {
    const checkAdFreeStatus = async () => {
      const adFree = await purchaseService.isPremium();
      setIsAdFree(adFree);

      logger.debug('Banner ad status checked', {
        action: 'banner_check',
        placement,
        isAdFree: adFree,
      });
    };
    checkAdFreeStatus();
  }, [placement]);

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
          logger.error('Banner ad failed to load', {
            action: 'banner_load_error',
            placement,
          }, error instanceof Error ? error : new Error(String(error)));
        }}
      />
    </View>
  );
};
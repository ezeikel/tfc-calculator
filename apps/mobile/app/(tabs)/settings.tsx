import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalculator, faExclamationTriangle, faChevronRight, faDownload, faTrash, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { AdBanner } from '../../components/AdBanner';
import { adService } from '../../services/AdService';
import { purchaseService } from '../../services/PurchaseService';

export default function SettingsScreen() {
  const [isClearing, setIsClearing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const premium = await purchaseService.isPremium();
      setIsPremium(premium);
    };
    checkPremiumStatus();
  }, []);

  const iconMap = {
    download: faDownload,
    trash: faTrash,
    globe: faGlobe,
    calculator: faCalculator,
    'exclamation-triangle': faExclamationTriangle,
    'chevron-right': faChevronRight,
  };

  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your children and payment history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              await AsyncStorage.multiRemove(['tfc-children', 'tfc-payments']);
              // TODO: need to update update UI showing stale data from AsyncStorage
              Alert.alert('Success', 'All data has been cleared.');
            } catch {
              Alert.alert('Error', 'Failed to clear data. Please try again.');
            }
            setIsClearing(false);
          },
        },
      ]
    );
  };

  const exportData = async () => {
    // Show interstitial ad before export
    await adService.showAd();

    try {
      const children = await AsyncStorage.getItem('tfc-children');
      const payments = await AsyncStorage.getItem('tfc-payments');

      const childrenData = children ? JSON.parse(children) : [];
      const paymentsData = payments ? JSON.parse(payments) : [];

      // Create CSV content
      let csvContent = 'Type,Child Name,Date of Birth,Reconfirmation Date,Amount,Parent Paid,Government Top Up,Payment Date,Description\n';

      // Add children data
      childrenData.forEach((child: any) => {
        csvContent += `Child,"${child.name || 'Unnamed'}","${child.dateOfBirth}","${child.reconfirmationDate}",,,,,\n`;
      });

      // Add payments data
      paymentsData.forEach((payment: any) => {
        const child = childrenData.find((c: any) => c.id === payment.childId);
        const childName = child?.name || 'Unknown Child';
        const date = new Date(payment.date).toLocaleDateString();
        csvContent += `Payment,"${childName}",,,"${payment.amount}","${payment.parentPaid}","${payment.governmentTopUp}","${date}","${payment.description || ''}"\n`;
      });

      // Write to file
      const fileName = `tfc-export-${new Date().toISOString().split('T')[0]}.csv`;
      const file = new File(Paths.cache, fileName);

      await file.write(csvContent, {});

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'text/csv',
          dialogTitle: 'Export TFC Data',
        });
      } else {
        Alert.alert('Export Complete', `Data exported to: ${fileName}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export data. Please try again.');
    }
  };

  const openHMRCWebsite = () => {
    Linking.openURL('https://www.gov.uk/tax-free-childcare');
  };

  const showPaywall = async () => {
    try {
      const paywallResult = await RevenueCatUI.presentPaywall();

      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
          setIsPremium(true);
          Alert.alert('Success', 'Welcome to Premium!');
          break;
        case PAYWALL_RESULT.CANCELLED:
          console.log('User cancelled paywall');
          break;
        case PAYWALL_RESULT.NOT_PRESENTED:
          Alert.alert('Error', 'Unable to show subscription options. Please try again.');
          break;
        case PAYWALL_RESULT.ERROR:
          Alert.alert('Error', 'Something went wrong. Please try again.');
          break;
      }
    } catch (error) {
      console.log('Paywall error:', error);
      Alert.alert('Error', 'Unable to show subscription options. Please try again.');
    }
  };


  const handleRestorePurchases = async () => {
    const success = await purchaseService.restorePurchases();
    if (success) {
      setIsPremium(true);
      Alert.alert('Success', 'Your subscription has been restored!');
    } else {
      Alert.alert('No Purchases', 'No previous subscriptions found to restore.');
    }
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    textColor = 'text-gray-900',
    loading = false
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    textColor?: string;
    loading?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-center"
    >
      <View className="bg-gray-100 rounded-lg p-2 mr-4">
        <FontAwesomeIcon icon={iconMap[icon as keyof typeof iconMap]} size={20} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text className={`font-semibold ${textColor} ${loading ? 'opacity-50' : ''}`}
          style={{ fontFamily: 'PublicSans_600SemiBold' }}>
          {title}
        </Text>
        {subtitle && (
          <Text className={`text-sm text-gray-600 mt-1 ${loading ? 'opacity-50' : ''}`}
            style={{ fontFamily: 'PublicSans_400Regular' }}>
            {subtitle}
          </Text>
        )}
      </View>
      <FontAwesomeIcon icon={faChevronRight} size={16} color="#d1d5db" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <AdBanner placement="settings" />
          <View className="bg-white rounded-xl p-6 mb-6 items-center shadow-sm border border-gray-100">
            <View className="bg-blue-100 rounded-full p-4 mb-4">
              <FontAwesomeIcon icon={faCalculator} size={32} color="#3b82f6" />
            </View>
            <Text className="text-xl font-bold text-center mb-2" style={{ fontFamily: 'PublicSans_700Bold' }}>
              TFC Calculator
            </Text>
            <Text className="text-sm text-gray-600 text-center" style={{ fontFamily: 'PublicSans_400Regular' }}>
              Calculate government contributions for your childcare costs
            </Text>
          </View>

          {!isPremium && (
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-4 px-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                Premium
              </Text>

              <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
                <Text className="text-lg font-semibold mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  TFC Calculator Premium
                </Text>
                <Text className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'PublicSans_400Regular' }}>
                  Auto-renewable subscription with enhanced features
                </Text>

                <View className="mb-3">
                  <Text className="text-sm font-medium mb-1" style={{ fontFamily: 'PublicSans_500Medium' }}>
                    Available Subscriptions:
                  </Text>
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    • Monthly subscription (1 month duration)
                  </Text>
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    • Yearly subscription (12 months duration) - Best Value!
                  </Text>
                  <Text className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    Pricing shown in your local currency during purchase
                  </Text>
                </View>

                <View className="mb-3">
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.
                  </Text>
                </View>
              </View>

              <SettingItem
                icon="calculator"
                title="Subscribe to Premium"
                subtitle="Unlock premium features and remove ads"
                textColor="text-green-600"
                onPress={showPaywall}
              />

              <SettingItem
                icon="download"
                title="Restore Subscription"
                subtitle="Restore your previous subscription"
                onPress={handleRestorePurchases}
              />
            </View>
          )}

          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 px-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Data Management
            </Text>

            <SettingItem
              icon="download"
              title="Export Data"
              subtitle="Save your data to share or backup"
              onPress={exportData}
            />

            <SettingItem
              icon="trash"
              title="Clear All Data"
              subtitle="Remove all children and payment history"
              textColor="text-red-600"
              onPress={clearAllData}
              loading={isClearing}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 px-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Information
            </Text>

            <SettingItem
              icon="globe"
              title="Official HMRC Information"
              subtitle="Visit gov.uk for official Tax-Free Childcare information"
              onPress={openHMRCWebsite}
            />
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold mb-4 px-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Legal
            </Text>

            <SettingItem
              icon="globe"
              title="Terms of Use"
              subtitle="Read our Terms of Use and End User License Agreement"
              onPress={() => Linking.openURL('https://tfccalculator.co.uk/terms')}
            />

            <SettingItem
              icon="globe"
              title="Privacy Policy"
              subtitle="Read our Privacy Policy"
              onPress={() => Linking.openURL('https://tfccalculator.co.uk/privacy')}
            />
          </View>

          <View className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <View className="flex-row items-start">
              <FontAwesomeIcon icon={faExclamationTriangle} size={16} color="#f59e0b" />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-medium text-amber-800" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  Important Disclaimer
                </Text>
                <Text className="text-sm text-amber-700 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                  This calculator is for guidance only. Always check with HMRC for official information about Tax-Free Childcare.
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-8 items-center">
            <Text className="text-xs text-gray-500" style={{ fontFamily: 'PublicSans_400Regular' }}>
              Version {Application.nativeApplicationVersion}
            </Text>
            <Text className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
              Build {Application.nativeBuildVersion}
            </Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-xs text-gray-400" style={{ fontFamily: 'PublicSans_400Regular' }}>
                Made with{' '}
              </Text>
              <FontAwesomeIcon icon={faHeart} size={12} color="#ef4444" />
              <Text className="text-xs text-gray-400" style={{ fontFamily: 'PublicSans_400Regular' }}>
                {' '}in{' '}
              </Text>
              <Text className="text-xs text-gray-600 font-medium" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                South London
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
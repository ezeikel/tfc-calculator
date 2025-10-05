import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';

const REMOVE_ADS_ENTITLEMENT = 'ad_free';
const REMOVE_ADS_PRODUCT_ID = 'remove_ads';

class PurchaseService {
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      const apiKey = Platform.OS === 'ios'
        ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
        : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

      if (!apiKey) {
        console.error('RevenueCat API key not found. Please set EXPO_PUBLIC_REVENUECAT_IOS_KEY or EXPO_PUBLIC_REVENUECAT_ANDROID_KEY');
        return;
      }

      await Purchases.configure({ apiKey });
      this.isInitialized = true;

      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.log('Failed to initialize RevenueCat:', error);
    }
  }

  async isAdFree(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo.entitlements.active[REMOVE_ADS_ENTITLEMENT] !== undefined;
    } catch (error) {
      console.log('Failed to check ad-free status:', error);
      return false;
    }
  }

  async getOfferings(): Promise<PurchasesOffering | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const offerings = await Purchases.getOfferings();
      return offerings.current;
    } catch (error) {
      console.log('Failed to get offerings:', error);
      return null;
    }
  }

  async purchaseAdRemoval(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const offerings = await this.getOfferings();
      const adRemovalPackage = offerings?.availablePackages.find(
        pkg => pkg.product.identifier === REMOVE_ADS_PRODUCT_ID
      );

      if (!adRemovalPackage) {
        console.log('Ad removal package not found');
        return false;
      }

      const { customerInfo } = await Purchases.purchasePackage(adRemovalPackage);
      const hasAdFree = customerInfo.entitlements.active[REMOVE_ADS_ENTITLEMENT] !== undefined;

      return hasAdFree;
    } catch (error) {
      console.log('Purchase failed:', error);
      return false;
    }
  }

  async restorePurchases(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.restorePurchases();
      const hasAdFree = customerInfo.entitlements.active[REMOVE_ADS_ENTITLEMENT] !== undefined;

      return hasAdFree;
    } catch (error) {
      console.log('Failed to restore purchases:', error);
      return false;
    }
  }

  async getCustomerInfo(): Promise<CustomerInfo | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      return await Purchases.getCustomerInfo();
    } catch (error) {
      console.log('Failed to get customer info:', error);
      return null;
    }
  }
}

export const purchaseService = new PurchaseService();
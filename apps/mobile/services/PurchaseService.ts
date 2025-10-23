import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';
import { logger } from '@/lib/logger';

const PREMIUM_ENTITLEMENT = 'premium';

class PurchaseService {
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      const apiKey = Platform.OS === 'ios'
        ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
        : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

      if (!apiKey) {
        logger.error('RevenueCat API key not found', {
          action: 'purchase_init',
          platform: Platform.OS,
        });
        return;
      }

      await Purchases.configure({ apiKey });
      this.isInitialized = true;

      logger.info('RevenueCat initialized successfully', {
        action: 'purchase_init',
        platform: Platform.OS,
      });
    } catch (error) {
      logger.purchaseError('Failed to initialize RevenueCat', error instanceof Error ? error : new Error(String(error)), {
        action: 'purchase_init',
        platform: Platform.OS,
      });
    }
  }

  async isPremium(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.getCustomerInfo();
      const isPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;

      logger.debug('Premium status checked', {
        action: 'check_premium',
        isPremium,
      });

      return isPremium;
    } catch (error) {
      logger.purchaseError('Failed to check premium status', error instanceof Error ? error : new Error(String(error)), {
        action: 'check_premium',
      });
      return false;
    }
  }

  async getOfferings(): Promise<PurchasesOffering | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const offerings = await Purchases.getOfferings();

      logger.debug('Offerings retrieved', {
        action: 'get_offerings',
        hasOfferings: !!offerings.current,
        packageCount: offerings.current?.availablePackages.length || 0,
      });

      return offerings.current;
    } catch (error) {
      logger.purchaseError('Failed to get offerings', error instanceof Error ? error : new Error(String(error)), {
        action: 'get_offerings',
      });
      return null;
    }
  }

  async purchasePackage(packageIdentifier: string): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const offerings = await this.getOfferings();
      const packageToPurchase = offerings?.availablePackages.find(
        pkg => pkg.identifier === packageIdentifier
      );

      if (!packageToPurchase) {
        logger.warn('Package not found', {
          action: 'purchase_package',
          packageIdentifier,
        });
        return false;
      }

      logger.info('Initiating purchase', {
        action: 'purchase_package',
        packageIdentifier,
      });

      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      const hasPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;

      logger.info('Purchase completed', {
        action: 'purchase_package',
        packageIdentifier,
        hasPremium,
      });

      return hasPremium;
    } catch (error) {
      logger.purchaseError('Purchase failed', error instanceof Error ? error : new Error(String(error)), {
        action: 'purchase_package',
        packageIdentifier,
      });
      return false;
    }
  }

  async purchaseMonthly(): Promise<boolean> {
    return this.purchasePackage('monthly');
  }

  async purchaseYearly(): Promise<boolean> {
    return this.purchasePackage('yearly');
  }

  async restorePurchases(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      logger.info('Restoring purchases', {
        action: 'restore_purchases',
      });

      const customerInfo = await Purchases.restorePurchases();
      const hasPremium = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT] !== undefined;

      logger.info('Purchases restored', {
        action: 'restore_purchases',
        hasPremium,
      });

      return hasPremium;
    } catch (error) {
      logger.purchaseError('Failed to restore purchases', error instanceof Error ? error : new Error(String(error)), {
        action: 'restore_purchases',
      });
      return false;
    }
  }

  async getCustomerInfo(): Promise<CustomerInfo | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.getCustomerInfo();

      logger.debug('Customer info retrieved', {
        action: 'get_customer_info',
      });

      return customerInfo;
    } catch (error) {
      logger.purchaseError('Failed to get customer info', error instanceof Error ? error : new Error(String(error)), {
        action: 'get_customer_info',
      });
      return null;
    }
  }
}

export const purchaseService = new PurchaseService();
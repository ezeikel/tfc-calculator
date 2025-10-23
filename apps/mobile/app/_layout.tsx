import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import Constants, { ExecutionEnvironment } from "expo-constants";
import '@/global.css';
import {
  PublicSans_400Regular,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
} from '@expo-google-fonts/public-sans';
import * as SplashScreen from 'expo-splash-screen';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { purchaseService } from '../services/PurchaseService';
import * as Sentry from '@sentry/react-native';
import Providers from '@/providers';
import { usePostHog } from 'posthog-react-native';
import { setLoggerPostHog } from '@/lib/logger';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.EXPO_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
  enableNativeFramesTracking: Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      // Track screen views for analytics
      posthog.screen(pathname, params);

      // Initialize logger with PostHog for error tracking
      setLoggerPostHog(posthog);
    }
  }, [pathname, params, posthog]);

  const [loaded, error] = useFonts({
    PublicSans_400Regular,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    // Initialize RevenueCat when app starts
    purchaseService.initialize();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Providers>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

export default Sentry.wrap(RootLayout);
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="serviceProvider/serviceProviderPage" options={{ headerShown: false }} />
          <Stack.Screen name="serviceProvider/serviceProviderBrowse" options={{ headerShown: false }} />
          <Stack.Screen name="serviceProvider/schedule_page" options={{ headerShown: false }} />
          <Stack.Screen name="issue/description" options={{ headerShown: false }} />
          <Stack.Screen name="issue/describeissue" options={{ headerShown: false }} />
          <Stack.Screen name="order/trackOrder" options={{ headerShown: false }} />
          <Stack.Screen name="order/payment" options={{ headerShown: false }} />
          <Stack.Screen name="review/reviewOrder" options={{ headerShown: false }} />
          <Stack.Screen name="review/leaveReview" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
import React, { useEffect, useCallback } from 'react';
import RootNavigation from "./src/navigations/RootNavigation";
import { MenuProvider } from "react-native-popup-menu";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    async function loadFonts() {
      try {
        await Font.loadAsync({
          'cretype-caros': require('./assets/fonts/cretype  Caros.otf'),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <BottomSheetModalProvider>
        <MenuProvider>
          <RootNavigation />
        </MenuProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
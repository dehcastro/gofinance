import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

import { AuthProvider } from "./src/context/auth";
import { Routes } from "./src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) await SplashScreen.hideAsync();
  }, [isAppReady]);

  if (!isAppReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

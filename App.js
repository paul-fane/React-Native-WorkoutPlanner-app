import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import store from "./store/index";
import { Provider } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";
import SplashScreen from "./screens/Utility/SplashScreen";

export default function App() {
  // Load fonts
  const [isLoadingFonts, setIsLoadingFonts] = useState(true);
  const [fontsLoaded] = useFonts({
    rubik: require("./assets/fonts/Rubik.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });

  const showSplashScreen = async () => {
    // testing purposes
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      // custom logic
      // await sleep(2000);
      await sleep(200);
      // const token = null;
      // setUserToken(token);
    } finally {
      setIsLoadingFonts(false);
    }
  };

  useEffect(() => {
    // Initial screen
    showSplashScreen();
  }, []);

  if (isLoadingFonts) {
    return <SplashScreen />;
  }

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

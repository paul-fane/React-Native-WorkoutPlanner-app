import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = () => {
  return (
    <LinearGradient colors={["#ffc929", "#ff7a29"]} style={styles.gradient}>
      <View style={styles.screen}>
        <Text>PlanForWorkout</Text>
        <ActivityIndicator size="large" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const ExercisesStack = createNativeStackNavigator();

const ExercisesStackScreen = () => {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen />
    </ExercisesStack.Navigator>
  );
};

export default ExercisesStackScreen;

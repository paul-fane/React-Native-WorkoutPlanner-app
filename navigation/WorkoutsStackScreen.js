import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Colors from "../constants/Colors";

import WorkoutsOverviewScreen from "../screens/workouts/WorkoutsOverviewScreen";
import WorkoutDetailScreen from "../screens/workouts/WorkoutDetailScreen";
import AddWorkoutScreen from "../screens/workouts/AddWorkoutScreen";
import EditWorkoutScreen from "../screens/workouts/EditWorkoutScreen";
import AddExerciseScreen from "../screens/workouts/AddExerciseScreen";
import ReorderRoutines from "../screens/workouts/ReorderRoutines";
import EditExerciseScreen from "../screens/workouts/EditExerciseScreen";
import ReorderExercises from "../screens/workouts/ReorderExercises";

const WorkoutsStack = createNativeStackNavigator();

const WorkoutsStackScreen = () => {
  return (
    <WorkoutsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fcfde9",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "rubik",
        },
      }}
    >
      <WorkoutsStack.Screen
        name="My Workouts"
        component={WorkoutsOverviewScreen}
        options={{
          title: "My Workouts",
        }}
      />
      <WorkoutsStack.Screen
        name="Add Workout"
        component={AddWorkoutScreen}
        options={{
          title: "Add a new Workout!",
        }}
      />
      <WorkoutsStack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={({ route }) => ({ title: route.params.nameTitle })}
      />
      <WorkoutsStack.Screen
        name="Edit Workout"
        component={EditWorkoutScreen}
        options={{
          title: "Edit Workout",
        }}
      />
      <WorkoutsStack.Screen
        name="Add Exercise"
        component={AddExerciseScreen}
        options={{
          title: "Add Exercise",
        }}
      />
      <WorkoutsStack.Screen
        name="Reorder Routines"
        component={ReorderRoutines}
        options={{
          title: "Reorder Routines",
        }}
      />
      <WorkoutsStack.Screen
        name="Edit Exercise"
        component={EditExerciseScreen}
        options={{
          title: "Edit Exercise",
        }}      />
      <WorkoutsStack.Screen
        name="Reorder Exercises"
        component={ReorderExercises}
        options={({ route }) => ({ title: route.params.nameTitle })}
      />
    </WorkoutsStack.Navigator>
  );
};

export default WorkoutsStackScreen;

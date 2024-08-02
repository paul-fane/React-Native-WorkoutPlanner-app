import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadWorkouts } from "../../store/actions/workouts-actions"


import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

import WorkoutItem from "../../components/workouts/WorkoutItem";

const WorkoutsOverviewScreen = ({ navigation, props }) => {
  const dispatch = useDispatch()
  const workouts = useSelector((state) => state.workouts.myWorkoutsList);
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [isLoading, setLoading] = useState(true);

  
  useEffect(() => {
    // Load the workouts on the first render of the page
    dispatch(loadWorkouts(authTokens))
    setLoading(false);
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.orangeButton} />
        </View>
      ) : (
        <View style={{flex:1}}>
          {workouts.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No workouts found. Maybe start adding some!</Text>
            </View>
          ) : (
            <FlatList
              data={workouts}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={(itemData) => (
                <WorkoutItem
                  navigation={navigation}
                  workout={itemData.item}
                  onViewDetail={() => {
                    navigation.navigate("WorkoutDetail", {
                      nameTitle: itemData.item.name,
                      id: itemData.item.id,
                      slug: itemData.item.slug
                    });
                  }}
                />
              )}
            />
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate("Add Workout");
            }}
          >
            <Ionicons name="add-circle" size={80} color="#eda15e" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
  parent: {
    position: "relative",
  },
});

export default WorkoutsOverviewScreen;

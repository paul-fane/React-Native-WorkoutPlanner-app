import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import Tag from "../UI/Tag";
import DefaultText from "../UI/DefaultText";
import Colors from "../../constants/Colors";
import WorkoutBottomSheet from "./WorkoutBottomSheet";
import DeleteModal from "../UI/DeleteModal";

import { useSelector, useDispatch } from "react-redux";
import { deleteWorkoutPlan } from "../../store/actions/workouts-actions";

import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';


import { EvilIcons } from '@expo/vector-icons';

const WorkoutItem = ({ navigation, workout, ...props }) => {
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isDeletWorkoutModalVisible, setDeletWorkoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        { text: "Okay", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const closeDeleteWorkoutModal = () => {
    setDeletWorkoutModal(false);
  };

  const deleteWorkout = () => {
    setBottomSheetVisible(false);
    setDeletWorkoutModal(true);
  };

  const confirmDeleteWorkout = () => {
    setDeletWorkoutModal(false);
    setError(null);
    setIsLoading(true);
    try {
      dispatch(deleteWorkoutPlan(authTokens, workout.slug));
    } catch (error) {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  const editWorkout = () => {
    setBottomSheetVisible(false);
    navigation.push("Edit Workout", {
      nameTitle: workout.name,
      slug: workout.slug,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formatDate = (date) => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)

    const formatted = day + "-" + month + "-" + year;
    return formatted
  }
  return (
    <View style={styles.workout}>
      <TouchableOpacity onPress={props.onViewDetail}>
        {workout.level && (
          <View style={styles.tags}>
            <Tag level={workout.level}>{workout.level}</Tag>
          </View>
        )}

        <View style={styles.titleContainer}>
          <DefaultText style={styles.workoutTitle}>{workout.name}</DefaultText>
          <Text style={{ fontSize: 12, color: "#6f6f6f" }}>
            Created at:{" "}
            {formatDate(workout.created_at)}
            {/* {new Date(workout.created_at).toISOString().slice(0, 10)} */}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.rowDirection}>
            <EvilIcons style={styles.icon} name="refresh" size={34} color={Colors.orangeButton} />
            {/* <FontAwesome6
              style={styles.icon}
              name="arrows-rotate"
              size={24}
              color={Colors.orangeButton}
            /> */}
            <Text style={[styles.detailsText,{ fontFamily: "rubik-bold" }]}>
              {workout.num_routines}{" "}
            </Text>
            <DefaultText style={styles.detailsText}>routines</DefaultText>
          </View>

          {workout.start_date != null &&
            workout.end_date != null &&
            workout.start_date < workout.end_date && (
              <View style={styles.rowDirection}>
                <EvilIcons style={styles.icon} name="calendar" size={34} color={Colors.orangeButton} />
                {/* <Fontisto style={styles.icon} name="date" size={24} color={Colors.orangeButton}/> */}
                <DefaultText style={styles.detailsText}>Period: </DefaultText>
                <Tag level={workout.isRecurring}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.detailsText,{ fontFamily: "rubik-bold" }]}>
                      {/* {workout.start_date} */}
                      {formatDate(workout.start_date)}
                    </Text>
                    <DefaultText style={styles.detailsText}> TO </DefaultText>
                    <Text style={[styles.detailsText,{ fontFamily: "rubik-bold" }]}>
                      {/* {workout.end_date} */}
                      {formatDate(workout.end_date)}
                    </Text>
                  </View>
                </Tag>
              </View>
            )}

          {workout.description && (
            <View style={styles.rowDirection}>
              <EvilIcons style={[styles.icon, {alignSelf: "flex-start"}]} name="pencil" size={34} color={Colors.orangeButton} />
              {/* <FontAwesome6
                style={styles.icon}
                name="file-text"
                size={24}
                color={Colors.orangeButton}
              /> */}
              <DefaultText style={styles.detailsText}>Description: {workout.description}</DefaultText>
            </View>
          )}

          {workout.goal && (
            <View style={styles.rowDirection}>
              <EvilIcons style={styles.icon} name="trophy" size={34} color={Colors.orangeButton} />
              {/* <Feather
                style={styles.icon}
                name="target"
                size={24}
                color={Colors.orangeButton}
              /> */}
              <DefaultText style={styles.detailsText}>Goal: {workout.goal}</DefaultText>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={toggleBottomSheet}>
        <Entypo name="dots-three-vertical" size={18} color="black" />
      </TouchableOpacity>

      <WorkoutBottomSheet
        title={workout.name}
        editWorkout={editWorkout}
        deleteWorkout={deleteWorkout}
        toggleBottomSheet={toggleBottomSheet}
        isBottomSheetVisible={isBottomSheetVisible}
      />
      <DeleteModal
        title={`Delete "${workout.name}"!`}
        confirmDelete={confirmDeleteWorkout}
        closeModal={closeDeleteWorkoutModal}
        isOpen={isDeletWorkoutModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  workout: {
    padding: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    // height: 300,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  tags: {
    flexDirection: "row",
    // marginBottom: 1.2,
    gap: 0.5,
    // marginBottom: 5,
  },
  titleContainer: {
    marginBottom: 6,
  },
  workoutTitle: {
    fontSize: 24,
    color: "#333",
    fontWeight: "700",
  },
  // detailsContainer: {
  //   marginLeft: 10,
  //   marginRight: 10,
  // },
  rowDirection: {
    flexDirection: "row",
    marginRight: 10,
    marginBottom: 4,
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
    paddingBottom: 8
  },
  optionButton: {
    position: "absolute",
    padding: 5,
    top: 10,
    right: 10,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsText: {
    color: "#555",
  }
});

export default WorkoutItem;

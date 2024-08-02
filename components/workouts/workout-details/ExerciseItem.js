import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { deleteExercise } from "../../../store/actions/exercises-actions";
import DeleteModal from "../../UI/DeleteModal";
import ExerciseBottomSheet from "./exercisesActions/ExerciseBottomSheet";
import SetItem from "./SetItem";
import Tag from "../../UI/Tag";
import DefaultText from "../../UI/DefaultText";
import Colors from "../../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExerciseItem = ({ exercise, navigation }) => {
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isDeletExerciseModalVisible, setDeletExerciseModal] = useState(false);
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

  const openDeleteExerciseModal = () => {
    setBottomSheetVisible(false);
    setDeletExerciseModal(true);
  };

  const confirmDeleteExercise = () => {
    setDeletExerciseModal(false);
    setError(null);
    setIsLoading(true);
    try {
      dispatch(deleteExercise(authTokens, exercise.id));
    } catch (error) {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  const editExercise = () => {
    setBottomSheetVisible(false);
    navigation.navigate("Edit Exercise", {
      nameTitle: exercise.name,
      id: exercise.id,
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.orangeButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.tags}>
            {exercise.muscle && <Tag level="medium">{exercise.muscle}</Tag>}
            {exercise.warm_up === true && <Tag level="hard">Warm Up</Tag>}
          </View>

          <View style={styles.titleContainer}>
            <DefaultText style={styles.exerciseName}>
              {exercise.name}
            </DefaultText>
          </View>
        </View>

        <LinearGradient colors={["white", "#fdf2e9"]} style={styles.item}>
          <FlatList
            data={exercise.sets}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={(itemData) => (
              <SetItem set={itemData.item} type={exercise.type} />
            )}
          />
        </LinearGradient>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={toggleBottomSheet}
        >
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
        <ExerciseBottomSheet
          title={exercise.name}
          editExercise={editExercise}
          deleteExercise={openDeleteExerciseModal}
          toggleBottomSheet={toggleBottomSheet}
          isBottomSheetVisible={isBottomSheetVisible}
        />
        <DeleteModal
          title={`Delete "${exercise.name}" Exercise!`}
          confirmDelete={confirmDeleteExercise}
          closeModal={() => {
            setDeletExerciseModal(false);
          }}
          isOpen={isDeletExerciseModalVisible}
        />
      </View>

      {exercise.rest_time && (
        <View style={[styles.rowDirection, styles.restTime]}>
          <MaterialCommunityIcons
            name="timer-outline"
            size={16}
            color={Colors.sandyBrown}
          />
          <Text style={{ color: "#6f6f6f" }}>
            Rest time between exercises: {exercise.rest_time.slice(3, 8)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 7,
    // borderBottomWidth: 15,
    // borderBottomColor: Colors.platinum,
    // paddingBottom: 15,
  },
  header: {
    marginTop: 10,
    marginRight: 25,
    marginLeft: 10,
  },
  item: {
    borderRadius: 8,
    alignSelf: "center",
    width: "100%",
    // // borderColor: "#eda15e",
    // borderColor: Colors.cinereous,
    // backgroundColor: Colors.badgeBackground
    backgroundColor: "#fdf2e9",
    padding: 10,
    paddingTop: 2,
  },
  tags: {
    flexDirection: "row",
    gap: 0.5,
  },
  title: {
    fontSize: 32,
  },
  optionButton: {
    position: "absolute",
    padding: 5,
    top: 10,
    right: 10,
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 5,
  },
  card: {
    margin: 15,
    marginBottom: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.tabBarBackground,
  },
  exerciseName: {
    color: "#333",
    fontWeight: "700",
    fontSize: 18,
  },
  restTime: {
    // paddingBottom: 5,
    // position: "absolute",
    // bottom: -18

  },
});

export default ExerciseItem;

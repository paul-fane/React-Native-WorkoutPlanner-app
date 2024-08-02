import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Colors from "../../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { selectExercisesByRoutineId } from "../../store/selectors";
import { reorderExercises } from "../../store/actions/exercises-actions";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReorderExercises = ({ route, navigation, props }) => {
  const { id } = route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // Selectors
  const authTokens = useSelector((state) => state.auth.authTokens);
  //   const workout = useSelector((state) => selectWorkoutBySlug(state, slug));
  const exercises = useSelector((state) =>
    selectExercisesByRoutineId(state, id)
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(exercises);
  }, [exercises]);

  let saveExercises = async () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(reorderExercises(authTokens, data, id));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        { text: "Okay", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={drag}
          disabled={isActive}
          style={[
            styles.card,
            { backgroundColor: isActive ? Colors.tabBarColor : "white" },
          ]}
        >
          <View style={{ marginRight: 40 }}>
            {item.muscle && (
              <View style={styles.rowDirection}>
                <Text style={styles.exerciseMuscle}>
                  {item.muscle.toUpperCase()}
                </Text>
              </View>
            )}

            <Text style={styles.exerciseName}>{item.name}</Text>
          </View>
          <MaterialCommunityIcons
            style={styles.reorderButton}
            name="reorder-horizontal"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <DraggableFlatList
              data={data}
              onDragEnd={({ data }) => setData(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              animationConfig={{
                damping: 10, // Adjust damping for faster settling (lower values make it faster)
                stiffness: 120, // Adjust stiffness for a more responsive initial movement
                mass: 0.9, // Adjust mass for a slightly lighter feel
                restDisplacementThreshold: 100,
              }}
            />
          </GestureHandlerRootView>
          <Button title="Done" onPress={saveExercises} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    // backgroundColor: "#e9c46a",
    // backgroundColor: "#f4a261",
    // backgroundColor: "#eda15e",
    // backgroundColor: "#fdf2e9",
    margin: 5,
    padding: 10,
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.tabBarColor,
  },
  exerciseMuscle: {
    fontSize: 16,
    marginRight: 8,
    color: "#cf711f",
    fontWeight: "700",
  },
  exerciseName: {
    color: "#333",
    fontWeight: "700",
    fontSize: 18,
  },
  reorderButton: {
    position: "absolute",
    bottom: "50%",
    right: 15,
  },
});

export default ReorderExercises;

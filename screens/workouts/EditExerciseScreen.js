import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import TimePicker from "../../components/UI/TimePicker";
import { editExercise } from "../../store/actions/exercises-actions";
// For nanoid
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import SelectExerciseModal from "../../components/workouts/workout-details/SelectExerciseModal";
import Ionicons from "@expo/vector-icons/Ionicons";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditExerciseScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formValidity, setFormValidity] = useState(true);

  const [showSelectExerciseModal, setShowSelectExerciseModal] = useState(false);

  const currentExercise = useSelector((state) =>
    state.exercises.exercisesList.find((exercise) => exercise.id === id)
  );
  let [exercise, setExercise] = useState({});
  let [sets, setSets] = useState([]);

  // Set the current exercise and the current sets to edit
  useEffect(() => {
    setExercise({
      order: currentExercise.order,
      exercise_id: currentExercise.exercise_id,
      type: currentExercise.type,
      warm_up: currentExercise.warm_up,
      name: currentExercise.name,
      muscle: currentExercise.muscle ? currentExercise.muscle : "",
      routine: currentExercise.routine,
      description: currentExercise.notes ? currentExercise.notes : "",
      rest_time: currentExercise.rest_time
        ? currentExercise.rest_time.slice(3, 8)
        : "",
    });

    let updateList = currentExercise.sets.map((set) => {
      return {
        id: set.id,
        name: set.name ? set.name : "",
        sets: set.sets ? set.sets : "",
        reps: set.reps ? set.reps : "",
        weight: set.weight ? set.weight : "",
        time: set.time ? set.time.slice(3, 8) : "",
        distance: set.distance ? set.distance : "",
        rest_time: set.rest_time ? set.rest_time.slice(3, 8) : "",
      };
    });
    setSets(updateList);
  }, [currentExercise]);

  useEffect(() => {
    if (exercise.name?.trim().length === 0) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
  }, [exercise]);

  const toggleSelectExerciseModal = () => {
    setShowSelectExerciseModal(!showSelectExerciseModal);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        { text: "Okay", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  let handleSubmit = () => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(editExercise(authTokens, id, exercise, sets));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return;
    }
    // Set an empty modal for the next exercise
    setExercise({});
    setSets([]);
    setIsLoading(false);
    navigation.goBack();
  };

  // Add a new empty set in the exercise
  let generateNewSet = () => {
    setSets((prevData) => [
      ...prevData,
      {
        id: nanoid(),
        //"exercise": exercise.name,
        name: "",
        sets: "",
        reps: "",
        weight: "",
        time: "",
        distance: "",
        rest_time: "",
      },
    ]);
  };

  // Delete set if there are more than one
  let deleteSet = (id) => {
    if (sets.length > 1) {
      // Target the set to delete
      setSets((oldSets) => oldSets.filter((set) => set.id !== id));
    }
  };

  // For any input from the user, set the state
  let handleChangeExercise = (name, value) => {
    setExercise((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  // For any input from the user, set the state
  let handleChangeSets = (name, value, id) => {
    let updateList = sets.map((set) => {
      // Target the correct input
      if (set.id === id) {
        return {
          ...set,
          [name]: value,
        };
      } else {
        return set;
      }
    });
    setSets(updateList);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {isLoading ? (
        <View style={styles.screenLoading}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.cardContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={toggleSelectExerciseModal}
            >
              <Text style={styles.addButtonText}>
                Select Exercise From Catalog
              </Text>
            </TouchableOpacity>

            <SelectExerciseModal
              setExercise={setExercise}
              toggleSelectExerciseModal={toggleSelectExerciseModal}
              isSelectExerciseModalVisible={showSelectExerciseModal}
            />

            <View
              style={{
                marginVertical: 15,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text style={styles.orangeText}>SELECT YOUR EXERCISE TYPE:</Text>

            <View
              style={[styles.rowDirection, { justifyContent: "space-between" }]}
            >
              <TouchableOpacity
                style={
                  exercise.type === "weights/bodyweight"
                    ? styles.typeContainerActive
                    : styles.typeContainer
                }
                onPress={() =>
                  handleChangeExercise("type", "weights/bodyweight")
                }
              >
                <View>
                  <Text
                    style={
                      exercise.type === "weights/bodyweight"
                        ? styles.textSelected
                        : styles.textNotSelected
                    }
                  >
                    Weight/bodyweight
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  exercise.type === "time/distance"
                    ? styles.typeContainerActive
                    : styles.typeContainer
                }
                onPress={() => handleChangeExercise("type", "time/distance")}
              >
                <View>
                  <Text
                    style={
                      exercise.type === "time/distance"
                        ? styles.textSelected
                        : styles.textNotSelected
                    }
                  >
                    Time/Distance
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  exercise.type === "cycle"
                    ? styles.typeContainerActive
                    : styles.typeContainer
                }
                onPress={() => handleChangeExercise("type", "cycle")}
              >
                <View>
                  <Text
                    style={
                      exercise.type === "cycle"
                        ? styles.textSelected
                        : styles.textNotSelected
                    }
                  >
                    Cycle
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.rowDirection}>
              <Text style={[styles.label, { marginRight: 6 }]}>Warm up:</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={exercise.warm_up ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) =>
                  handleChangeExercise("warm_up", value)
                }
                value={exercise.warm_up}
              />
            </View>

            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleChangeExercise("name", text)}
              value={exercise.name}
              returnKeyType="next"
            />
            {formValidity === false && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  The "Name" field is required!
                </Text>
              </View>
            )}

            <Text style={styles.label}>Muscle:</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleChangeExercise("muscle", text)}
              value={exercise.muscle}
              returnKeyType="next"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={3}
              keyboardType="default"
              onChangeText={(text) => handleChangeExercise("description", text)}
              value={exercise.description}
              returnKeyType="next"
            />

            <View
              style={{
                marginVertical: 20,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text style={styles.orangeText}>LIST OF SETS:</Text>

            {exercise.type === "weights/bodyweight" &&
              sets.map((set) => (
                <View style={styles.setContainer} key={set.id}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.rowDirection}>
                      <Text style={styles.label}>Sets:</Text>
                      <TextInput
                        style={styles.setInput}
                        keyboardType="number-pad"
                        value={set.sets.toString()}
                        onChangeText={(text) =>
                          handleChangeSets("sets", text, set.id)
                        }
                        returnKeyType="next"
                      />
                    </View>
                    <View style={styles.rowDirection}>
                      <Text style={styles.label}>Reps:</Text>
                      <TextInput
                        style={styles.setInput}
                        keyboardType="number-pad"
                        value={set.reps.toString()}
                        onChangeText={(text) =>
                          handleChangeSets("reps", text, set.id)
                        }
                        returnKeyType="next"
                      />
                    </View>
                    <View style={styles.rowDirection}>
                      <Text style={styles.label}>Weight:</Text>
                      <TextInput
                        style={styles.setInput}
                        keyboardType="number-pad"
                        value={set.weight.toString()}
                        onChangeText={(text) =>
                          handleChangeSets("weight", text, set.id)
                        }
                        returnKeyType="next"
                      />
                    </View>
                  </View>

                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Rest time between sets:</Text>
                    <TimePicker
                      name="rest_time"
                      value={set.rest_time}
                      id={set.id}
                      clearTime={handleChangeSets}
                      // setNewTime={handleTimeConfirm}
                      setNewTime={handleChangeSets}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.deletSetButton}
                    onPress={() => deleteSet(set.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            {exercise.type === "time/distance" &&
              sets.map((set) => (
                <View
                  style={[styles.rowDirection, styles.setContainer]}
                  key={set.id}
                >
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Reps:</Text>
                    <TextInput
                      style={styles.setInput}
                      keyboardType="number-pad"
                      value={set.reps.toString()}
                      onChangeText={(text) =>
                        handleChangeSets("reps", text, set.id)
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Time:</Text>
                    <TimePicker
                      name="time"
                      value={set.time}
                      id={set.id}
                      clearTime={handleChangeSets}
                      setNewTime={handleChangeSets}
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Distance:</Text>
                    <TextInput
                      style={styles.setInput}
                      keyboardType="number-pad"
                      value={set.distance.toString()}
                      onChangeText={(text) =>
                        handleChangeSets("distance", text, set.id)
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Rest time between reps:</Text>
                    <TimePicker
                      name="rest_time"
                      value={set.rest_time}
                      id={set.id}
                      clearTime={handleChangeSets}
                      setNewTime={handleChangeSets}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.deletSetButton}
                    onPress={() => deleteSet(set.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ))}

            {exercise.type === "cycle" &&
              sets.map((set) => (
                <View
                  style={[styles.rowDirection, styles.setContainer]}
                  key={set.id}
                >
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Exercise Name:</Text>
                    <TextInput
                      style={styles.inputExercise}
                      keyboardType="default"
                      value={set.name}
                      onChangeText={(text) =>
                        handleChangeSets("name", text, set.id)
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Reps:</Text>
                    <TextInput
                      style={styles.setInput}
                      keyboardType="number-pad"
                      value={set.reps.toString()}
                      onChangeText={(text) =>
                        handleChangeSets("reps", text, set.id)
                      }
                      returnKeyType="next"
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Time:</Text>
                    <TimePicker
                      name="time"
                      value={set.time}
                      id={set.id}
                      clearTime={handleChangeSets}
                      setNewTime={handleChangeSets}
                    />
                  </View>
                  <View style={styles.rowDirection}>
                    <Text style={styles.label}>Rest time:</Text>
                    <TimePicker
                      name="rest_time"
                      value={set.rest_time}
                      id={set.id}
                      clearTime={handleChangeSets}
                      setNewTime={handleChangeSets}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.deletSetButton}
                    onPress={() => deleteSet(set.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              ))}

            <TouchableOpacity style={styles.addButton} onPress={generateNewSet}>
              <Ionicons
                style={styles.addIcon}
                name="add-circle"
                size={30}
                color="#6f6f6f"
              />
              <Text style={styles.addButtonText}>Add another set</Text>
            </TouchableOpacity>

            <View
              style={{
                marginVertical: 20,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <View style={styles.rowDirection}>
              <Text style={[styles.label, { marginRight: 6 }]}>Rest time between exercises:</Text>
              <TimePicker
                styleTimeButton={{ backgroundColor: "white" }}
                // styleTimeText={{ color: "white" }}
                styleDeleteClockButton={{ backgroundColor: "white" }}
                // deleteIconColor="white"
                name="rest_time"
                value={exercise.rest_time}
                id={exercise.id}
                clearTime={handleChangeExercise}
                // setNewTime={handleExerciseTimeConfirm}
                setNewTime={handleChangeExercise}
              />
            </View>

            <View
              style={{marginVertical: 20,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Button title="Save" color="#45260a" onPress={handleSubmit} />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  label: {
    fontFamily: "rubik-bold",
    marginVertical: 8,
    // color: "#333",
    color: "#45260a",
  },
  cardContainer: {
    marginVertical: 10,
    flex: 1,
    maxWidth: 400,
    padding: 10,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,

    marginVertical: 6,
    // backgroundColor: "#fdf2e9",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,

    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // elevation: 3,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "rubik",
    color: "red",
    fontSize: 13,
  },
  setInput: {
    height: 40,
    width: 50,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fdf2e9",

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  setContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    // backgroundColor: "#e67e2297",
    backgroundColor: "#eda15e",
    // backgroundColor: "rgba(230, 126, 34, 0.7)",

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  inputExercise: {
    height: 40,
    flexGrow: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fdf2e9",

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  addSet: {
    color: "#45260a",
  },
  deletSetButton: {
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    // borderColor: "#e67e22",
    borderColor: "#eda15e",
    backgroundColor: "#fdf2e9",
    alignSelf: "center",
    padding: 2,

    position: "absolute",
    top: -17,
    right: -17,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },

  typeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
    // borderWidth: 1,
    // borderColor: "#eda15e",
    backgroundColor: "#e7e7e7",
    backgroundColor: "#ECECEA",
  },
  typeContainerActive: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#eda15e",

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  textSelected: {
    color: "white",
    // color: "#fdf2e9",
    // color: "#333",
    fontWeight: "700",
  },
  textNotSelected: {
    // color: "#eda15e",
    // color: "#333",
    color: "#45260a",
    color: "#695E55",
    fontWeight: "700",
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // borderColor: "#45260a",
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 8,
    // width: "100%",
    backgroundColor: "#F9F7F5",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#45260a",
  },
  addIcon: {
    color: "#45260a",
    marginRight: 8,
  },
  orangeText: {
    fontSize: 16,
    color: "#cf711f",
    fontWeight: "700",
  },
});

export default EditExerciseScreen;

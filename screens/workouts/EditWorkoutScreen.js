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
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { editWorkoutPlan } from "../../store/actions/workouts-actions";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Colors from "../../constants/Colors";
import { EvilIcons } from "@expo/vector-icons";

const EditWorkoutScreen = ({ route, navigation }) => {
  const { slug } = route.params;
  const workout = useSelector((state) =>
    state.workouts.myWorkoutsList.find((workout) => workout.slug === slug)
  );
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [showStartDatePickerIos, setShowStartDatePickerIos] = useState(false);
  const [showEndDatePickerIos, setShowEndDatePickerIos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [editWorkout, setEditWorkout] = useState({});
  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => {
    if (editWorkout.name?.trim().length === 0) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
  }, [editWorkout]);

  useEffect(() => {
    setEditWorkout({
      name: workout.name ? workout.name : "",
      description: workout.description,
      goal: workout.goal,
      level: workout.level,
      start_date: workout.start_date ? new Date(workout.start_date) : "",
      end_date: workout.end_date ? new Date(workout.end_date) : "",
    });
  }, [slug, workout]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        { text: "Okay", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  // For any input from the user, set the state
  let handleChange = (name, value) => {
    setEditWorkout((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  let handleSubmit = () => {
    if (formValidity) {
      setError(null);
      setIsLoading(true);
      try {
        dispatch(editWorkoutPlan(authTokens, editWorkout, slug));
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }
      // After adding the workout plan, set the modal empty
      setEditWorkout();
      setIsLoading(false);
      navigation.navigate("My Workouts");
    } else {
      setError("The 'Name' field may not be blank.");
    }
  };

  const showStartDatepicker = () => {
    DateTimePickerAndroid.open({
      value: editWorkout.start_date || new Date(),
      onChange: (event, selectedDate) =>
        handleDatesConfirm(event, "start_date", selectedDate),
      mode: "date",
      is24Hour: true,
      display: "spinner",
    });
  };

  const showEndDatepicker = () => {
    DateTimePickerAndroid.open({
      value: editWorkout.end_date || new Date(),
      onChange: (event, selectedDate) =>
        handleDatesConfirm(event, "end_date", selectedDate),
      mode: "date",
      is24Hour: true,
      display: "spinner",
    });
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // month is zero-based
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formatted = dd + "/" + mm + "/" + yyyy;
    return formatted;
  };

  const handleDatesConfirm = (event, key, value) => {
    // If the user set a new date => then extract only the date without the time
    // Trough the handleChange function the state will be updated
    if (event.type === "set" && value) {
      handleChange(key, value);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {isLoading ? (
        <View style={styles.screen}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <ScrollView>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleChange("name", text)}
              value={editWorkout.name}
              returnKeyType="next"
            />
            {formValidity === false && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  The "Name" field is required!
                </Text>
              </View>
            )}

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={3}
              keyboardType="default"
              onChangeText={(text) => handleChange("description", text)}
              value={editWorkout.description}
            />

            <Text style={styles.label}>Level:</Text>
            <Picker
              style={styles.level}
              selectedValue={editWorkout.level}
              onValueChange={(value, index) => handleChange("level", value)}
            >
              <Picker.Item label="-- Choose --" value="" />
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>

            <Text style={styles.label}>Goal:</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              name="goal"
              onChangeText={(text) => handleChange("goal", text)}
              value={editWorkout.goal}
            />

            <Text style={styles.label}>Period:</Text>
            <View style={styles.rowDirection}>
              <Text style={styles.labelDate}>Start date:</Text>

              {Platform.OS === "android" && (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={showStartDatepicker}
                  >
                    <View>
                      <Text style={styles.timeButton}>
                        {editWorkout.start_date
                          ? formatDate(editWorkout.start_date)
                          : "DD/MM/YYYY"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {Platform.OS === "ios" && (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowStartDatePickerIos(true);
                    }}
                  >
                    <View>
                      <Text style={styles.timeButton}>
                        {editWorkout.start_date
                          ? formatDate(editWorkout.start_date)
                          : "DD/MM/YYYY"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.deleteClockButton}
                onPress={() => {
                  handleChange("start_date", "");
                }}
              >
                <EvilIcons
                  style={styles.icon}
                  name="trash"
                  size={32}
                  color="black"
                />
              </TouchableOpacity>

              {showStartDatePickerIos && Platform.OS === "ios" && (
                <DateTimePicker
                  testID="startDateTimePicker"
                  value={editWorkout.start_date || new Date()}
                  mode={"date"}
                  display="default"
                  onChange={(event, selectedDate) => {
                    handleDatesConfirm(event, "start_date", selectedDate),
                      setShowStartDatePickerIos(false);
                  }}
                />
              )}
            </View>

            <View style={styles.rowDirection}>
              <Text style={styles.labelDate}>End date:</Text>

              {Platform.OS === "android" && (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={showEndDatepicker}
                  >
                    <View>
                      <Text style={styles.timeButton}>
                        {editWorkout.end_date
                          ? formatDate(editWorkout.end_date)
                          : "DD/MM/YYYY"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {Platform.OS === "ios" && (
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowEndDatePickerIos(true);
                    }}
                  >
                    <View>
                      <Text style={styles.timeButton}>
                        {editWorkout.end_date
                          ? formatDate(editWorkout.end_date)
                          : "DD/MM/YYYY"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.deleteClockButton}
                onPress={() => {
                  handleChange("end_date", "");
                }}
              >
                <EvilIcons
                  style={styles.icon}
                  name="trash"
                  size={32}
                  color="black"
                />
              </TouchableOpacity>

              {showEndDatePickerIos && Platform.OS === "ios" && (
                <DateTimePicker
                  testID="endDateTimePicker"
                  value={editWorkout.end_date || new Date()}
                  mode={"date"}
                  display="default"
                  onChange={(event, selectedDate) => {
                    handleDatesConfirm(event, "end_date", selectedDate),
                      setShowEndDatePickerIos(false);
                  }}
                />
              )}
            </View>

            <Button title="Save" color="#45260a" onPress={handleSubmit} />
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  label: {
    fontFamily: "rubik-bold",
    marginVertical: 8,
    color: "#45260a",
  },
  cardContainer: {
    flex: 1,
    width: "95%",
    maxWidth: 400,
    padding: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "rubik",
    color: "red",
    fontSize: 13,
  },

  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 6,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  rowDirection: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    // justifyContent: "space-between",
  },
  level: {
    backgroundColor: Colors.seasalt,
  },
  labelDate: {
    fontFamily: "rubik",
    marginVertical: 8,
    color: "#6f6f6f",
  },

  deleteClockButton: {
    height: 40,
    backgroundColor: Colors.seasalt,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    justifyContent: "center",
  },
  timeButton: {
    height: 40,
    backgroundColor: Colors.seasalt,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
});

export default EditWorkoutScreen;

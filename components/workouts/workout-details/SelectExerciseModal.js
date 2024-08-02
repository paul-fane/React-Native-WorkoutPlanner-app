import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import Modal from "react-native-modal";
import Card from "../../UI/Card";
import Tag from "../../UI/Tag";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SelectExerciseModal = (props) => {
  const authTokens = useSelector((state) => state.auth.authTokens);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [exercisesList, setExercisesList] = useState([]);

  const [muscleNames, setMuscleNames] = useState([]);
  const [equipmentNames, setEquipmentNames] = useState([]);

  const [searchExercise, setSearchExercise] = useState({
    name: "",
    muscle: "",
    level: "",
    equipment: "",
  });

  const fetchExercises = async () => {
    const response = await fetch(
      "http://192.168.2.118:8000/exercices/exercisesList/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(searchExercise),
      }
    );
    const data = await response.json();
    setExercisesList(data);
  };

  useEffect(() => {
    if (props.isSelectExerciseModalVisible === false) {
      return
    }
    setMuscleNames([]);
    setEquipmentNames([]);
    setExercisesList([]);
    // setSearchExercise({
    //   name: "",
    //   muscle: "",
    //   level: "",
    //   equipment: "",
    // });
    const getMuscleEquipment = async () => {
      const response = await fetch(
        "http://192.168.2.118:8000/exercices/exercisesList/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      const data = await response.json();

      setMuscleNames(data.muscleList);
      setEquipmentNames(data.equipmentList);
    };
    getMuscleEquipment();

    fetchExercises();
  }, [props.isSelectExerciseModalVisible]);

  useEffect(() => {
    if (props.isSelectExerciseModalVisible === false) {
      return
    }
    fetchExercises();
  }, [searchExercise, props.isSelectExerciseModalVisible]);

  const handleChangeSearchExercise = (name, value) => {
    setSearchExercise((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };


  let setExerciseSelected = (ex) => {
    props.setExercise((prevFormData) => {
      return {
        ...prevFormData,
        name: ex.name,
        muscle: ex.muscle,
      };
    });
    setExercisesList([]);
    setSearchExercise({
      name: "",
      muscle: "",
      level: "",
      equipment: "",
    });
    props.toggleSelectExerciseModal();
  };

  return (
      <Modal
        isVisible={props.isSelectExerciseModalVisible}
        // onBackdropPress={props.toggleSelectExerciseModal}
        onBackButtonPress={props.toggleSelectExerciseModal}
        // onSwipeComplete={props.toggleSelectExerciseModal}
        // swipeDirection="down"
        style={{
          //   justifyContent: "flex-end",
          marginHorizontal: 0,
          marginTop: 100,
          //   marginBottom: 100
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text style={styles.title}>Select Exercise</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <ScrollView>
            <Text style={styles.text}>
              Filter by: Name, Muscle Grup, Level of Difficulty or Equipment
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="default"
              onChangeText={(text) => handleChangeSearchExercise("name", text)}
              value={searchExercise.name}
              returnKeyType="next"
              placeholder="Search for exercise name"
            />

            <Picker
              style={styles.picker}
              selectedValue={searchExercise.muscle}
              onValueChange={(value) =>
                handleChangeSearchExercise("muscle", value)
              }
            >
              <Picker.Item label="--Any Muscle--" value="" />
              {muscleNames.map((muscle, index) => (
                <Picker.Item key={index} label={muscle} value={muscle} />
              ))}
            </Picker>

            <Picker
              style={styles.picker}
              selectedValue={searchExercise.level}
              onValueChange={(value) =>
                handleChangeSearchExercise("level", value)
              }
            >
              <Picker.Item label="--Any Level--" value="" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>

            <Picker
              style={styles.picker}
              selectedValue={searchExercise.equipment}
              onValueChange={(value) =>
                handleChangeSearchExercise("equipment", value)
              }
            >
              <Picker.Item label="--Any Equipment--" value="" />
              {equipmentNames.map((equipment, index) => (
                <Picker.Item key={index} label={equipment} value={equipment} />
              ))}
            </Picker>

            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            <Text style={styles.text}>Select Exercise from Catalog </Text>

            {exercisesList.length > 0 &&
              exercisesList.map((exercise) => (
                <Card style={styles.card} key={exercise.id}>
                  <TouchableOpacity
                    onPress={() => setExerciseSelected(exercise)}
                  >
                    <View style={{ marginRight: 40 }}>
                      <View style={styles.rowDirection}>
                        <Text style={styles.exerciseMuscle}>
                          {exercise.muscle.toUpperCase()}
                        </Text>
                        <Text style={{ fontFamily: "rubik-bold" }}>
                          Level:{" "}
                        </Text>
                        {exercise.level === "Beginner" && (
                          <Tag level={"easy"}>{exercise.level}</Tag>
                        )}
                        {exercise.level === "Intermediate" && (
                          <Tag level={"medium"}>{exercise.level}</Tag>
                        )}
                        {exercise.level === "Advanced" && (
                          <Tag level={"hard"}>{exercise.level}</Tag>
                        )}
                      </View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={{ fontFamily: "rubik", color: "#6f6f6f" }}>
                        Equipment: {exercise.equipment}
                      </Text>
                    </View>
                    <Ionicons
                      style={styles.addButton}
                      name="add-circle"
                      size={40}
                      color="#6f6f6f"
                    />
                  </TouchableOpacity>
                </Card>
              ))}
          </ScrollView>

          <View
            style={{
                marginBottom: 5,
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Button color={"#6f6f6f"} onPress={props.toggleSelectExerciseModal} title="Cancel" />
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "600",
  },
  card: {
    // backgroundColor: "#e9c46a",
    // backgroundColor: "#f4a261",
    // backgroundColor: "#eda15e",
    // backgroundColor: "#fdf2e9",
    margin: 5,
    padding: 10,
  },
  exerciseName: {
    color: "#333",
    fontWeight: "700",
    fontSize: 18,
  },
  rowDirection: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: "center",
  },
  exerciseMuscle: {
    fontSize: 16,
    marginRight: 8,
    color: "#cf711f",
    fontWeight: "700",
  },
  text: {
    color: "#6f6f6f",
    fontSize: 18,
    lineHeight: 30,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  picker: {
    // backgroundColor: "#e6e6e6",
    backgroundColor: "#fdf2e9",
    margin: 5
  },
  input: {
    padding: 3,
    backgroundColor: "#fdf2e9",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default SelectExerciseModal;

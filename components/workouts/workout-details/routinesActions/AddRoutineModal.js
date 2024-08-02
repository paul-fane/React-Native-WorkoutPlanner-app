import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { addRoutine } from "../../../../store/reducers/routines-slice";
// import { addRoutine } from "../../../../store/reducers/routines-slice";
const AddRoutineModal = ({ workoutId, ...props }) => {
  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);

  let [newRoutine, setNewRoutine] = useState({});
  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => {
    setNewRoutine({
      name: "",
      workout: workoutId,
    });
  }, [workoutId]);

  useEffect(() => {
    if (newRoutine.name?.trim().length === 0) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
  }, [newRoutine]);

  const addNewRoutine = async () => {
    if (formValidity) {
      try {
        await dispatch(
          addRoutine({ authTokens: authTokens, newRoutine: newRoutine })
        );
      } catch (error) {
        console.error("Error updating selected value:", error);
      }
      setNewRoutine({
        name: "",
        workout: workoutId,
      });
      props.closeModal();
      props.setIndex(props.routinesLenght);
    }
  };

  // const addNewRoutine = async () => {
  //   if (formValidity) {
  //     dispatch(addRoutine(authTokens, newRoutine));
  //     props.setLastRoutineIndex();

  //     setNewRoutine({
  //       name: "",
  //       workout: workoutId,
  //     });
  //     props.closeModal();
  //   }
  // };

  let handleChange = (name, value) => {
    setNewRoutine((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  return (
    <Modal
      isVisible={props.isOpen}
      onBackdropPress={props.closeModal}
      onBackButtonPress={props.closeModal}
      onSwipeComplete={props.closeModal}
      swipeDirection="down"
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 10,
        }}
      >
        <Text style={styles.title}>Add a new routine!</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(text) => handleChange("name", text)}
          value={newRoutine.name}
          returnKeyType="next"
        />
        {formValidity === false && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>The name field is required!</Text>
          </View>
        )}

        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={props.closeModal}
            style={styles.singleButton}
          >
            <Text style={styles.button}>Cancel</Text>
          </TouchableOpacity>
          {formValidity === false ? (
            <TouchableOpacity
            style={styles.singleButton}
          >
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={addNewRoutine}
              style={styles.singleButton}
            >
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  button: {
    fontSize: 30,
    color: "#333",
    fontWeight: "400",
    margin: "auto",
    borderColor: "black",
  },
  singleButton: {
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  label: {
    fontFamily: "rubik-bold",
    marginVertical: 8,
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
});

export default AddRoutineModal;

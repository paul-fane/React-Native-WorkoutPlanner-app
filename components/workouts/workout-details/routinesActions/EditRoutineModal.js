import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentRoutine } from "../../../../store/actions/routines-actions";

const EditRoutineModal = ({ routine, ...props }) => {

  const dispatch = useDispatch();
  const authTokens = useSelector((state) => state.auth.authTokens);

  const [editRoutine, setEditRoutine] = useState({});
  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => {
    setEditRoutine({
      id: routine.key,
      name: routine.title,
      workout: routine.workout,
      order: routine.order
    });
  }, [routine]);

  useEffect(() => {
    if (editRoutine.name?.trim().length === 0) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
  }, [editRoutine]);

  const renameRoutine = () => {
    if (formValidity){
      dispatch(editCurrentRoutine(authTokens, editRoutine))
      props.closeModal()
    }
  };

  let handleChange = (name, value) => {
    setEditRoutine((prevFormData) => {
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
        <Text style={styles.title}>Edit "{routine.title}" routine</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text style={styles.label}>New Name</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          onChangeText={(text) => handleChange("name", text)}
          value={editRoutine.name}
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
          <TouchableOpacity
            onPress={renameRoutine}
            style={styles.singleButton}
          >
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
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

export default EditRoutineModal;

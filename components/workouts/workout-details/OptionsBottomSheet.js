import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const OptionsBottomSheet = (props) => {
  return (
    <Modal
      isVisible={props.isBottomSheetVisible}
      onBackdropPress={props.toggleBottomSheet}
      onBackButtonPress={props.toggleBottomSheet}
      onSwipeComplete={props.toggleBottomSheet}
      swipeDirection="down"
      style={{
        justifyContent: "flex-end",
        margin: 0,
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          padding: 16,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: "#FFB331",
        }}
      >
        <Feather
          style={{
            position: "absolute",
            alignSelf: "center",
            top: -15,
          }}
          name="minus"
          size={50}
          color="white"
        />

        <Text style={styles.title}>Routine: {props.title}</Text>
        <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.renameRoutine}
        >
          <EvilIcons
            style={styles.icon}
            name="pencil"
            size={30}
            color="white"
          />
          <Text style={styles.button}>Rename current routine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.deleteRoutine}
        >
          <EvilIcons style={styles.icon} name="trash" size={30} color="white" />
          <Text style={styles.button}>Delete current routine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.addRoutine}
        >
          <EvilIcons style={styles.icon} name="plus" size={30} color="white" />
          <Text style={styles.button}>Add a new Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.reorderRoutines}
        >
          <EvilIcons
            style={styles.icon}
            name="navicon"
            size={30}
            color="white"
          />
          <Text style={styles.button}>Reorder Routines</Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.addExercise}
        >
          <EvilIcons style={styles.icon} name="plus" size={30} color="white" />
          <Text style={styles.button}>Add New Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={props.reorderExercises}
        >
          <EvilIcons
            style={styles.icon}
            name="navicon"
            size={30}
            color="white"
          />
          <Text style={styles.button}>Reorder Exercises</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
  buttonContainer: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
    paddingBottom: 5
  },
});

export default OptionsBottomSheet;

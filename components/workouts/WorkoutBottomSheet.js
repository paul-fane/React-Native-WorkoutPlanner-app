import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const WorkoutBottomSheet = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <TouchableOpacity onPress={props.toggleBottomSheet}>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity> */}
      <Modal
        isVisible={props.isBottomSheetVisible}
        onBackdropPress={props.toggleBottomSheet}
        onBackButtonPress={props.toggleBottomSheet}
        onSwipeComplete={props.toggleBottomSheet}
        swipeDirection="down"
        style={{
          justifyContent: "flex-end",
          margin: 0,
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
          <Feather
            style={{
              position: "absolute",
              alignSelf: "center",
              top: -15,
            }}
            name="minus"
            size={50}
            color="grey"
          />

          <Text style={styles.title}>{props.title}</Text>
          <View
            style={{
              borderBottomColor: "#333",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <TouchableOpacity
            onPress={props.editWorkout}
            style={styles.buttonContainer}
          >
            <EvilIcons
              style={styles.icon}
              name="pencil"
              size={35}
              color="#333"
            />
            <Text style={styles.button}>Edit workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.deleteWorkout}
            style={styles.buttonContainer}
          >
            <EvilIcons
              style={styles.icon}
              name="trash"
              size={35}
              color="#333"
            />
            <Text style={styles.button}>Delete workout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    fontSize: 24,
    color: "#333",
    fontWeight: "400",
    alignSelf: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
    marginBottom: 7
  },
});

export default WorkoutBottomSheet;
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const DeleteModal = (props) => {
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
        <Text style={styles.title}>{props.title}</Text>
        {/* <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        /> */}
        <Text style={styles.text}>Are you sure?</Text>

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
            onPress={props.confirmDelete}
            style={styles.singleButton}
          >
            <Text style={styles.button}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#333"
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
    gap: 10
  },
});

export default DeleteModal;

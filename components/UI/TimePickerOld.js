import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TimePicker = (props) => {
  const [showTimePickerIos, setShowTimePickerIos] = useState(false);

  // For any input from the user, set the state
  // let handleChange = (name, value) => {
  //   setNewWorkoutPlan((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [name]: value,
  //     };
  //   });
  // };

  const showTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: props.value || new Date(0, 0, 0, 0, 0, 0),
      onChange: (event, selectedTime) =>
        // handleDatesConfirm(event, "rest_time", selectedTime),
        props.setNewTime(event, props.name, selectedTime, props.id),
      mode: "time",
      is24Hour: true,
      display: "spinner",
    });
  };

  const formatTime = (time) => {
    let hh = time.getHours();
    let mm = time.getMinutes();

    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;

    const formatted = hh + ":" + mm;
    return formatted;
  };

  // const handleDatesConfirm = (event, key, value) => {
  //   // If the user set a new date => then extract only the date without the time
  //   // Trough the handleChange function the state will be updated
  //   if (event.type === "set" && value) {
  //     handleChange(key, value);
  //   }
  // };

  return (
    <View style={styles.rowDirection}>
      {Platform.OS === "android" && (
        <TouchableOpacity
          onPress={showTimePickerAndroid}
          style={{ ...styles.timeButton, ...props.styleTimeButton }}
        >
          <Text style={{ ...props.styleTimeText }}>
            {props.value ? formatTime(props.value) : "00:00"}
          </Text>
        </TouchableOpacity>
      )}

      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={() => {
            setShowTimePickerIos(true);
          }}
          style={styles.timeButton}
        >
          <Text>{props.value ? formatTime(props.value) : "00:00"}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{ ...styles.deleteClockButton, ...props.styleDeleteClockButton }}
        onPress={() => {
          props.clearTime(props.name, "", props.id);
        }}
      >
        <MaterialCommunityIcons
          name="delete-clock-outline"
          size={22}
          color={props.deleteIconColor || "black"}
        />
      </TouchableOpacity>

      {showTimePickerIos && Platform.OS === "ios" && (
        <DateTimePicker
          testID="TimePicker"
          value={props.value || new Date(0, 0, 0, 0, 0, 0)}
          mode={"time"}
          display="default"
          onChange={(event, selectedTime) => {
            props.setNewTime(event, props.name, selectedTime, props.id);
            // handleDatesConfirm(event, "rest_time", selectedTime),
            setShowTimePickerIos(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowDirection: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeButton: {
    height: 40,
    backgroundColor: "#fdf2e9",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  deleteClockButton: {
    height: 40,
    backgroundColor: "#fdf2e9",
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
});

export default TimePicker;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const TimePicker = (props) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatTime = ({ hours, minutes, seconds }) => {
    const timeParts = [];

    // if (hours !== undefined) {
    //   timeParts.push(hours.toString().padStart(2, "0"));
    // }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <View style={styles.rowDirection}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <View>
              <Text
              style={{ ...styles.timeButton, ...props.styleTimeButton, ...props.styleTimeText }}
              >
                {props.value? props.value : "00:00"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        hideHours
        initialMinutes={props.value ? Number(props.value.slice(0, 2)) : 0}
        initialSeconds={props.value ? Number(props.value.slice(3, 5)) : 0}
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          props.setNewTime(props.name, formatTime(pickedDuration), props.id);
          setShowPicker(false);
        }}
        modalTitle="Rest Time"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        use12HourPicker
        LinearGradient={LinearGradient}
        styles={{
          theme: "light",
        }}
      />

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

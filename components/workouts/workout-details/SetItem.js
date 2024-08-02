import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SetItem = ({ set, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.setsContainer}>
        {type === "weights/bodyweight" && (
          <>
            {set?.sets && (
              <View style={styles.rowDirection}>
                {/* <MaterialCommunityIcons name="view-list" size={24} color={Colors.sandyBrown} /> */}
                <Feather name="list" size={20} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.sets} Sets</Text>
              </View>
            )}
            {set?.reps && (
              <View style={styles.rowDirection}>
                {/* <MaterialIcons name="repeat-on" size={24} color={Colors.sandyBrown} /> */}
                <Feather name="repeat" size={18} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.reps} Reps</Text>
              </View>
            )}
            {set?.weight && (
              <View style={styles.rowDirection}>
                {/* <MaterialCommunityIcons name="weight" size={24} color={Colors.sandyBrown} /> */}
                {/* <Ionicons name="barbell-outline" size={24} color={Colors.sandyBrown} /> */}
                <MaterialIcons name="fitness-center" size={18} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.weight} Kg/Lbs</Text>
              </View>
            )}
          </>
        )}
        {type === "time/distance" && (
          <>
            {set?.reps && (
              <View style={styles.rowDirection}>
                {/* <MaterialIcons name="repeat-on" size={24} color={Colors.sandyBrown} /> */}
                <Feather name="repeat" size={24} color={Colors.sandyBrown}/>
                <Text style={styles.text}>{set.reps} Reps</Text>
              </View>
            )}
            {set?.time && set.time !== "00:00:00" && (
              <View style={styles.rowDirection}>
                {/* <MaterialIcons name="timer" size={24} color={Colors.sandyBrown} /> */}
                <MaterialCommunityIcons name="timer-outline" size={24} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.time.slice(3, 8)} Time</Text>
              </View>
            )}
            {set?.distance && (
              <View style={styles.rowDirection}>
                <MaterialCommunityIcons name="map-marker-multiple-outline" size={24} color={Colors.sandyBrown} />
                {/* <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={24}
                  color={Colors.sandyBrown}
                /> */}
                <Text style={styles.text}>{set.distance} Km/Mil</Text>
              </View>
            )}
          </>
        )}
        {type === "cycle" && (
          <>
            {set?.name && (
              <View style={styles.rowDirection}>
                <Feather name="list" size={24} color={Colors.sandyBrown} />
                {/* <MaterialCommunityIcons name="view-list" size={24} color={Colors.sandyBrown} /> */}
                <Text style={styles.text}>{set.name}</Text>
              </View>
            )}
            {set?.reps && (
              <View style={styles.rowDirection}>
                {/* <MaterialIcons name="repeat-on" size={24} color={Colors.sandyBrown} /> */}
                <Feather name="repeat" size={24} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.reps} Reps</Text>
              </View>
            )}
            {set?.time && set.time !== "00:00:00" && (
              <View style={styles.rowDirection}>
                {/* <MaterialIcons name="timer" size={24} color={Colors.sandyBrown} /> */}
                <MaterialCommunityIcons name="timer-outline" size={24} color={Colors.sandyBrown} />
                <Text style={styles.text}>{set.time.slice(3, 8)} Time</Text>
              </View>
            )}
          </>
        )}
      </View>
      {set?.rest_time && set.rest_time !== "00:00:00" && (
        <View style={[styles.rowDirection, styles.restTime]}>
          {/* <MaterialIcons name="timer" size={24} color={Colors.sandyBrown} /> */}
          <MaterialCommunityIcons name="timer-outline" size={24} color={Colors.sandyBrown} />
          <Text style={styles.text}>
            Rest time between sets: {set.rest_time.slice(3, 8)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  setsContainer: {
    flexDirection: "row",
    // paddingHorizontal: 10,
    paddingTop: 8,
    justifyContent: "space-between",
    alignItems: "center"
    // marginHorizontal: 10,
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: "center",
    gap: 7,
  },
  restTime: {
    // paddingBottom: 5
  },
  text: {
    color: "#6f6f6f",
    // fontSize: 14,
    // lineHeight: 30,
  },
});

export default SetItem;

import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, StatusBar, Text, FlatList, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectExercisesByRoutineId } from "../../../store/selectors";

import ExerciseItem from "./ExerciseItem";
// import OptionsBottomSheet from "./OptionsBottomSheet";


const RoutineDetails = ({ navigation, routine, ...props }) => {
  // const authTokens = useSelector((state) => state.auth.authTokens);
  const exercises = useSelector((state) =>
    selectExercisesByRoutineId(state, routine.key)
  );
  // console.log(exercises)

  return (
    <View style={[styles.scene, { backgroundColor: "white" }]}>
      {exercises.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No exercise found. Maybe start adding some!</Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={(itemData) => <ExerciseItem navigation={navigation} exercise={itemData.item} />}
        />
      )}
      {/* <OptionsBottomSheet
        title={routine.title}
        toggleBottomSheet={props.toggleOptionsBottomSheet}
        isBottomSheetVisible={props.isOptionsBottomSheetVisible}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

// export default RoutineDetails;

export default React.memo(RoutineDetails);

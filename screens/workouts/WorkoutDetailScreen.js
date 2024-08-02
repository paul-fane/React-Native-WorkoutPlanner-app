import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import { routinesActions } from "../../store/reducers/routines-slice";
// import { exercisesActions } from "../../store/reducers/exercises-slice";
import { loadRoutines } from "../../store/actions/routines-actions";
import {
  selectWorkoutBySlug,
  selectRoutinesByWorkoutId,
} from "../../store/selectors";
import { deleteCurrentRoutine } from "../../store/actions/routines-actions";
import { TabView, TabBar } from "react-native-tab-view";

import DeleteModal from "../../components/UI/DeleteModal";
import AddRoutineModal from "../../components/workouts/workout-details/routinesActions/AddRoutineModal";
import EditRoutineModal from "../../components/workouts/workout-details/routinesActions/EditRoutineModal";
import OptionsBottomSheet from "../../components/workouts/workout-details/OptionsBottomSheet";
import RoutineTab from "../../components/workouts/workout-details/RoutineTab";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const WorkoutDetailScreen = ({ route, navigation }) => {
  const layout = useWindowDimensions();

  const { slug, id } = route.params;
  const dispatch = useDispatch();

  // Selectors
  const authTokens = useSelector((state) => state.auth.authTokens);
  const workout = useSelector((state) => selectWorkoutBySlug(state, slug));

  // States
  const [index, setIndex] = useState(0);
  const routes = useSelector((state) => selectRoutinesByWorkoutId(state, id));

  const [isEditRoutineModal, setEditRoutineModal] = useState(false);
  const [isAddRoutineModal, setAddRoutineModal] = useState(false);
  const [isDeleteRoutineModal, setDeleteRoutineModal] = useState(false);

  const [isOptionsBottomSheetVisible, setOptionsBottomSheetVisible] =
    useState(false);

  const toggleOptionsBottomSheet = () => {
    setOptionsBottomSheetVisible(!isOptionsBottomSheetVisible);
  };

  useEffect(() => {
    if (routes.length > 0) {
      // If the routines are already in memory, do not fetch again
      return;
    }
    dispatch(loadRoutines(authTokens, slug));
  }, [slug, routes]);

  // Routine: Rename, Delete, Add
  const openRenameRoutineModal = () => {
    setEditRoutineModal(true);
    toggleOptionsBottomSheet();
  };
  const openDeleteRoutineModal = () => {
    setDeleteRoutineModal(true);
    toggleOptionsBottomSheet();
  };
  const openAddRoutineModal = () => {
    setAddRoutineModal(true);
    toggleOptionsBottomSheet();
  };

  const reorderRoutines = (id) => {
    navigation.navigate("Reorder Routines", {
      id: id,
    });
    toggleOptionsBottomSheet();
    setIndex(0);
    // if (routes.length- 1 === index){
    //   setIndex(0)
    // }
  };

  const addExercise = () => {
    navigation.navigate("Add Exercise", {
      currentRoutineId: routes[index]["key"],
    });
    toggleOptionsBottomSheet();
  };

  
  const confirmDeleteRoutine = () => {
    const indexCalc = index - 1
    dispatch(deleteCurrentRoutine(routes[index]["key"], authTokens));
    
    if (routes.length === 1){
      // important to not set the index if the last routine will be deleted
      return 
    } else if((routes.length-1) === index ){
      // setIndex(index-1);
      setIndex(indexCalc);
    }
    setDeleteRoutineModal(false)
  };

  const reorderExercises = (routineId, routineTitle) => {
    navigation.navigate("Reorder Exercises", {
      id: routineId,
      nameTitle: routineTitle
    });
    toggleOptionsBottomSheet();
  };

  // Manage tabs
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      activeColor={Colors.textPrimary}
      indicatorStyle={{ backgroundColor: Colors.textPrimary }}
      // inactiveColor={Colors.walnutBrown}
      inactiveColor='rgb(115, 115, 115)'
      style={{ backgroundColor: Colors.tabBarBackground }}
      labelStyle={{  fontWeight: 'bold' }}
      
      // tabStyle={styles.tab}
      // labelStyle={styles.label}
      // gap={40}
    />
  );

  const renderScene = ({ route }) => {
    return <RoutineTab navigation={navigation} key={route.key} routine={route} />;
  };

  return (
    <View style={[styles.container]}>
      {routes.length > 0 ? (
        <View style={[styles.container]}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
          <OptionsBottomSheet
            title={routes[index]["title"]}
            toggleBottomSheet={toggleOptionsBottomSheet}
            isBottomSheetVisible={isOptionsBottomSheetVisible}
            renameRoutine={openRenameRoutineModal}
            addRoutine={openAddRoutineModal}
            deleteRoutine={openDeleteRoutineModal}
            reorderRoutines={() => reorderRoutines(id)}
            addExercise={addExercise}
            reorderExercises={() => reorderExercises(routes[index]["key"], routes[index]["title"])}
          />
          {/* <TouchableOpacity
            style={styles.optionsButton}
            onPress={toggleOptionsBottomSheet}
          >
            <Ionicons name="add-circle" size={80} color={Colors.orangeButton} />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.optionsButton}
            onPress={toggleOptionsBottomSheet}
          >
            <Ionicons
              name="ellipsis-horizontal-circle-sharp"
              size={80}
              color="#eda15e"
            />
          </TouchableOpacity>

          <EditRoutineModal
            routine={routes[index]}
            closeModal={() => {
              setEditRoutineModal(false);
            }}
            isOpen={isEditRoutineModal}
          />
          <DeleteModal
            title={`Delete "${routes[index]["title"]}" routine!`}
            confirmDelete={confirmDeleteRoutine}
            closeModal={() => {
              setDeleteRoutineModal(false);
            }}
            isOpen={isDeleteRoutineModal}
          />
          <AddRoutineModal
            workoutId={id}
            setIndex={setIndex}
            routinesLenght={routes.length}
            closeModal={() => {
              setAddRoutineModal(false);
            }}
            isOpen={isAddRoutineModal}
          />
        </View>
      ) : (
        <View style={[styles.container]}>
          <View style={styles.noRoutineScreen}>
            <Text>No routine in the workout!</Text>
            <TouchableOpacity
              style={styles.addRoutineButton}
              onPress={() => setAddRoutineModal(true)}
            >
              <Text style={styles.addRoutineButtonContent}>Add your first routine!</Text>
            </TouchableOpacity>
          </View>

          <AddRoutineModal
            workoutId={id}
            setIndex={setIndex}
            routinesLenght={routes.length}
            closeModal={() => {
              setAddRoutineModal(false);
            }}
            isOpen={isAddRoutineModal}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  noRoutineScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight,
  },
  tabBarText: {
    backgroundColor: "red",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tab: {
    width: "auto",
  },
  label: {
    fontWeight: "400",
  },
  addRoutineButton: {
    backgroundColor: Colors.orangeButton,
    borderRadius: 10,
    padding: 15,
    
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    justifyContent: "center",
  },
  addRoutineButtonContent: {
    color: 'white',
    fontWeight: "700",
    fontSize: 24
  }, 
  optionsButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});

export default WorkoutDetailScreen;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken, tryInitialLogin } from "../store/actions/auth-actions";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WorkoutsStackScreen from "./WorkoutsStackScreen";
import AuthenticationStackScreen from "./AuthenticationStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  // Authentication flow
  const [isLoadingUpdatedTokens, setIsLoadingUpdatedTokens] = useState(true);
  const authTokens = useSelector((store) => store.auth.authTokens);


  useEffect(() => {
    // Try initial login
    dispatch(tryInitialLogin());
  }, [dispatch]);

  useEffect(() => {
    // Refresh the tokens on the first load if user already logged in
    if (isLoadingUpdatedTokens && authTokens) {
      dispatch(updateToken(authTokens.refresh));
      setIsLoadingUpdatedTokens(false);
    }

    // Update token every 29 minutes
    let time = 1000 * 60 * 29;
    let interval = setInterval(() => {
      if (authTokens) {
        dispatch(updateToken(authTokens.refresh));
      }
    }, time);
    return () => clearInterval(interval);
  }, [authTokens, isLoadingUpdatedTokens, dispatch]);

  return (
    <NavigationContainer>
      {authTokens ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Workouts" component={WorkoutsStackScreen} />
          <Tab.Screen name="Exercises" component={WorkoutsStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      ) : (
        <AuthenticationStackScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

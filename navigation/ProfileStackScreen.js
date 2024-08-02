import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ProfileScreen from "../screens/profile/ProfileScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="My Profile"
        component={ProfileScreen}
        options={{
          title: "My Profile",
        }}/>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
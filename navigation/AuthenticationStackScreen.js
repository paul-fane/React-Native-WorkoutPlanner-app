import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen"
import ResetPasswordScreen from "../screens/authentication/ResetPasswordScreen";
// import GoogleScreen from "../screens/authentication/GoogleScreen";

const AuthenticationStack = createNativeStackNavigator();


const AuthenticationStackScreen = () => {
    return (
        <AuthenticationStack.Navigator>
            <AuthenticationStack.Screen name="Sign In" component={SignInScreen} />
            <AuthenticationStack.Screen name="Sign Up" component={SignUpScreen} />
            <AuthenticationStack.Screen name="Reset Password Screen" component={ResetPasswordScreen} />
            {/* <AuthenticationStack.Screen name="Google Screen" component={GoogleScreen} /> */}
        </AuthenticationStack.Navigator>
    )
}


export default AuthenticationStackScreen;
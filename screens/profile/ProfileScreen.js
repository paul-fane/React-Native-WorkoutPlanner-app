import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth-actions";
import Colors from "../../constants/Colors";


const ProfileScreen = ({ navigation, props }) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const logoutHandler = async () => {
    setError(null);
    try {
      //await dispatch(action);
      dispatch(logout());
      //   await AsyncStorage.removeItem("authTokens");
      //   dispatch(authActions.logout());
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Button title="Logout" color={Colors.primary} onPress={logoutHandler} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ProfileScreen;

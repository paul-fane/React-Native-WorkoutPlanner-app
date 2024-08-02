import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/auth-actions";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// TODO: FINISH SUCCESSFUL PAGE STYLE!!
// TODO: IMPLEMENT RESEND MAIL
// TODO: RESET PASSWORD

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignUpScreen = ({ navigation, props }) => {
  const [successRegister, setSuccessRegister] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
    inputValidities: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [
        { text: "Okay", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  useEffect(() => {
    if (formState.inputValues.password !== formState.inputValues.re_password) {
      setPasswordValidity(false);
    } else {
      setPasswordValidity(true);
    }
  }, [formState.inputValues.password, formState.inputValues.re_password]);

  const registerHandler = async () => {
    if (formState.formIsValid === false || passwordValidity === false) {
      setError("The form is invalid!");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        registerUser(
          (username = formState.inputValues.username),
          (email = formState.inputValues.email),
          (password = formState.inputValues.password),
          (re_password = formState.inputValues.re_password)
        )
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    } finally {
      setSuccessRegister(true);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const handleGoBack = () => {
    setSuccessRegister(false);
    navigation.navigate("Sign In");
  };

  if (successRegister) {
    return (
      <ScrollView>
        <View style={styles.centered}>
          <Text>PlanForWorkout</Text>
          <Text>Verification email has been sent!</Text>
          <Text>
            We've sent it to your email address: {formState.inputValues.email}.
            Click on the link you received in the email to finish the
            registration process.
          </Text>
          <Text>
            Important! Before logging in, you have to Click on the link you
            recieve in email to activate your account!
          </Text>
          <Text>
            You will not be able to login if the account is not activated! You
            will not be able to create another account with an email which is
            already registred but not activated!
          </Text>
          <Text>
            If you has not received an emai, press the resend activation email
            button below. Befor pressing the button, control if the email is
            correct. Control also the spam section. Onli the last email you
            receive will activate your account, if you resend the email many
            times!
          </Text>
          <Text>
            When your activation account is completed, you will recieve a
            confirmation email!
          </Text>
          <Button title="Resend Activation E-mail" color={Colors.primary} />
          <Button title="Go to Login" onPress={handleGoBack} />
        </View>
      </ScrollView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffc929", "#ff7a29"]} style={styles.centered}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="username"
              label="Username"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid username."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={8}
              autoCapitalize="none"
              errorText="This password is too short. It must contain at least 8 characters."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="re_password"
              label="Confirm-password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={8}
              autoCapitalize="none"
              passwordValidity={passwordValidity}
              errorText="This password is too short. It must contain at least 8 characters."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title="Register"
                  color={Colors.primary}
                  onPress={registerHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Go to Login"
                color={Colors.accent}
                onPress={() => navigation.navigate("Sign In")}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default SignUpScreen;

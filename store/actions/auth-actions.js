import { authActions } from "../reducers/auth-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Authentication Flow

// Implement logic to check if the user is authenticated upon app startup.
// If a token exists in AsyncStorage, set it as the default token in Redux for fetch requests.
// Redirect users to the login screen if they are not authenticated.

export const tryInitialLogin = () => {
  return async (dispatch) => {
    const tryLogin = async () => {
      const authTokens = await AsyncStorage.getItem("authTokens");
      
      if (!authTokens) {
        return;
      }

      const transformedData = JSON.parse(authTokens);
      return transformedData;
    };

    try {
      const authTokens = await tryLogin();
      dispatch(authActions.authenticate({ authTokens: authTokens }));
    } catch (error) {
      // dispatch(authActions.theUserIsNotLoggedIn());
      console.log("error when trying initial login");
    }
  };
};

// Sending Authenticated Requests to the server
// Login the user

export const login = (username, password) => {
  return async (dispatch) => {
    let response = await fetch("http://192.168.1.118:8081/api/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    
    if (response.ok) {
      let data = await response.json();
      saveDataToStorage(data);
      dispatch(authActions.authenticate({ authTokens: data }));
    } else {
      //handling authentication errors
      let message = "Invalid username and/or password. No active account found with the given credentials."
      throw new Error(message);
    }
  };
};


// Register a new user

export const registerUser = (username, email, password, re_password) => {
  return async (dispatch) => {
    let response = await fetch("http://192.168.1.118:8081/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        re_password: re_password,
      }),
    });
    
    if (response.ok) {
      console.log("Successful registration!")
    } else {
      //handling authentication errors
      const data = await response.json();
      console.log(data)
      let message = 'Something went wrong!\n'
      if (data.email) {
        message = message + "Email: " + data.email + '\n'
      }
      if (data.username) {
        message = message + "Username: " + data.username + '\n'
      }
      if (data.password) {
        message = message + "Password: " + data.password + '\n'
      }
      if (data.re_password) {
        message = message + "Confirm Password: " + data.re_password + '\n'
      }
      if (data.non_field_errors) {
        message = message + data.non_field_errors
      }
      console.log(message)
      throw new Error(message);
    }
  };
};

// Logging Out => Implement a logout functionality that removes the token
//from AsyncStorage and redirects the user to the login screen.

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("authTokens");
    dispatch(authActions.logout());
    // try {
    //   await AsyncStorage.removeItem("authTokens");
    //   dispatch(authActions.logout());
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };
};

// Update the tokens before expiration time

export const updateToken = (refreshToken) => {
  return async (dispatch) => {
    let response = await fetch("http://192.168.1.118:8081/api/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    let data = await response.json();
    console.log("update token");
    if (response.ok) {
      saveDataToStorage(data);
      dispatch(authActions.updateToken({ authTokens: data }));
    } else {
      errorResData = data;
      console.log(errorResData);
      let message = "Something went wrong!";
    }
  };
};

// Storing Tokens Securely Using AsyncStorage
const saveDataToStorage = async (authTokens) => {
  await AsyncStorage.setItem("authTokens", JSON.stringify(authTokens));
};

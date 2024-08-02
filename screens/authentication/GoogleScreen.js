import * as React from "react";
import { WebView } from "react-native-webview";

const GoogleScreen = ({ route, navigation }) => {
    const { link } = route.params;
  return (
    <WebView 
        //style={styles.container} 
        source={{ uri: link }} 
    />
  );
};

export default GoogleScreen;

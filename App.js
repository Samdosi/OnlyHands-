import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomePage from './HomePage'
import Home from "./HomePage";
//import LoginScreen from './Login'


const image = {
  uri: "https://www.enjpg.com/img/2020/boxing-14-e1622327615788.jpg",
};
const App = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <Home />
    /*
    <SafeAreaView>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.View}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder="Username"
              value={text}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Password"
              keyboardType="numeric"
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaView>
    */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: 500,
    height: 1000,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  View: {},
});

export default App;

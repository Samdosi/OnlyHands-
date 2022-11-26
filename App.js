import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import ProfileScreen from "./pages/ProfileScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ChatScreen from "./pages/ChatScreen";
import HomePage from "./pages/HomePage";
import MessageScreen from "./pages/MessageScreen";
import Home from "./pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { color } from "react-native-reanimated";

const image = {
  uri: "https://www.enjpg.com/img/2020/boxing-14-e1622327615788.jpg",
};

const Stack = createNativeStackNavigator();
const App = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <NavigationContainer>
       <Stack.Navigator>       
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "red" },
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "black", color: "white" },
            headerTintColor: "white",
          }}
       />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MessageScreen"
          component={MessageScreen}
          option={{headerShown:false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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

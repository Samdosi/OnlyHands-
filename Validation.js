import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  navigation,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
//import axios from "axios";
function validation({
  username,
  email,
  password,
  onFocus = () => {},
  ...props
}) {
  <View style={{ marginBottom: 20 }}>
    <View style={[styles.inputcontainer]}></View>
  </View>;

  // try {
  //   const payload = { username, email, password };
  //   axios({
  //     method: "post",
  //     url: `${baseUrl}/api/users/1`,
  //   }).then((response) => {
  //     console.log(response.data);
  //   });
  // } catch (e) {}

  return;
}
const styles = StyleSheet.create({
  inputcontainer: {
    height: 55,
    flexDirection: "row",
    marginHorizontal: 15,
    borderWidth: 0.5,
    alignContent: "center",
    backgroundColor: "white",
  },
});
export default validation;

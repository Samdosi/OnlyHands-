import React from "react";
import { ImageBackground, StyleSheet, Image, Text, View } from "react-native";
function LoginScreen(props) {
  return (
    // <Image
    //   style={styles.background}
    //   source={"/Users/samdosi/Desktop/POOP/onlyHands/assets/wallpaper.jpeg"}
    // ></Image>
    <View style={styles.background}>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreen;

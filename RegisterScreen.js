import React from "react";
import {
  Keyboard,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Input from "./Input";
import Button from "./Button";

import Loader from "./Loader";
import axios from "axios";

function RegisterScreen({ navigation }) {
  const [inputs, setInputs] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErorrs] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.username) {
      handleErorr("Please input Username", "username");
      valid = false;
    }

    if (!inputs.email) {
      handleErorr("Please input Email", "email");
      let valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErorr("Email is not valid", "email");
      let valid = false;
    }
    if (!inputs.password) {
      handleErorr("Please input Password", "password");
      let valid = false;
    } else if (inputs.password.length < 8) {
      handleErorr("Min password length of 8", "password");
      let valid = false;
    }
    if (valid) {
      register();
    }
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleErorr = (errorMessage, input) => {
    setErorrs((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const register = async () => {
    setLoading(true);

    //setTimeout(() => {

    // finish the API and connect to the database
    const payload = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
    };
    try {
      const baseUrl = "https://only-hands.herokuapp.com";
      const res = await axios.post(baseUrl + "/api/user", payload);
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error.response.data);
      //handleErorr(error.response.data.message, error.response.data.input);
      setLoading(false);
    }

    //}, 3000);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Loader visible={loading} />
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={require("./assets/wallpaper.jpeg")}
        blurRadius={1}
      >
        <View style={styles.IntroTextCointainer}>
          <Text style={styles.IntroText}>Register</Text>
          <Input
            placeholder="Enter your Username"
            placeholderTextColor="gray"
            color="white"
            iconName={"account-circle"}
            label="Username"
            error={errors.username}
            onFocus={() => {
              handleErorr(null, "username");
            }}
            onChangeText={(text) => handleOnChange(text, "username")}
          />
          <Input
            placeholder="Enter your Email"
            placeholderTextColor="gray"
            color="white"
            iconName={"email-outline"}
            label="Email"
            error={errors.email}
            onFocus={() => {
              handleErorr(null, "email");
            }}
            onChangeText={(text) => handleOnChange(text, "email")}
          />
          <Input
            placeholder="Enter your Password"
            placeholderTextColor="gray"
            color="white"
            iconName={"lock-outline"}
            label="Password"
            password={true}
            error={errors.password}
            onFocus={() => {
              handleErorr(null, "password");
            }}
            onChangeText={(text) => handleOnChange(text, "password")}
          />
          <Button title={"Register"} onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")} // needs to debug
            style={{
              color: "white",
              fontSize: 16,
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            Already have account? Login
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  safeArea: {
    backgroundColor: "black",
    flex: 1,
  },

  IntroText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  IntroTextCointainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  fillIn: {
    color: "black",
    margin: 30,
    backgroundColor: "white",
    width: 150,
    height: 30,
    borderRadius: 8,
    textAlign: "center",
  },

  fillInContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "columns",
    justifyContent: "center",
    top: -50,
  },

  registerButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },

  registerButtonView: {
    top: 40,
    backgroundColor: "#a83f38",
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
  },

  backArrow: {
    color: "white",
    width: 30,
    height: 30,
  },

  backArrowTouch: {
    backgroundColor: "black",
    width: 30,
    height: 40,
    left: 8,
  },
});

export default RegisterScreen;

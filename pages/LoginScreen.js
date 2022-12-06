import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  React,
  useStaten,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import Loader from "./Loader";
import LoadProfiles from "../assets/data/loadprofiles";
import Home from "./HomePage";
import AntDesign from 'react-native-vector-icons/AntDesign'

const ModelPop = ({ visible, children }) => {
  const [showModal, setVisible] = useState(false);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modelBackgrond}>
        <View style={[styles.modelcontainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username = null, setUsername] = useState();
  const [password = null, setPassword] = useState();
  const [errors, setError] = useState({ username: "", password: "" });
  const [loading, setLoad] = useState();
  const [visible, setVisible] = useState(false);
  const [email, onChangeEmail] = useState("");
  const findemail = async () => {
    const payload = {
      email: email,
    };
    try {
      const url = "https://only-hands.herokuapp.com/api/user/forgot-password";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.put(url, payload, {
        headers: headers,
      });
      console.log(response);
      Alert.alert(response.data.message);
    } catch (error) {
      console.log(error);
      Alert.alert("Email not found!");
    }
  };
  const Login = async () => {
    if (username == "" || password == "") {
      alert("please input both fields");
    } else {
      const payload = {
        username: username,
        password: password,
      };
      setLoad(true);
      try {
        const baseURL = "https://only-hands.herokuapp.com";

        await axios
          .post(baseURL + "/api/user/login/", payload)
          .then((response) => {
            const token = response.data.token;
            const userId = response.data.profile;
            if (response.data.profile == null) {
              navigation.navigate("ProfileScreen", { paramKey: token });
            } else {
              LoadProfiles(token).then(() => {
                console.log(response);
                console.log(response.data.profile)
                navigation.navigate("Home", { paramKey: token, userId: userId });
              });
            }
          });
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ModelPop visible={visible} style={{}}>
        <View style={{ alignItems: "center"}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <AntDesign
                name="close"
                size={35}
                style={{left:150,top:-8,color:'white' }}
              ></AntDesign>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 17, textAlign: "center", marginEnd: 85, color:'white'}}>
              Enter your email address:
            </Text>
            <TextInput
              mode="flat"
              label={"First Name"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeEmail}
              value={email}
            ></TextInput>
            <TouchableOpacity onPress={findemail}>
              <View style={styles.saveButtonView}>
                <Text style={{color:'white',fontWeight:'500',fontSize:'16'}}>Enter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ModelPop>
      <Loader visible={loading} />

      <ImageBackground
        style={styles.background}
        source={require("../assets/pexels-cottonbro-4761792.jpg")}
      >
        <View style={styles.mainView}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.paddUsername}>
            <Input
              placeholder="Enter your Username"
              label="Username"
              placeholderTextColor="gray"
              iconName={"account-cicle"}
              color="white"
              error={errors.username}
              onChangeText={(input) => setUsername(input)}
            />
          </View>

          <View style={styles.paddPassword}>
            <Input
              placeholder="Enter your Password"
              label="Password"
              placeholderTextColor="gray"
              iconName={"lock-outline"}
              color="white"
              password={true}
              error={errors.password}
              onChangeText={(input) => setPassword(input)}
            />
          </View>

          <Button title="Login" onPress={Login} style={styles.enter} />

          <View style={styles.redirectView}>
            <Text style={styles.redirectMessage}>No Account? </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.redirectLink}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgetPasswordContainer}>

            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.redirectpass}>Forgot password?</Text>
            </TouchableOpacity>

          </View>
         
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  forgetPasswordContainer:{
    justifyContent:'center',
    alignItems:'center',
    top:15
  },

  fillIn: {
    width: 280,
    height: 40,
    backgroundColor: "rgba(60, 60, 60, 0.8)",
    top: 10,
    marginBottom: 35,
    borderRadius:2,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1.8,
    placeholderTextColor: "black",
    fontWeight: "600",
    fontSize: "14",
    color: "white",
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
    
  },
  modelcontainer: {
    width: "90%",
    height:200,
    backgroundColor: "rgba(52, 52, 52, 0.8)" ,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 5,
    borderColor:'black',
    borderWidth:'1',
    elevation: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  modelBackgrond: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  redirectpass: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    //marginLeft: 130,
    //marginTop: 20,
  },
  safeArea: {
    backgroundColor: "black",
    flex: 1,
  },

  background: {
    width: "100%",
    height: "100%",
  },

  mainView: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },

  paddUsername: {
    paddingTop: 25,
  },

  paddPassword: {
    paddingTop: 25,
  },

  redirectView: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  redirectMessage: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  redirectLink: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  saveButtonView: {
    width: 120,
    height: 40,
    backgroundColor: "#009bb0",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    bottom: 15,
    borderRadius: 2,
    backgroundColor: "#ff0011",
  },
});

export default LoginScreen;

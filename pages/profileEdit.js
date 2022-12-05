import React, { useState, useEffect } from "react";
import {
  Input,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
  ImagePickerIOS,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { CheckBox, useTheme } from "react-native-elements";
import { ImagePicker } from "react-native-image-picker";
import Loader from "./Loader";
import axios from "axios";

function ProfileEdit({ navigation, route }) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [male, onChangeMale] = useState(false);
  const [gender, onchangeGender] = useState("");
  const [female, onChangeFemale] = useState(false);
  const [other, onChangeOther] = useState(false);
  const [age, onChangeAge] = useState();
  const [height, onChangeHeight] = useState("");
  const [weight, onChangeWeight] = useState("");
  const [nickname, onChangeNickname] = useState();
  const [reach, onChangeReach] = useState();
  const [wins, onChangeWins] = useState();
  const [losses, onChangeLosses] = useState();
  const [KOs, onChangeKOs] = useState();
  const [totalFights, onChangeTotalFihts] = useState();
  const [style, onChangeStyle] = useState();
  const [bio, onChangeBio] = useState();
  const [loading, setLoad] = React.useState(false);
  const [haserorr, setErorrs] = React.useState(false);

  const genderMale = () => {
    onChangeMale(true);
    onChangeFemale(false);
    onChangeOther(false);
    onchangeGender("male");
  };
  const genderFemale = () => {
    onChangeMale(false);
    onChangeFemale(true);
    onChangeOther(false);
    onchangeGender("female");
  };
  const genderOther = () => {
    onChangeMale(false);
    onChangeFemale(false);
    onChangeOther(true);
    onchangeGender("other");
  };
  const LoadData = async () => {
    const token = route.params.paramKey;
    console.log(token);
    const headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
    };
    const baseURL = "https://only-hands.herokuapp.com/api";
    axios
      .get(baseURL + "/profile/", {
        headers: headers,
      })
      .then(function (response) {
        console.log("response is " + JSON.stringify(response.data.profile));
        onChangeFirstName(response.data.profile.firstName);
        onChangeLastName(response.data.profile.lastName);
        const g = response.data.profile.gender;
        console.log(g);
        if (g === "male") {
          genderMale();
        } else if (g === "female") {
          genderFemale();
        } else {
          genderOther();
        }
        onChangeAge(response.data.profile.age.toString());
        onChangeHeight(response.data.profile.height);
        onChangeWeight(response.data.profile.weight.toString());
        onChangeNickname(response.data.profile.nickname);
        onChangeReach(response.data.profile.reach);
        onChangeWins(response.data.profile.wins.toString());
        onChangeLosses(response.data.profile.losses.toString());
        onChangeKOs(response.data.profile.KOs.toString());
        onChangeTotalFihts(response.data.profile.totalFights.toString());
        onChangeStyle(response.data.profile.style.toString());
        onChangeBio(response.data.profile.bio.toString());
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {});
  };
  const Edit = async () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      reach: reach,
      wins: wins,
      losses: losses,
      KOs: KOs,
      totalFights: totalFights,
      nickname: nickname,
      bio: bio,
      style: style,
    };
    const token = route.params.paramKey;

    setLoad(true);
    console.log(token);
    const headers = {
      "x-access-token": token,
      "Content-Type": "application/json",
    };
    try {
      const baseURL = "https://only-hands.herokuapp.com";
      const response = await axios.put(baseURL + "/api/profile/", payload, {
        headers: headers,
      });
      console.log(response);
      navigation.navigate("Home", { paramKey: token });
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <SafeAreaView style={styles.saveArea}>
      <Loader visible={loading} />
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={require("../assets/pexels1.jpg")}
      >
        <ScrollView style={styles.scroll}>
          <TouchableOpacity>
            <View style={styles.profilePicture}>
              <Text style={styles.profilePictureText}>
                Upload profile Picture
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoText}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.profileInfoText}>
              {wins} - {losses}
            </Text>
          </View>

          <View style={styles.fillInContainer}>
            <TextInput
              mode="flat"
              label={"First Name"}
              error={haserorr}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeFirstName}
              value={firstName}
            ></TextInput>

            <TextInput
              mode="flat"
              label={"Last Name"}
              error={haserorr}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeLastName}
              value={lastName}
            ></TextInput>

            <View style={styles.genderOpt}>
              <View style={styles.genderCheckBox}>
                <CheckBox
                  title="Male"
                  checked={male}
                  center
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onPress={genderMale}
                  containerStyle={{
                    borderRadius: 9,
                    borderWidth: 0,
                    height: 40,
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                  size={20}
                  textStyle={{ color: "white" }}
                  checkedColor="red"
                />
              </View>

              <View style={styles.genderCheckBox}>
                <CheckBox
                  title="Female"
                  checked={female}
                  center
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onPress={genderFemale}
                  containerStyle={{
                    borderRadius: 9,
                    borderWidth: 0,
                    height: 40,
                    width: 110,
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                  size={20}
                  textStyle={{ color: "white" }}
                  checkedColor="red"
                />
              </View>

              <View style={styles.genderCheckBox}>
                <CheckBox
                  style={styles.genderCheckBox}
                  title="Other"
                  checked={other}
                  center
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onPress={genderOther}
                  containerStyle={{
                    borderRadius: 9,
                    borderWidth: 0,
                    height: 40,
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                  textStyle={{ color: "white" }}
                  size={20}
                  checkedColor="red"
                />
              </View>
            </View>

            <View style={styles.AHW}>
              <TextInput
                mode="flat"
                label={"Age"}
                keyboardType="decimal-pad"
                error={haserorr}
                textColor="white"
                underlineColor="black"
                activeUnderlineColor="white"
                style={styles.AHWInput}
                onChangeText={onChangeAge}
                value={age}
              ></TextInput>

              <TextInput
                mode="flat"
                label={"Height"}
                error={haserorr}
                textColor="white"
                underlineColor="black"
                activeUnderlineColor="white"
                style={styles.AHWInput}
                onChangeText={onChangeHeight}
                value={height}
              ></TextInput>

              <TextInput
                mode="flat"
                label={"Weight"}
                error={haserorr}
                textColor="white"
                underlineColor="black"
                activeUnderlineColor="white"
                style={styles.AHWInput}
                onChangeText={onChangeWeight}
                keyboardType="decimal-pad"
                value={weight}
              ></TextInput>
            </View>

            <TextInput
              mode="flat"
              label={"Nickname"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeNickname}
              value={nickname}
            ></TextInput>

            <TextInput
              mode="flat"
              label={"Reach"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              keyboardType="decimal-pad"
              onChangeText={onChangeReach}
              value={reach}
            ></TextInput>

            <View style={styles.Record}>
              <TextInput
                mode="flat"
                label={"Wins"}
                textColor="white"
                underlineColor="black"
                activeUnderlineColor="white"
                style={styles.RecordInput}
                keyboardType="decimal-pad"
                onChangeText={onChangeWins}
                value={wins}
              ></TextInput>

              <TextInput
                mode="flat"
                label={"Losses"}
                textColor="white"
                underlineColor="black"
                activeUnderlineColor="white"
                keyboardType="decimal-pad"
                style={styles.RecordInput}
                onChangeText={onChangeLosses}
                value={losses}
              ></TextInput>
            </View>

            <TextInput
              mode="flat"
              label={"KO's"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              keyboardType="decimal-pad"
              onChangeText={onChangeKOs}
              value={KOs}
            ></TextInput>

            <TextInput
              mode="flat"
              label={"Total Fights"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeTotalFihts}
              keyboardType="decimal-pad"
              value={totalFights}
            ></TextInput>

            <TextInput
              mode="flat"
              label={"Fighting style"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.fillIn}
              onChangeText={onChangeStyle}
              value={style}
            ></TextInput>

            <TextInput
              mode="flat"
              label={"Bio"}
              textColor="white"
              underlineColor="black"
              activeUnderlineColor="white"
              style={styles.bio}
              onChangeText={onChangeBio}
              value={bio}
              multiline={true}
              ellip
            ></TextInput>
          </View>

          <TouchableOpacity onPress={Edit}>
            <View style={styles.saveButtonView}>
              <Text style={styles.saveButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AHW: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: 300,
  },

  AHWInput: {
    placeholderTextColor: "black",
    borderWidth: 1.8,
    flex: 1,
    textAlign: "center",
    height: 40,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1.8,
    fontWeight: "600",
    fontSize: "14",
    color: "white",
  },

  bgImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  bio: {
    width: 300,
    height: 100,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    top: 30,
    bottom: 30,
    marginBottom: 20,
    flex: 1,
    borderRadius: 15,
    //textAlign: 'center',
    borderColor: "white",
    borderWidth: 1.8,
    textAlignVertical: "top",
    padding: 10,
    color: "white",
    fontSize: "14",
    fontWeight: "600",
  },

  counter: {
    marginBottom: 0,
    fontWeight: "bold",
  },

  fillInContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  fillIn: {
    width: 300,
    height: 40,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1.8,
    placeholderTextColor: "black",
    fontWeight: "600",
    fontSize: "14",
    color: "white",
  },

  genderOpt: {
    width: 300,
    height: 45,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    top: 30,
    marginBottom: 45,
    flexDirection: "row",
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "space-between",
    borderColor: "white",
    paddingLeft: 5,
    borderWidth: 1.8,
  },

  genderCheckBox: {
    width: 101,
    flex: 1,
    //borderWidth:1.5,
    justifyContent: "center",
    alignItems: "center",
  },

  profilePicture: {
    //on press we will open gallery and user can upload his picture
    width: 120,
    height: 120,
    left: 15,
    top: 15,
    borderRadius: 60,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: "1.8",
  },

  profileInfo: {
    flex: 1,
    width: 230,
    height: 55,
    right: 15,
    top: 15,
    alignSelf: "flex-end",
    flexDirection: "column",
    marginTop: -80,
    marginBottom: 50,
    textAlign: "center",
    alignItems: "center",
  },

  profileInfoText: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    fontWeight: "600",
    fontSize: "30",
    color: "white",
    textShadowColor: "#00454f",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },

  profilePictureText: {
    textAlign: "center",
    top: 2,
    color: "white",
  },

  Record: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: 300,
  },

  RecordInput: {
    placeholderTextColor: "black",
    borderWidth: 1.8,
    flex: 1,
    textAlign: "center",
    height: 40,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1.8,
    fontWeight: "600",
    fontSize: "14",
    color: "white",
  },

  saveArea: {
    backgroundColor: "black",
  },

  scroll: {
    width: "100%",
  },

  saveButtonView: {
    width: 120,
    height: 40,
    backgroundColor: "#009bb0",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    bottom: 15,
    borderRadius: 15,
    backgroundColor: "#ff0011",
  },

  saveButtonText: {},
});

export default ProfileEdit;

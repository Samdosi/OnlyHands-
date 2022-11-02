import React, { useState } from "react";
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
  TextInput,
} from "react-native";
import { CheckBox } from "react-native-elements";

function ProfileScreen(props) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [male, onChangeMale] = useState(false);
  const [female, onChangeFemale] = useState(false);
  const [other, onChangeOther] = useState(false);
  const [age, onChangeAge] = useState("");
  const [height, onChangeHeight] = useState("");
  const [weight, onChangeWeight] = useState("");
  const [nickname, onChangeNickname] = useState("");
  const [reach, onChangeReach] = useState("");
  const [wins, onChangeWins] = useState("");
  const [losses, onChangeLosses] = useState("");
  const [KOs, onChangeKOs] = useState("");
  const [totalFights, onChangeTotalFihts] = useState("");
  const [style, onChangeStyle] = useState("");
  const [bio, onChangeBio] = useState("");

  const genderMale = () => {
    onChangeMale(true);
    onChangeFemale(false);
    onChangeOther(false);
  };
  const genderFemale = () => {
    onChangeMale(false);
    onChangeFemale(true);
    onChangeOther(false);
  };
  const genderOther = () => {
    onChangeMale(false);
    onChangeFemale(false);
    onChangeOther(true);
  };

  return (
    <SafeAreaView style={styles.saveArea}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={require("./assets/back.jpg")}
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
              style={styles.fillIn}
              onChangeText={onChangeFirstName}
              placeholder="First Name"
              placeholderTextColor="#5e5e61"
              value={firstName}
            ></TextInput>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeLastName}
              placeholder="Last Name"
              placeholderTextColor="#5e5e61"
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
                    width: 100,
                    left: 1,
                    backgroundColor: "#e1e3e6",
                  }}
                  size={20}
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
                  containerStyle={{ width: 110, backgroundColor: "#e1e3e6" }}
                  size={20}
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
                  containerStyle={{ backgroundColor: "#e1e3e6" }}
                  size={20}
                />
              </View>
            </View>

            <View style={styles.AHW}>
              <TextInput
                style={styles.AHWInput}
                onChangeText={onChangeAge}
                placeholder="Age"
                placeholderTextColor="#5e5e61"
                value={age}
              ></TextInput>

              <TextInput
                style={styles.AHWInput}
                onChangeText={onChangeHeight}
                placeholder="Height"
                placeholderTextColor="#5e5e61"
                value={height}
              ></TextInput>

              <TextInput
                style={styles.AHWInput}
                onChangeText={onChangeWeight}
                placeholder="Weight"
                placeholderTextColor="#5e5e61"
                value={weight}
              ></TextInput>
            </View>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeNickname}
              placeholder="Nickname"
              placeholderTextColor="#5e5e61"
              value={nickname}
            ></TextInput>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeReach}
              placeholder="Reach"
              placeholderTextColor="#5e5e61"
              value={reach}
            ></TextInput>

            <View style={styles.Record}>
              <TextInput
                style={styles.RecordInput}
                onChangeText={onChangeWins}
                placeholder="Wins"
                placeholderTextColor="#5e5e61"
                value={wins}
              ></TextInput>

              <TextInput
                style={styles.RecordInput}
                onChangeText={onChangeLosses}
                placeholder="Losses"
                placeholderTextColor="#5e5e61"
                value={losses}
              ></TextInput>
            </View>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeKOs}
              placeholder="KO's"
              placeholderTextColor="#5e5e61"
              value={KOs}
            ></TextInput>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeTotalFihts}
              placeholder="Total Fights"
              placeholderTextColor="#5e5e61"
              value={totalFights}
            ></TextInput>

            <TextInput
              style={styles.fillIn}
              onChangeText={onChangeStyle}
              placeholder="Fighting style"
              placeholderTextColor="#5e5e61"
              value={style}
            ></TextInput>

            <TextInput
              style={styles.bio}
              onChangeText={onChangeBio}
              placeholder="Bio"
              placeholderTextColor="#5e5e61"
              value={bio}
              multiline={true}
              ellip
            ></TextInput>
          </View>

          <TouchableOpacity>
            <View style={styles.saveButtonView}>
              <Text style={styles.saveButtonText}>Save</Text>
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
    height: 60,
    backgroundColor: "#e1e3e6",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1.8,
    fontWeight: "600",
    fontSize: "14",
  },

  bgImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  bio: {
    width: 300,
    height: 100,
    backgroundColor: "#e1e3e6",
    top: 30,
    bottom: 30,
    marginBottom: 20,
    flex: 1,
    borderRadius: 15,
    //textAlign: 'center',
    borderColor: "black",
    borderWidth: 1.8,
    textAlignVertical: "top",
    padding: 5,
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
    height: 60,
    backgroundColor: "#e1e3e6",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1.8,
    placeholderTextColor: "black",
    fontWeight: "600",
    fontSize: "14",
  },

  genderOpt: {
    width: 300,
    height: 60,
    backgroundColor: "#e1e3e6",
    top: 30,
    marginBottom: 45,
    flexDirection: "row",
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "space-between",
    borderColor: "black",

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
    backgroundColor: "#989a9e",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "black",
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
    color: "#009bb0",
    textShadowColor: "#00454f",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },

  profilePictureText: {
    textAlign: "center",
    top: 2,
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
    height: 60,
    backgroundColor: "#e1e3e6",
    top: 30,
    marginBottom: 45,
    flex: 1,
    borderRadius: 15,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1.8,
    fontWeight: "600",
    fontSize: "14",
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
  },

  saveButtonText: {},
});

export default ProfileScreen;

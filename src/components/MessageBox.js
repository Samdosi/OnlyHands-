import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

const MessageBox = (props) => {

  const navigation = useNavigation();
  const renderUserStatus = () => {
    if (props.online) {
      return {
        height: 20,
        width: 20,
        borderRadius: 20,
        backgroundColor: "limegreen",
        marginLeft: -12,
        marginTop: 30,
      };
    }
  };

  const renderMessageStatus = () => {
    const t = 1;

    if (t > 0) {
      return {
        height: "100%",
        width: "100%",
        borderRadius: 100,
        backgroundColor: "#ff405b",
        alignItems: "center",
        justifyContent: "center",
      };
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        if (props.status != false) {
          navigation.navigate("MessageScreen", { paramKey: props });
        }
      }}
    >
      <View style={styles.mainView}>
        <View style={styles.pictureView}>
          <Image
            //source={ uri: profilePicture }}
            style={styles.profilePicture}
          ></Image>

          <View style={renderUserStatus()}></View>
        </View>

        <View style={styles.nonImage}>
          <View style={styles.nameView}>
            <Text style={styles.name}>{props.name}</Text>

            {props.status === false && (
              <Text style={styles.pending}> Pending Match </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignContent: "center",
    margin: 20,
  },

  pictureView: {
    flexDirection: "row",
    width: 60,
    height: 60,
  },

  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },

  nonImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
  },

  nameView: {
    flex: 1,
    justifyContent: "flex-end",
  },

  name: {
    fontSize: 20,
    color: "white",
  },

  pending: {
    color: "white",
  }
});

export default MessageBox;
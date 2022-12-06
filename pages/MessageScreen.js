import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { React, useState, useEffect } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import io from "socket.io-client";

function MessageScreen({ navigation, route }) {
    const params = route.params.paramKey;

    console.log("token", params.token);

    console.log("my id", params.profileSelfID);

    console.log("other id", params.profileID);

  const profileID = params.profileSelfID;

  const [messages, addMessage] = useState([]);

  const [message, setMessage] = useState("");

  const socket = io("http://only-hands.herokuapp.com");

  /*seEffect(() => {
      socket.on("receiveMessage", (data) => {
          setMessageList((list) => [...list, data]);
      });
  }, [socket]);


  useEffect(() => {
    if (profileID) {
      socket.emit("joinRoom", params.matchID);
    }

      fetch("https://only-hands.herokuapp.com/api/chat/" + params,
          {
              headers: {
                  "x-access-token": sessionStorage.getItem("token")
              }
          })
          .then(response => {
              if (response.status != 401 && response.status != 302) {
                  return response.json();
              }
          })
          .then(data => {
              if (data.success) {
                  addMessage([...data.chats]);
              }
          })
          .catch(e => console.log(e));

          setMessage("");
  }, [message]);*/

  const alignMessage = (id2) => {
    console.log(id.localeCompare(id2));

    if (id.localeCompare(id2) == 0) {
      return {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
      };
    } else {
      return {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 20,
      };
    }
  };

  const styleLayout = (id2) => {
    console.log(id.localeCompare(id2));

    if (id.localeCompare(id2) == 0) {
      return {
        height: 50,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "azure",
      };
    } else {
      return {
        height: 50,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#bbf7d0",
      };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileView}>
        <Image
          style={styles.profilePicture}
          source={require("../assets/pexels-cottonbro-4761792.jpg")}
        ></Image>

              <Text style={styles.name}>{params.name}</Text>
      </View>

      <ScrollView>
        {messages.map((c) => (
          <View style={alignMessage(c.id)}>
            <View style={styleLayout(c.id)}>
              <Text style={styles.messageText}>testing</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sendContainer}>
        <View style={styles.sendView}>
          <TextInput
            style={styles.input}
            onChangeText={(input) => setMessage(input)}
            placeholder="Type a message"
          />

          <View style={styles.sendButton}>
            <TouchableOpacity>
              <Icon name={"send-outline"} size={40} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "rgb(37, 37, 37)",
    flex: 1,
  },

  profileView: {
    flexDirection: "row",
  },

  profilePicture: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 20,
  },

  name: {
    marginTop: 15,
    fontSize: 30,
    color: "white",
  },

  messageText: {
    fontSize: 20,
  },

  sendContainer: {
    height: 100,
    width: "100%",
    justifyContent: "flex-end"
  },

  sendView: {
    flexDirection: "row",
    height: 80,
    width: "100%",
  },

  input: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    fontSize: 30,
    padding: 5,
    color: "white",
  },

  sendButton: {
    flex: 1,
    height: 80,
    width: "30%",
    paddingTop: 5,
    paddingLeft: 15,
  },
});

export default MessageScreen;
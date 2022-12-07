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
import { React, useState, useEffect, useRef } from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import io from "socket.io-client";
import axios from "axios";

function MessageScreen({ navigation, route }) {
  const params = route.params.paramKey;
  console.log(params);
  console.log("token", params.token);
  const scrollViewRef = useRef();
  console.log("my id", params.matchID);

  console.log("other id", params.profileID);

  const profileID = params.profileSelfID;
  const matchId = params.matchID;
  const token = params.token;
  const pic = params.profilePicture;
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [prevScroll, setPrevScroll] = useState(0);
  const scrollRef = useRef(null);

  const socket = io("http://only-hands.herokuapp.com");

  const load = async () => {
    console.log("match id is ", matchId);
    try {
      const baseURL = "https://only-hands.herokuapp.com/api/chat/";
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.get(baseURL + matchId, {
        headers: headers,
      });
      console.log("response ", response);
      setMessages(response.data.chats);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (profileID) {
      socket.emit("joinRoom", matchId);
      load();
    }
  }, [profileID]);

  const alignMessage = (id2) => {
    if (profileID == id2) {
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
  
  const avatarImages = [
    require("../assets/Avatars/1.jpg"),
    require("../assets/Avatars/2.jpg"),
    require("../assets/Avatars/3.jpg"),
    require("../assets/Avatars/4.jpg"),
    require("../assets/Avatars/5.jpg"),
  ];
  
  const sendMessage = async () => {
    if (message) {
      const messageData = {
        room: matchId,
        from: profileID,
        text: message,
        timeSent:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setMessages((list) => [...list, messageData]);
      setMessage("");
    }
  };
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);
  const styleLayout = (id2) => {
    if (profileID == id2) {
      return {
        height: 40,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "azure",
        right: 7,
      };
    } else {
      return {
        height: 40,
        padding: 5,
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: "#bbf7d0",
        left: 7
      };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.profileView}>
        <View style={{top:3,left:5}}>
          <Image
            style={styles.profilePicture}
            source={pic ? avatarImages[pic - 1] : avatarImages[1]}
          ></Image>
        </View>
        

        <Text style={styles.name}>{params.name}</Text>
      </View>
      <View style={{height:'79%',backgroundColor:'#35373b'}}>

        <ScrollView contentContainerStyle={{backgroundColor:"#35373b"}}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.map((c) => (
            <View style={alignMessage(c.from)}>
              <View style={styleLayout(c.from)}>
                <Text style={styles.messageText}>{c.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

      </View>
      

      <View style={styles.sendContainer}>
        <View style={styles.sendView}>
          <TextInput
            style={styles.input}
            onChangeText={(input) => setMessage(input)}
            placeholder="Type a message"
            value={message}
            placeholderTextColor={'white'}

          />

          <View style={styles.sendButton}>
            <TouchableOpacity onPress={sendMessage}>
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
    height:65,
    backgroundColor:'rgb(37, 37, 37)',
    borderTopWidth:1
  },

  profilePicture: {
   // marginTop: 10,
    alignSelf:'center',
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 20,
  },

  name: {
    marginTop: 15,
    fontSize: 30,
    color: "white",
    fontWeight:'500'
  },

  messageText: {
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap'
  },

  sendContainer: {
    
    height: 100,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor:"rgb(37, 37, 37)"
  },

  sendView: {
    flexDirection: "row",
    height: 80,
    width: "100%",
  },

  input: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderColor: "white",
    fontSize: 15,
    fontWeight:'300',
    //opacity:0.5,
    padding: 5,
    color: "white",
    left:15,
    borderRadius:5,
    backgroundColor:'#35373b'
  },

  sendButton: {
    flex: 1,
    height: 80,
    width: "30%",
    paddingTop: 5,
    paddingLeft: 25,
  },
});

export default MessageScreen;

import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    Text,
    Button
} from "react-native";
import { React, useState } from "react";

import Message from "../src/components/Message";

import axios from "axios";

function ChatScreen() {
    const [messages, setMessages] = useState([{image: "", status: "", name: "", message: "", numMessages: "", timestamp: ""}]);

    const addNew = async(props) => {
        setMessages((prevMessages) => {
            return [
                {message: props.message, timestamp: 123},
                ...prevMessages
            ];
        })
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                style={styles.background}
                source={require("../assets/pexels-cottonbro-4761792.jpg")} //replace this.
            >
                <View style={styles.mainView} onLayout={() => addNew({ message: "123", timestamp: "123" })}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => ( //if messages are available.
                            <Message message={item.message} timestamp = {item.timestamp}/>
                        )}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "black",
        flex: 1,
    },

    background: {
        width: "100%",
        height: "100%",
    },

    mainView: {
        marginTop: 50,
        alignItems: "center",
    },

    text: {
        color: "white",
        fontSize: 20
    }
});

export default ChatScreen;

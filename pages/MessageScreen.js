import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text
} from "react-native";
import { React, useState} from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//import io from "socket.io-client";

function MessageScreen(props) {
    const messages = [{ id: "123", text: "21312312345" }, { id: "432", text: "123123" }];

    const [message, setMessage] = useState();

    const id = "432";

    const submit = () => {
        messages.push({ id: id, text: message });

        console.log(messages);
        setMessage("");
    };

    const alignMessage = (id2) => {
        console.log(id.localeCompare(id2));

        if (id.localeCompare(id2) == 0) {
            return {
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
            }
        }
        else {
            return {
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                marginTop: 20,
            }
        }
    };

    const styleLayout = (id2) => {
        console.log(id.localeCompare(id2));

        if (id.localeCompare(id2) == 0) {
            return {
                height: 60,
                padding: 10,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "azure"
            }
        }
        else {
            return {
                height: 60,
                padding: 10,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: "aqua"
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.profileView}>
                <Image style={styles.profilePicture} source={require("../assets/pexels-cottonbro-4761792.jpg")}></Image>

                <Text style={styles.name}></Text>
            </View>

            <ScrollView>
                {messages.map(c => (
                    <View style={alignMessage(c.id)}>
                        <View style={styleLayout(c.id)}>
                            <Text style={styles.messageText}>{c.text}</Text>
                        </View>
                    </View>
                    ))
                }
            </ScrollView>

            <View style={styles.sendContainer}>
                <View style={styles.sendView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(input) => setMessage(input)}
                    ></TextInput>

                    <View style={styles.sendButton}>
                        <TouchableOpacity onPress={() => submit()}>
                            <Icon
                                name={"send-outline"}
                                size={60}
                                color={"white"}
                            />
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
        flex: 1
    },

    profileView: {
        flexDirection: "row"
    },

    profilePicture: {
        marginTop: 10,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 60,
        marginRight: 20
    },

    name: {
        marginTop: 15,
        fontSize: 30,
        color: "white"
    },

    messageText: {
        fontSize: 20
    },

    sendContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },

    sendView: {
        flexDirection: "row",
        height: 80,
        width: "100%"
    },

    input: {
        height: 80,
        width: "80%",
        borderWidth: 1,
        borderColor: "white",
        fontSize: 30,
        padding: 5,
        color: "white"
    },

    sendButton: {
        flex: 1,
        height: 80,
        width: "30%",
        padding: 10
    }
});

export default MessageScreen;

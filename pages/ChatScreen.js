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

function ChatScreen() {
    const [messages, setMessages] = useState([{ id: "", status: "" }]);

    const addNew = () => {
        setMessages((prevMessages) => {
            return [
                { id: "123", status: "123" },
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
                <View style={styles.mainView}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{item.id}</Text>
                        )}
                    />
                </View>

                <Button
                    onPress={() => addNew()}
                    title= "test"
                />
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
        alignItems: "center"
    },

    text: {
        color: "white",
        fontSize: 20
    }
});

export default ChatScreen;

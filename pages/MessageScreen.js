import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";
import { React, useState } from "react";

import ProfileBox from "../src/components/ProfileBox";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MessageScreen(props) {
    const [outlineColor, setColor] = useState();

    const sumbit = () =>{
        alert("react native is gay");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <ProfileBox />
                <View style={styles.messageView}>
                    <TextInput style={styles.input}></TextInput>
                    <Icon
                        name={"send-outline"}
                        style={styles.icon}
                        onPress={() => submit}>
                    </Icon>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "black",
        flex: 1,
    },

    mainView: {
        justifyContent: "space-between"  

    },

    messageView: {
        flex: 1,
        flexDirection: "row",
        padding: 20
    },

    input: {
        height: 40,
        width: "100%"
    },

    icon: {
        height: "100%",
        width: "100%"
    }

});

export default MessageScreen;

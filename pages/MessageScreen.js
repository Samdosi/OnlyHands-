import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    Text,
    Button,
    TextInput,
    ScrollView
} from "react-native";
import { React, useState } from "react";

import ProfileBox from "../src/components/ProfileBox";

function MessageScreen(props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <ProfileBox/>
                <MesssageInput/>
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
});

export default MessageScreen;

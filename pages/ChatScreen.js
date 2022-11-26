import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    Text,
    Button,
    ScrollView
} from "react-native";
import { React, useState} from "react";

import MessageBox from "../src/components/MessageBox";

import axios from "axios";

function ChatScreen({navigation}) {
    const sampleProfile = {
        //image: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/80192852_2792338754158050_862576909328842752_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xHnC3p2bApkAX_oVn2H&_nc_ht=scontent-atl3-2.xx&oh=00_AT9g8gsztIqIlQsmK1w1zZAf_0zQlKDOUAszw2_RaSCOGQ&oe=63783BCD",
        image: "../assets/pexels-cottonbro-4761792.jpg",
        status: "online",
        name: "name",
        message: "message",
        numMessages: "3",
        timestamp: "2:13 AM"
    }

    const profiles = [sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile,]; //flatlist.

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground style={styles.background} source={require("")}>
                <ScrollView style={styles.mainView}>
                    {profiles.map(c => (
                        <MessageBox
                            image={c.image}
                            status={c.status}
                            name={c.name}
                            message={c.message}
                            numMessages={c.numMessages}
                            timestamp={c.timestamp}
                            navigation={navigation}
                            dest="MessageScreen"
                        />
                    ))
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "black",
        flex: 1,
    },

    mainView: { //image here.
        backgroundColor: "white",
        marginTop: 50
    },

    text: {
        color: "white",
        fontSize: 20
    }
});

export default ChatScreen;

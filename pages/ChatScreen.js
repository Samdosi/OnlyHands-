import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text
} from "react-native";
import { React, useState} from "react";

import MessageBox from "../src/components/MessageBox";

import axios from "axios";

function ChatScreen({navigation}) {
    const sampleProfile = {
        //image: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/80192852_2792338754158050_862576909328842752_n.png?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xHnC3p2bApkAX_oVn2H&_nc_ht=scontent-atl3-2.xx&oh=00_AT9g8gsztIqIlQsmK1w1zZAf_0zQlKDOUAszw2_RaSCOGQ&oe=63783BCD",
        image: "../assets/pexels-cottonbro-4761792.jpg",
        status: true,
        name: "name",
        message: "message",
        numMessages: 3,
        timestamp: "2:13 AM"
    }

    const profiles = [sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile, sampleProfile,]; //flatlist.

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <Text style={styles.title}>Messages</Text>

                <ScrollView style={styles.list}>
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "rgb(37, 37, 37)",
        flex: 1,
    },

    title: {
        color: "#ff405b",
        fontStyle: "bold",
        fontSize: 30,
        marginLeft: 40
    },

    mainView: {
        backgroundColor: "rgb(37, 37, 37)",
        marginTop: 20,
    },

    text: {
        color: "white",
        fontSize: 20
    }
});

export default ChatScreen;

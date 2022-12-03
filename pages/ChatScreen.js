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

import Input from "../src/components/Input";

import axios from "axios";

//add search bar for the chat.

function ChatScreen({ navigation, paramKey }) {

    const [profiles, setProfiles] = useState([]);

    const [messageList, setMessageList] = useState([]);

    const [profilePicture, setProfilePicture] = useState();

    const baseURL = "https://only-hands.herokuapp.com";

    //const matchID = ;

    const requestMatchInfo = async () => {
        const payload = {
            headers: {
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3ZDFlNTA2YmEyZmJkMDA3MmRmMzc3IiwiaWF0IjoxNjcwMDUxMDA0LCJleHAiOjE2NzAwNTQ2MDR9.fVZRQeyEFra7wSTmyIB40YG2h7XzZ5aa7cXLG55XsLM"
            },
        };

        try {
            const response = await axios.get(
                baseURL + "/api/match/",
                payload
            );

            const data = response.data.matches;

            setProfiles(data);

        } catch (error) {
            console.log(error.response.data);
        }
    };

    const requestContacts = async (matchId) => {
        const payload = {
            headers: {
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3ZDFlNTA2YmEyZmJkMDA3MmRmMzc3IiwiaWF0IjoxNjcwMDUxMDA0LCJleHAiOjE2NzAwNTQ2MDR9.fVZRQeyEFra7wSTmyIB40YG2h7XzZ5aa7cXLG55XsLM"
            },
        };

        try {
            const response = await axios.get(
                baseURL + "/api/match/:" + matchId,
                payload
            );

            console.log(response);

        } catch (error) {
            console.log("penis");
            console.log(error.response.data);
        }
    };
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView} onLayout={() => requestMatchInfo()}>
                <Text style={styles.title}>Messages</Text>

                <View style={styles.searchBox}>
                    <Input
                        label="Search"
                        placeholder="Enter your social security"
                        iconName={"magnify"}
                        color="white"
                    />
                </View>

                <ScrollView>
                    {profiles.map(c => (
                        <MessageBox
                            name={c.firstName + " " + c.lastName}
                            profileID={c.profileID}
                            online={c.online}
                            profilePicture={profilePicture}
                            messages={requestContacts(c.matchId)}
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

    searchBox: {
        margin: 10
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

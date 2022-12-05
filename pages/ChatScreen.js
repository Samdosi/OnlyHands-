import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    Text
} from "react-native";
import { React, useState, useEffect} from "react";

import MessageBox from "../src/components/MessageBox";

import Input from "../src/components/Input";

import axios from "axios";

import io from "socket.io-client";

//add search bar for the chat.

function ChatScreen({ navigation, paramKey, profileID }) {

    alert(paramKey);

    //console.a (profileID);

    const [matched, setMatched] = useState([]);

    const [unmatched, setUnmatched] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    const [profilePicture, setProfilePicture] = useState();

    const baseURL = "https://only-hands.herokuapp.com";

    const requestMatchInfo = async () => {
        const payload = {
            headers: {
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3ZDFlNTA2YmEyZmJkMDA3MmRmMzc3IiwiaWF0IjoxNjcwMjY1MDA2LCJleHAiOjE2NzAyNjg2MDZ9.2PG-Jv0zMserCEbhZDQxnBxXpAIQriK3N0IoA5IYpyM"
            }
        };

        try {
            const response = await axios.get(
                baseURL + "/api/match?searchQuery=" + searchValue,
                payload
            );

            const data = response.data.matches;

            let m = [];

            let u = [];

            data?.forEach(e => {
                if (e.isComplete) m.push(e)
                else u.push(e)
            })

            setMatched(m);

            setUnmatched(u);

        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        requestMatchInfo();
    }, [searchValue])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.mainView}>
                <Text style={styles.title}>Messages</Text>

                <View style={styles.searchBox}>
                    <Input
                        label="Search"
                        placeholder="Enter the name"
                        iconName={"magnify"}
                        color="white"
                        placeholderColor= "white"
                        value={searchValue}
                        onChangeText={setSearchValue}
                    />
                </View>

                <ScrollView>
                    {matched.map(c => {
                        console.log(c)
                        return (<MessageBox
                            name={c.firstName + " " + c.lastName}
                            profileID={c.profileId}
                            matchID={c.matchId}
                            online={c.online}
                            profilePicture={profilePicture}
                            navigation={navigation}
                        />)
                    })
                    }

                    {unmatched.map(c => (
                        <MessageBox
                            name={c.firstName + " " + c.lastName}
                            profileID={c.profileId}
                            matchID={c.matchId}
                            status={false}
                            online={c.online}
                            profilePicture={profilePicture}
                            navigation={navigation}
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
        marginLeft: 10
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

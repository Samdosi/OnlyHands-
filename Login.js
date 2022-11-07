import { ImageBackground, Image, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';

import { React, useState } from "react";

import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const image = {
    uri: "https://media.discordapp.net/attachments/1026860161807167549/1034257278615961651/pexels-cottonbro-4761792.jpg?width=447&height=670",
};

function App() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [status = true, assert] = useState();
    const [color = "white", setColor] = useState();
    const [userAlert, setUserAlert] = useState();
    const [passAlert, setPassAlert] = useState();

    const errorHandler = () => {
        setColor("red");
        setUserAlert("Invalid Username");
        setPassAlert("Invalid Password");
    }

    const login = async () => {
        const payload = {
            username: username,
            password: password
        };

        try {
            const baseURL = "https://only-hands.herokuapp.com";

            const response = await axios.post(baseURL + "/api/user/login/", payload);
            //console.log("good");
        }
        catch (error) {
            console.log(error.response.data);
            errorHandler();
        }
    };

    return (
        <ImageBackground source={image} style={styles.background}>
            <Text style={styles.title}>Login</Text>

            <Text style={styles.message}>Username</Text>

            <View style={styles.userNameContainer}>
                <View style={styles.rightBorder} borderColor={color}>
                    <Icon name="account-circle" color="white" size={30}></Icon>
                </View>

                <TextInput
                    style={styles.input}
                    borderColor={color}
                    color="white"
                    placeholder="Enter your Username"
                    placeholderTextColor="gray"
                    onChangeText={input => setUsername(input)}

                    
                />

                <View style={styles.leftBorder} borderColor = {color}>
                    <Image style={styles.pad}></Image>
                </View>
            </View>

            <View style={styles.alertContainer}>
                <Text style={styles.alertText}>{userAlert}</Text>
            </View>

            <Image style={styles.margin}></Image>

            <Text style={styles.message}>Password</Text>

            <View style={styles.passwordContainer}>
                <View style={styles.rightBorder} borderColor={color}>
                    <Icon name="lock-outline" color="white" size={30}></Icon>
                </View>

                <TextInput
                    style={styles.input}
                    borderColor={color}
                    color="white"
                    placeholder="Enter your Password"
                    placeholderTextColor="gray"
                    secureTextEntry={status}
                    onChangeText={input => setPassword(input)}
                />

                <View style={styles.leftBorder} borderColor={color}>
                    <TouchableOpacity onPressIn={() => { assert(false)}} onPressOut={() => {assert(true)}}>
                        <Icon name="eye-outline" color="white" size={30}></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.alertContainer}>
                <Text style={styles.alertText}>{passAlert}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {login()}}>
                    <View style={styles.buttonView}>
                        <Text style={styles.text}>SIGN IN</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.redirectContainer}>
                <Text style={styles.redirectText}>Forgot Username or Password?</Text>

                <View style={styles.linkContainer}>
                    <Text style={styles.redirectText}>Click Here: </Text>

                    <Text style={styles.link}>Reset Account</Text>
                </View>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        height: 1000,
        width: 420
    },

    title: {
        marginTop: 25,
        marginLeft: 25,
        marginBottom: 80,
        fontSize: 50,
        fontStyle: "bold",
        color: "white"
    },

    message: {
        marginTop: 20,
        marginLeft: 32,
        fontSize: 20,
        fontStyle: "bold",
        color: "grey"
    },

    userNameContainer: {
        marginTop: 25,
        marginBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    passwordContainer: {
        marginTop: 25,
        marginBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    alertContainer: {
        marginLeft: 32
    },

    buttonContainer: {
        marginTop: 160,
        alignItems: "center"
    },

    redirectContainer: {
        margin: 50,
        alignItems: "center"
    },

    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    input: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        height: 59,
        width: 240,
    },

    pad: {
        padding: 15.2
    },

    margin: {
        marginTop: 50
    },

    rightBorder: {
        borderWidth: 1,
        borderRightWidth: 0,
        padding: 13.1
    },

    leftBorder: {
        borderWidth: 1,
        borderLeftWidth: 0,
        padding: 13.1
    },

    button: {
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        width: 350,
        backgroundColor: "red"
    },

    buttonView: {
        margin: 10,
        alignItems: "center",
    },

    text: {
        fontSize: 20,
        fontStyle: "bold",
        color: "white"
    },

    alertText: {
        fontSize: 20,
        color: "red"
    },

    redirectText: {
        fontSize: 14,
        color: "white"
    },

    link: {
        fontSize: 14,
        fontStyle: "bold",
        color: "white",
        textDecorationLine: "underline"
    }
});

export default App;

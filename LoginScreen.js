import { ImageBackground, StyleSheet, SafeAreaView, Text, View} from 'react-native';

import { React, useState } from "react";

//import useNavigation from "react-navigation/native";

import axios from "axios";

import Input from "./Input";

import Button from "./Button";

import Loader from "./Loader";


function App() {
    const [username = null, setUsername] = useState();
    const [password = null, setPassword] = useState();
    const [errors, setError] = useState({ username: "", password: "" });
    const [loading, setLoad] = useState();
    
    const Login = async () => {
        let uError = pError = null;

        if (username == null || password == null) {     
            if (username == null) {
                uError = "Please Enter your Username";
            }

            if (password == null) {
                pError = "Please Enter your Password";
            }
        }
        else {
            const payload = {
                username: username,
                password: password
            }

            try {
                setLoad(true);

                const baseURL = "https://only-hands.herokuapp.com";

                const response = await axios.post(baseURL + "/api/user/login/", payload);

                console.log(response.data);
            }
            catch (error) {
                uError = "Incorrect Username";

                pError = "Incorrect Password";
            }
        }

        setError({ username: uError, password: pError });

        setLoad(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Loader visible={loading}/>

            <ImageBackground style={styles.background} source={require("./assets/pexels-cottonbro-4761792.jpg")}>
                <View style={styles.mainView}>
                    <Text style={styles.title}>Login</Text>

                    <View style={styles.paddUsername}>
                        <Input
                            placeholder="Enter your Username"
                            label="Username"
                            placeholderTextColor="gray"
                            iconName={"account-cicle"}
                            color="white"
                            error={errors.username}
                            onChangeText={input => setUsername(input)}
                        />
                    </View>

                    <View style={styles.paddPassword}>
                        <Input
                            placeholder="Enter your Password"
                            label="Password"
                            placeholderTextColor="gray"
                            iconName={"lock-outline"}
                            color="white"
                            password={true}
                            error={errors.password}
                            onChangeText={input => setPassword(input)}
                        />
                    </View>

                    <Button
                        title="Login"
                        onPress={Login}
                    />

                    <View style={styles.redirectView}>
                        <Text style={styles.redirectMessage}>No Account? </Text>

                        <TouchableOpacity onPress={() => navigation.navigate("RegisterScree")}>
                            <Text style={styles.redirectLink}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

               
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "black",
        flex: 1
    },

    background: {
        width: "100%",
        height: "100%"
    },

    mainView: {
        paddingTop: 50,
        paddingHorizontal: 20
    },

    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 40
    },

    paddUsername: {
        paddingTop: 25
    },

    paddPassword: {
        paddingTop: 25
    },

    redirectView: {
        marginTop: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },

    redirectMessage: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,  
    },

    redirectLink: {
        color: "white",
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 16
    }
});

export default App;

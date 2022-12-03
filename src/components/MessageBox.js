import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const MessageBox = (props) => {
    const renderUserStatus = () => {
        if (props.online) {
            return {
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: "limegreen",
                marginLeft: -12,
                marginTop: 30
            };
        }
    };

    const renderMessageStatus = () => {
        const t = 1;

        if (t > 0) {
            return {
                height: "100%",
                width: "100%",
                borderRadius: 100,
                backgroundColor: "#ff405b",
                alignItems: "center",
                justifyContent: "center"
            };
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(props.dest, props)}>
            <View style={styles.mainView}>
                <View style={styles.pictureView}>
                    <Image
                        source={require("../../assets/pexels-cottonbro-4761792.jpg")}
                        style={styles.profilePicture}
                    >
                    </Image>

                    <View style={renderUserStatus()}></View>
                </View>

                <View style={styles.nonImage}>
                    <View style={styles.nameView}>
                        <Text style={styles.name}>{props.name}</Text>
                    </View>

                    <View style={styles.messageAlert}>
                        <View style={renderMessageStatus()}>
                            <Text styles={styles.numMessages}>2</Text>   
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        alignContent: "center",
        margin: 20
    },

    pictureView: {
        flexDirection: "row",
        width: 60,
        height: 60,
    },

    profilePicture: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },

    nonImage: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20
    },

    nameView: {
        flex: 1,
        justifyContent: "flex-end",
    },

    name: {
        fontSize: 20,
        color: "white"
    },

    messageAlert: {
        width: 60,
        height: 60
    },

    numMessages: {
        color: "white",
        fontSize: 20
    },
});

export default MessageBox;
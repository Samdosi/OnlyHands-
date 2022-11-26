import React from 'react';

import { StyleSheet, View, Text, ImageBackground } from 'react-native';

const MessageBox = (props) => {

    return (
        <View style={styles.mainView}>
            <View style={styles.icon}>
                <ImageBackground
                //source={require(props.image)}
                >

                </ImageBackground>
            </View>
            <View style={styles.placeholder}>
                <View>
                    <Text style={styles.header}>{props.name}</Text>
                    <Text style={styles.footer}>{props.message}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        alignContent: "center",
        margin: 20
    },

    button: {
        width: 388,
        height: 100
    },

    icon: {
        marginRight: 20
    },

    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifContent: "flex-end"
    },

    placeholder: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    header: {
        fontSize: 30,
        color: "white"
    },

    footer: {
        fontSize: 20,
        color: "grey"
    }
});

export default MessageBox;
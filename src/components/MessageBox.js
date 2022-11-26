import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, ImageBackground} from 'react-native';

const MessageBox = (props) => {

    return (
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(props.dest)}>
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
                    <View style={styles.rightPart}>
                        <View style={styles.circle}>
                            <Text style={styles.numMessages}>{props.numMessages}</Text>
                        </View>
                        <Text style={styles.timestamp}>{props.timestamp}</Text>
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
    },

    rightPart: {
        justifyContent: "center",
        alignItems: "center"
    },

    circle: { //placeholder (temporary)
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#ff405b",
        alignItems: "center",
        justifyContent: "center"
    },

    numMessages: {
        color: "white",
        fontSize: 20
    },

    timestamp: {
        marginTop: 6,
        color: "white"
    }
});

export default MessageBox;
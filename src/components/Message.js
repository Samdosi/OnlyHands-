import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';

//friends array in chatScreen.


//assume the info is already setup.
const Message = (props) => {

    return (
        <TouchableOpacity style={styles.button}>
            <View style={styles.mainView}>
                <View style={styles.icon}>
                    <Text>{props.image}</Text>
                    <Text>{props.status}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.header}>test</Text>
                    <Text style={styles.footer}>{props.message}</Text>
                </View>
                <View>
                    <Text>{props.numMessages}</Text>
                    <Text>{props.timestamp}</Text>
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
        width: 380,
        height: 80,
        borderWidth: 1,
    },

    icon: {
        marginRight: 10
    },

    text: {
        marginRight: 200
    },

    header: {
        fontSize: 30,
        fontStyle: "bold",
        color: "white"
    },

    footer: {
        fontSize: 15,
        color: "grey"
    }
});

export default Message;
import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native';

const MessageBox = () => {

    return (
        <View style={styles.mainView}>
            <View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: "row",
        alignContent: "center",
        margin: 20
    }
});

export default MessageBox;
import React from 'react';

import { StyleSheet, View } from 'react-native';

import Input from "../src/components/Input";

const MessageBox = () => {

    return (
        <View style={styles.mainView}>
            <Input
                
            ></Input>
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
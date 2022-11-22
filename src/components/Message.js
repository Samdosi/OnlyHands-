import React from 'react';

import { StyleSheet, TouchableOpacity, Image} from 'react-native';

//friends array in chatScreen.


//assume the info is already setup.
export default function Message(props) {
    const userName = props.userName;
    const img = props.img;

    return {
        <TouchableOpacity >
            <Image //needs to be special. (circle if online or not).
                source = {img}

                style = {styles.image}
            />

            <View style = {styles.messageView}>
                <Text style = {styles.header}>
                    {userName}
                </Text> 

                <Text style={styles.footer}>
                    {status}
                </Text>
            </View>

        <TouchableOpacity/>
    }
}
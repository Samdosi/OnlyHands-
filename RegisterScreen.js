import React from 'react';
import { Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function RegisterScreen(props) {

    const [username, onChangeUsername] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);


    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground style={styles.bgImage} resizeMode='cover' source={require('./assets/wallpaper.jpeg')}>
                
                <View>
                    <TouchableOpacity style={styles.backArrowTouch}>
                        <Image resizeMode='cover' style={styles.backArrow} source={require('./assets/arrow_back_white.png')}></Image>
                    </TouchableOpacity>
                </View>
                
                
                
                
                <View style={styles.IntroTextCointainer}>
                    <Text style={styles.IntroText}>Create Your Account!</Text>
                </View>
                <View style={styles.fillInContainer}>

                    <TextInput 
                        style={styles.fillIn} 
                        onChangeText={onChangeUsername}
                        placeholder="Username"
                        placeholderTextColor= '#5e5e61'
                        value={username}>
                    </TextInput>

                    <TextInput 
                        style={styles.fillIn} 
                        onChangeText={onChangeEmail}
                        placeholder="Email"
                        placeholderTextColor= '#5e5e61'
                        value={email}>
                    </TextInput>

                    <TextInput 
                        style={styles.fillIn} 
                        onChangeText={onChangePassword}
                        placeholder="Password"
                        placeholderTextColor= '#5e5e61'
                        value={password}
                        secureTextEntry={true}>
                        
                    </TextInput>

                    <TouchableOpacity>
                        <View style={styles.registerButtonView}>
                            <Text style= {styles.registerButtonText}>
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
                

            </ImageBackground>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    bgImage:{
       width: '100%',
       height: '100%',
       position: 'relative'
    },

    safeArea:{
        backgroundColor: 'black'
    },

    IntroText:{
        color: 'white',
        fontFamily: 'Times New Roman',
        fontSize: 30,
        fontWeight: 'semibold',
        
    },

    IntroTextCointainer:{
        alignItems:'center',
        top: -15
    },

    fillIn:{
        color:'black',
        margin: 30,
        backgroundColor: 'white',
        width: 150,
        height: 30,
        borderRadius: 8,
        textAlign:'center',

       
    },

    fillInContainer:{
        alignItems: 'center',
        flex:1,
        flexDirection: 'columns',
        justifyContent: 'center',
        top:-50
    },

    registerButtonText:{
        color:'white',
        textAlign:'center',
        fontWeight: '500'
    },

    registerButtonView:{
        top:40,
        backgroundColor:'#a83f38',
        width: 100,
        height: 30,
        borderRadius: 20,
        justifyContent:'center',
    },

    backArrow:{
        color:'white',
        width: 30,
        height: 30,
    },

    backArrowTouch:{
        backgroundColor:'black',
        width:30,
        height:40,
        left: 8
    }
    

})

export default RegisterScreen;
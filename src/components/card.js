import React from "react";
import { Text,StyleSheet,ImageBackground, Image, SafeAreaView,View } from "react-native";

const Card = (props) =>{
    const {name, image, bio} = props.user

    return(
        <View style={styles.profileCard}>
                    
                    <ImageBackground source={{uri:image}} style={styles.fighterPicture}>
                        <View style={styles.figtherInfo}>
                            <Text style={styles.profileName}>{name}</Text>
                            <Text style={styles.profileBio}>{bio}</Text>
                        </View>
                    </ImageBackground>
        </View>
    )
}



const styles = StyleSheet.create({

    pageContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },

    profileCard:{
        width:'100%',
        height:'100%',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },

    profileName:{
        fontSize:30,
        color:'white',
        fontWeight:'bold',
       
    },

    profileBio:{
        fontSize:15,
        color:'white',
        lineHeight: 25,

    },

    figtherInfo:{
        padding:10,
        
    },

    fighterPicture:{
        width:'100%',
        height:'100%',
        borderRadius: 15,
        overflow:'hidden',
        justifyContent:'flex-end',
    }
})

export default Card
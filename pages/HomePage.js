import React,{useEffect, useState} from "react";
import 'react-native-gesture-handler';

import 
{ Text,
    StyleSheet,
    ImageBackground, 
    Image,
    SafeAreaView,
    View, 
    Button, 
    Pressable, 
    useWindowDimensions,
    Alert,
    
} from "react-native";
import Card from '../src/components/card'
import users from '../assets/data/usersTest'
import Animated,
{   useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
    useDerivedValue,
    interpolate,
    runOnJS,
    color,
    
} from 'react-native-reanimated'

import {PanGestureHandler, TouchableOpacity,TapGestureHandler} from 'react-native-gesture-handler'
import Fight from '../assets/fight.png'
import NoFight from '../assets/no!.png'

const ROTATION = 60;
const SWIPE_VELOCITY = 1000;

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BackgroundImage } from "react-native-elements/dist/config";
import axios from "axios";
import load from '../loadprofiles'


const Home = ({navigation,route}) => {

    //const profiles = load(route.params.paramKey)
    

 /*   const LoadProfiles = async () => {
        const token = route.params.paramKey;
        console.log(token)
       //console.log('HEY');
    
            const header = {
                'x-access-token': token,
                'Content-Type': 'application/json',
            }
            //console.log(header["x-access-token"])
            try{
                const baseURL = "https://only-hands.herokuapp.com"
                const res = await axios.get(baseURL + '/api/match/serve',{
                    headers:header
                });

                console.log(res)
                console.log(res.data.matches[0].nickname)
                users[0].name = res.data.matches[0].nickname
                //users[0].name = res.data.matches[1].nickname
                //navigation.navigate("Home", { paramKey: token });
    
            }
            catch(e){
                console.log(e)
            }
            
    }*/

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(currentIndex+1)

    const currentProfile = users[currentIndex];
    const nextProfile = users[nextIndex];

    const {width: screenWidth} = useWindowDimensions();

    const hiddenTranslateX = 2 * screenWidth

    const translateX = useSharedValue(0);
    const rotate = useDerivedValue(()=> interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION],        
    )+ 'deg',
    );



    const cardStyle = useAnimatedStyle(() => ({
        transform:[
        {
            translateX: translateX.value,
        },
        {
            rotate: rotate.value,
        }
        ],
    }))

    const nextCardStyle = useAnimatedStyle(() => ({
        transform:[
            {scale:  interpolate(
                    translateX.value,
                    [-hiddenTranslateX,0, hiddenTranslateX],
                    [1, 0.8, 1],        
                    ),
            }
        ],

        opacity:interpolate(
            translateX.value,
            [-hiddenTranslateX,0, hiddenTranslateX],
            [1, 0.5, 1],        
            ),
    }))

    const figtStyle = useAnimatedStyle(()=>({
        opacity:interpolate(
            translateX.value,
            [0, hiddenTranslateX/5],
            [0, 1],        
            ),
    }))

    const noFightStyle = useAnimatedStyle(()=>({
        opacity:interpolate(
            translateX.value,
            [0, -hiddenTranslateX/5],
            [0, 1],        
            ),
    }))

    const gestureHandler = useAnimatedGestureHandler({
        onStart:(_, context) =>{
            context.startX = translateX.value;


           // console.warn('Touch Start');
        },

        onActive:(event, context)=>{
            translateX.value = context.startX + event.translationX;


            //console.log(event.velocityX)   
        },

        onEnd:(event)=>{
             

            if(Math.abs(event.velocityX) < SWIPE_VELOCITY){
                //console.log(event.velocityX)  
                translateX.value = withSpring(0);

                return;
            }
           
            translateX.value = withSpring(
                hiddenTranslateX * Math.sign(event.velocityX),
                {},
                () => runOnJS(setCurrentIndex)(currentIndex+1)
                );
                //post match          
        }
    });



    useEffect(() => {
        translateX.value = 0;
        setNextIndex(currentIndex + 1);
        
    },[currentIndex,translateX])

  //  users[0].name = 'Sam'
//


//IF YES or NO buttons, but F that
    /*
                <View style = {styles.botNavigation}>
                    
                    <View style = {[styles.botButton,{backgroundColor:'#ff6969'}]}>
                        <AntDesign name="close" size={40} color={'#323a42'}/> 
                    </View>

                    <View style = {[styles.botButton,{backgroundColor:'#7ae5fa'}]}>
                        <AntDesign name="check" size={40} color={'#323a42'}/>
                    </View>
                    
                    
                </View>

// testing 
    const testing = async () =>{
        console.log(route.params.paramKey)
        const header = {
            'x-access-token': route.params.paramKey,
            'Content-Type': 'application/json',
        }
        console.log(header["x-access-token"])
        try{
            const baseURL = "https://only-hands.herokuapp.com"
            const res = await axios.get(baseURL + '/api/match/serve',{
                headers:header
            });
            console.log(res)
            console.log(res.data.matches[1].nickname)
            users[0].name = res.data.matches[1].nickname

        }
        catch(e){
            console.log(e)
        }
        
        
        
    }
*/

    return(

            <SafeAreaView style={{flex:1,backgroundColor:'#e6e6e3'}}>
               
                <View style={{alignItems:'center',justifyContent:'center',top:60}}>
                    <Image  style={styles.logoStyle} source={require('../assets/logoTrans.png')}resizeMode='contain' ></Image>
                </View>
                
                
                <View  style={styles.pageContainer}>                
                    <View style={styles.topNavigation}>
                        <TouchableOpacity >
                        <FontAwesome name="user-circle-o" size={40} color={'black'}/>
                        </TouchableOpacity>
                        <Entypo name="chat" size={40} color={'black'}/>
                    </View>

                    
                
                  

                {nextProfile && (
                    <View style = {styles.nextCardContainer}>
                        <Animated.View style={[styles.animatedCard,nextCardStyle]}>
                            <Card user = {nextProfile}/>
                        </Animated.View>
                    
                    </View>
               )}               
               
                {currentProfile && (
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                    
                        <Animated.View style={[styles.animatedCard,cardStyle]}>
                            <Animated.Image source={Fight} style={[styles.fight,{left:10},figtStyle]} resizeMode='contain'></Animated.Image>
                            <Animated.Image source={NoFight} style={[styles.fight,{right:10},noFightStyle]}></Animated.Image>
                            <Card user = {currentProfile}/>
                        </Animated.View>

                                          
                    </PanGestureHandler>
                    
                    
                )}
                <Button title="Click" style={{width:30,height:30,backgroundColor:'red'}} onPress = {load}>

                </Button>

                </View>         
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({

    bg:{
        position:'absolute'
    },

    logoStyle:{
        position:'absolute',
        //backgroundColor:'red',
        height:150,
        width:80,
        //flexDirection:'column',
        
        flex:1
    },

    botButton:{
        height:50,
        width:50,
        
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'50%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderWidth:0.2,
        borderColor:'#8d97a1'
    },

    botNavigation:{
        width:'100%',
        top:50,
        height:50,
        //position:'relative',
        //paddingTop:50,
        //backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },

    topNavigation:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignSelf:'stretch',
        //backgroundColor:'blue',
        bottom:90,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
        
    },

    innerPicture:{
        width:30,
        height:30,
        alignSelf:'center',
        opacity:0.5
        
    },  

    

    fight:{
        width: 150,
        height: 150,
        position:'absolute',
        top:10,
        zIndex:1,
        elevation:1,
    },


    pageContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        //backgroundColor:'red'
    },

    animatedCard:{
        width: '90%',
        height: '70%',
        justifyContent:'center',
        alignItems:'center',
              
    },

    nextCardContainer:{
        height:'100%',
        width:'100%',        
        justifyContent:'center',
        alignItems:'center',  
        position:'absolute',            
        flex:1,
        paddingTop:15
        
    },

   

})

export default Home
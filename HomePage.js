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
    useWindowDimensions 
} from "react-native";
import Card from './src/components/card'
import users from './assets/data/usersTest'
import Animated,
{   useSharedValue,
    useAnimatedStyle,
    withSpring,
    useAnimatedGestureHandler,
    useDerivedValue,
    interpolate,
    runOnJS
} from 'react-native-reanimated'

import {PanGestureHandler} from 'react-native-gesture-handler'
import Fight from './assets/fight.png'
import NoFight from './assets/no!.png'

const ROTATION = 60;
const SWIPE_VELOCITY = 1000;

const Home = () => {
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
        }
    });

    useEffect(() => {
        translateX.value = 0;
        setNextIndex(currentIndex + 1);
    },[currentIndex,translateX])

    return(

            <SafeAreaView style={styles.pageContainer}>

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
                
                
                
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({

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
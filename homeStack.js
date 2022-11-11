import React from "react";

import {createStackNavigator} from 'react-navigation-stack'

import {createAppContainer} from 'react-navigation'

import Home from './RegisterScreen'
import Profile from './ProfileScreen'

const screens = {
    Profile:{
        screen: Profile
    },
    Home:{
        screen: Home
    },
   
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);


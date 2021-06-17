import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider, ActivityIndicator } from "react-native-paper";
// import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import LandingScreem from '../screens/Authentication/LandingScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import SignupScreen from '../screens/Authentication/SignupScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import LoadingIndicator from '../components/LoadingIndicator';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();

const AuthStack = () => {
    console.log("in AuthStack...");
    const {setUserId, getToken}             = useContext(AuthContext);
    const [initializing, setInitializing]   = useState(true);
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);     // Only show OnboardingScreen on first-time launch
    
    useEffect(() => {
      if (initializing) {
        setInitializing(false);
      }

      (async () => {
        let myToken = await getToken();
        if (myToken !== null) {
            console.log('[AuthStack] useEffect: user found in AsyncStorage');
            // let user_lastLoginAt = myToken.toJSON().lastLoginAt;
            // console.log('here in AuthStack: user_lastLoginAt = ', user_lastLoginAt);
            setUserId(myToken.uid);
        } else {
            console.log('[AuthStack] useEffect: no user found in AsyncStorage');
            setUserId(null);
        }
      })()

      AsyncStorage.getItem('alreadyLaunched')
      .then(value => {
          if (value==null) { 
          AsyncStorage.setItem('alreadyLaunched', 'true')
          setIsFirstLaunch(true)
          } else {
          setIsFirstLaunch(false)
          }
      })
    }, []);

    if (initializing) {
      console.log("[Routes] initializing...");
      return ( <LoadingIndicator/> )
    }

    return (
        <View style={styles.container}>
        <Stack.Navigator initialRouteName="LandingScreen">
            {/* <PaperProvider theme={theme}> */}
                <Stack.Screen 
                    name="OnboardingScreen" 
                    component={OnboardingScreen} 
                    options={ {header: ()=>null} }/>
                <Stack.Screen 
                    name="LandingScreen" 
                    component={LandingScreem} 
                    options={ {header: ()=>null} }/>
                <Stack.Screen 
                    name="LoginScreen" 
                    component={LoginScreen} 
                    options={ {title: "Log in"} }/>
                <Stack.Screen 
                    name="SignupScreen" 
                    component={SignupScreen}
                    options={ {title: "Sign up"} } />
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                    options={ {title: "Forgot Password"} } />
                {/* <StatusBar style="auto" /> */}
            {/* </PaperProvider> */}
        </Stack.Navigator>
        </View>
  );
} // end AuthStack()

// Three dots syntax is "property spread notation"
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f7c5ae',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 25,
    color: "red"
  },
});


export default AuthStack;
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import {useEffect, useState} from "react";
import asyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

function App() {
    const [initialeRoute, setInitialeRoute] = useState(null)

    const checkUser = async () => {
        try {
            const data = await asyncStorage.getItem("userInfo");
            if (data) {
                setInitialeRoute('Home');
            } else {
                setInitialeRoute('Welcome');
            }
        } catch (e) {
            setInitialeRoute('Welcome');
        }
    }

    useEffect(() => {
        checkUser();
    }, []);
    if (initialeRoute === null) {
        return (
            <Loading/>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialeRoute}>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}
                              options={{headerLeft: () => null, title: "Home"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;

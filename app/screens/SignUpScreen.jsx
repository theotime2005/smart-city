import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

const SignUpScreen = ({navigation}) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setIsLoading(true);
        if (!userName || !email || !password) {
            Alert.alert("Please fill all the fields");
            setIsLoading(false);
            return;
        }

        // Validation basique de l'e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        const data = {
            username: userName,
            email: email,
            password: password
        }
        try {
            const request = await fetch(`${config.api_url}/auth/local/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await request.json();

            if (request.ok) {
                const userInfo = {
                    jwt: responseData.jwt,
                    userId: responseData.user.id,
                };
                await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                navigation.navigate('Home');
            } else {
                Alert.alert(`Sign up failed: ${responseData.message || 'Unknown error'}`);
                setIsLoading(false);
            }
        } catch (e) {
            setIsLoading(false);
            console.error(e);
            Alert.alert("Error with API.");
        }
    };

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View>
            <TextInput placeholder="Username" value={userName} onChangeText={setUserName} keyboardType="name-phone-pad"/>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!passwordVisible}/>
            {!passwordVisible ? (
                <Button title="Show password" onPress={() => setPasswordVisible(true)}/>
            ) : (
                <Button title="Hide password" onPress={() => setPasswordVisible(false)}/>
            )}
            <Button title="Sign Up" onPress={async () => await handleSignUp()}/>
        </View>
    )
}

export default SignUpScreen;

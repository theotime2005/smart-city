import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from "../config";

const SignUpScreen = ({navigation}) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSignUp = async () => {
        if (!userName || !email || !password) {
            Alert.alert("Please fill all the fields");
            return;
        }
        const data = JSON.stringify({
            userName: userName,
            email: email,
            password: password
        });
        try {
            const request = await fetch(`${config.api_url}/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
            if (request.ok) {
                setIsSignUp(true);
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error with api.");
        }
    }

    return (
        <View>
            {!isSignUp ? (
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
            ) : (
                <View>
                    <Text>Your account is created. You can now log.</Text>
                    <Button title="Log in" onPress={() => navigation.navigate('Login')}/>
                </View>
            )}
        </View>
    )
}

export default SignUpScreen;

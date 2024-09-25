import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {CheckBox} from "react-native-web";

const SignUpScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        if (!userName || !email || password) {
            Alert.alert("Please fill all the fields");
            return;
        }
        setIsSignUp(true);
    }

    return (
        <View>
            {!isSignUp ? (
                <View>
                    <TextInput placeholder="Username" value={userName} onChangeText={setUserName} keyboardType="name-phone-pad"/>
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} keyboardType="visible-password"/>
                    <Button title="Sign Up" onPress={handleSignUp}/>
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

import React from "react";
import {Button, Text, View} from "react-native";

function WelcomeScreen({navigation}) {
    return (
        <View>
            <Text>Welcome to Cares. To continue, create an account or sign up.</Text>
            <Button title="Sign up" accessibilityLabel="Sign up" onPress={() => navigation.navigate('SignUp')}/>
            <Button title="HomeLogin" accessibilityLabel="Login" onPress={() => navigation.navigate('Login')}/>
        </View>
    )
}

export default WelcomeScreen;

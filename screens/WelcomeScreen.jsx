import React from "react";
import { Button, Text, View, Image, StyleSheet } from "react-native";

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Logo_cares.png')}
                style={styles.logo}
            />
            <Image
                source={require('../assets/logo_jardin.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Welcome to Cares. To continue, create an account or sign up.</Text>
            <Button title="Sign up" accessibilityLabel="Sign up" onPress={() => navigation.navigate('SignUp')} />
            <Button title="HomeLogin" accessibilityLabel="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default WelcomeScreen;

import React from "react";
import {Button, Text, View} from "react-native";

function WelcomeScreen({navigation}) {
    return (
        <View>
            <Text>Bienvenu sur Cares. Pour commencer, connectez-vous.</Text>
            <Button title="Connexion" accessibilityLabel="Se connecter" onPress={() => navigation.navigate('Connexion')}/>
        </View>
    )
}

export default WelcomeScreen;

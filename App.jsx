import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Bienvenue">
                <Stack.Screen name="Bienvenue" component={WelcomeScreen}/>
                <Stack.Screen name="Connexion" component={LoginScreen}/>
                <Stack.Screen name="Accueil" component={HomeScreen}
                              options={{headerLeft: () => null, title: "Page d'accueil"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

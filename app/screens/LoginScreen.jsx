import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

const LoginScreen = ({ navigation }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true);
        const data = {
            identifier: identifier,
            password: password
        };
        try {
            const request = await fetch(`${config.api_url}/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            console.error(e);
            Alert.alert("Error with API.");
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email or username"
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="default"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
            />
            {!passwordVisible ? (
                <Button title="Show password" onPress={() => setPasswordVisible(true)}/>
            ) : (
                <Button title="Hide password" onPress={() => setPasswordVisible(false)}/>
            )}
            <Button title="Log in" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Logique de validation du login ici
    navigation.navigate('HomeAppli'); // Redirige vers HomeAppli
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="LOG IN" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;

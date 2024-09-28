import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

function HomeScreen({ navigation }) {
    const [username, setUsername] = useState("");

    const getUser = async () => {
        try {
            const data = await AsyncStorage.getItem("userInfo");
            const json_data = JSON.parse(data);
            const request = await fetch(`${config.api_url}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${json_data.jwt}`,
                    'Accept': 'application/json',
                }
            });
            const response = await request.json();
            if (request.ok) {
                setUsername(response.username);
            }
        } catch (e) {
            console.error(e);
            navigation.navigate('Welcome');
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Welcome');
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(async () => {
        await getUser();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello {username}</Text>
            <Button title="Log out" onPress={() => logout()}/>
        </View>
    );
}

export default HomeScreen;

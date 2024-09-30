import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeAppli = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligne en haut
    alignItems: 'center',
    paddingTop: 50, // Ajuste la marge du haut
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default HomeAppli;

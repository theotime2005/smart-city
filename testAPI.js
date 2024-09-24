import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ParksMap = () => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/nc67-uf89.json');
        const data = await response.json();
        setParks(data);
      } catch (error) {
        console.error('Error fetching parks data:', error);
      }
    };

    fetchParks();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7128, // Latitude de New York
          longitude: -74.0060, // Longitude de New York
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {parks.map((park, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(park.latitude),  // Assurez-vous que le champ est correct
              longitude: parseFloat(park.longitude), // Assurez-vous que le champ est correct
            }}
            title={park.name}
            description={park.description || 'Aucune description disponible'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ParksMap;

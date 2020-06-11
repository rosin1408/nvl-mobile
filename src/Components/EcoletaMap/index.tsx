import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from "react-native";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import EcoletaMapMarker from '../EcoletaMapMarker';

interface Point {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}
interface Props {
    points: Point[];
}
const EcoletaMap: React.FC<Props> = ({ points }) => {

    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
    
    useEffect(() => {
        async function loadPosition() {
            const { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Ooooops...', 'Precisamos de sua permissão para obter a sua localização');
                return;
            }

            const location = await Location.getCurrentPositionAsync();

            const { latitude, longitude } = location.coords;

            setInitialPosition([ latitude, longitude ]);
        }
        loadPosition();
    }, []);
    
    return (
        <>
            {
                initialPosition[0] !== 0 && (
                    <MapView
                        style={styles.map}
                        loadingEnabled={ initialPosition[0] === 0 }
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}
                    >
                        { points.length > 0 && points.map(point => (
                            <EcoletaMapMarker key={ point.id } point={ point }/>
                        ))}
                    </MapView>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
      }
});

export default EcoletaMap;

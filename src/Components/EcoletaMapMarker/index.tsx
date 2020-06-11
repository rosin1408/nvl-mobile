import React from 'react';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Point {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}
interface Props {
    point: Point;
}
const EcoletaMapMarker: React.FC<Props> = ({ point }) => {
    const navigation = useNavigation();

    function handleNavigateToDetail(id: number) {
        navigation.navigate('Detail', { point_id: id });
    }

    return (
        <Marker
            style={ styles.mapMarker }
            onPress={ () => handleNavigateToDetail(point.id) }
            coordinate={{
                latitude: point.latitude && Number(point.latitude),
                longitude: point.longitude && Number(point.longitude)
            }}
        >
            <View style={ styles.mapMarkerContainer }>
                <Image style={ styles.mapMarkerImage } source={{ uri: point.image_url }} />
                <Text style={ styles.mapMarkerTitle }>{ point.name }</Text>
            </View>
        </Marker>
    )
};

const styles = StyleSheet.create({
    mapMarker: {
        width: 90,
        height: 80, 
      },
    
      mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
      },
    
      mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
      },
    
      mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
      },
});

export default EcoletaMapMarker;
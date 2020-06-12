import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import EcoletaMap from '../../Components/EcoletaMap';
import Items from '../../Components/Items';
import api from '../../services/api';


interface Point {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}

interface Params {
    uf: string;
    city: string;
}

const Points = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    const [ points, setPoints ] = useState<Point[]>([]);

    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);

    useEffect(() => {
        
        const params = {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        };

        api.get('points', params).then(response => setPoints(response.data));

    }, [selectedItems]);

    function handleSelectItem(items: number[]) {
        setSelectedItems(items);
    }

    function handleNavigateBack() {
        navigation.goBack();
    }

    return (
        <>
            <View style={ styles.container }>
                <TouchableOpacity onPress={ handleNavigateBack }>
                    <Icon name="arrow-left" size={20} color="#34cb79"/>
                </TouchableOpacity>

                <Text style={ styles.title }>Bem vindo.</Text>
                <Text style={ styles.description }>Encontre no mapa um ponto de coleta.</Text>

                
                <EcoletaMap points={ points } />
            </View>
            
            <Items onSelectItem={ handleSelectItem }/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    }
  });

export default Points;

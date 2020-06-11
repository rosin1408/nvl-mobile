import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import EcoletaMap from '../../Components/EcoletaMap';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

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

    const [ items, setItems ] = useState<Item[]>([]);

    const [ points, setPoints ] = useState<Point[]>([]);

    const [ selectedItems, setSelectedItems ] = useState<Number[]>([]);

    useEffect(() => {
        api.get(`items`).then(response => setItems(response.data));
    }, []);

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

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    }

    return (
        <>
            <View style={ styles.container }>
                <TouchableOpacity onPress={ handleNavigateBack }>
                    <Icon name="arrow-left" size={20} color="#34cb79"/>
                </TouchableOpacity>

                <Text style={ styles.title }>Bem vindo.</Text>
                <Text style={ styles.description }>Encontre no mapa um ponto de coleta.</Text>

                <View style={ styles.mapContainer }>
                    <EcoletaMap points={ points } />
                </View>
            </View>
            <View style={ styles.itemsContainer }>
                <ScrollView horizontal showsHorizontalScrollIndicator={ false } contentContainerStyle={{ paddingHorizontal: 20 }} >
                    {items.map(item => (
                        <TouchableOpacity
                            key={ String(item.id) }
                            style={[ 
                                styles.item, 
                                selectedItems.includes(item.id) ? styles.selectedItem : {}
                            ]}
                            onPress={ () => { handleSelectItem(item.id) } }
                            activeOpacity={ 0.5 }
                        >
                            <SvgUri width={ 42 } height={ 42 } uri={ item.image_url } />
                            <Text style={ styles.itemTitle }>{ item.title }</Text>
                        </TouchableOpacity> 
                    ))}
                </ScrollView>
            </View>
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
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;

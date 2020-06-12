import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}
interface Props {
    onSelectItem: (itemsIds: number[]) => void;
}
const Items: React.FC<Props> = ({ onSelectItem }) => {

    const [ items, setItems ] = useState<Item[]>([]);

    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);

    useEffect(() => {
        api.get(`items`).then(response => setItems(response.data));
    }, []);

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
            onSelectItem(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);
            onSelectItem([ ...selectedItems, id ]);
        }
    }

    return (
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
    )
}

const styles = StyleSheet.create({
  
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
    }
  });

export default Items;
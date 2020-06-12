import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import api from '../../services/api';

import ItemList from './ItemList';

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
                    <ItemList key={ String(item.id) } item={ item } onSelectItem={ handleSelectItem } />
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
    }
  });

export default Items;
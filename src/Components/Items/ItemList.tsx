import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

interface Item {
    id: number;
    title: string;
    image_url: string;
}
interface Props {
    onSelectItem: (id: number) => void;
    item: Item;
}
const ItemList: React.FC<Props> = ({ onSelectItem, item }) => {
    const [ selected, setSelected ] = useState(false);

    function handleSelectItem(id: number) {
        onSelectItem(id);
        setSelected(!selected);
    }

    return (
        <TouchableOpacity
            style={[ 
                styles.item, 
                selected ? styles.selectedItem : {}
            ]}
            onPress={ () => { handleSelectItem(item.id) } }
            activeOpacity={ 0.6 }
        >
            <SvgUri width={ 42 } height={ 42 } uri={ item.image_url } />
            <Text style={ styles.itemTitle }>{ item.title }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  
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

export default ItemList;

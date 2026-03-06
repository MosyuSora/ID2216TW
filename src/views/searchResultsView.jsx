import React from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';

function SearchResultsView(props) {
    function renderItemCB({ item }) {
        return (
            <Pressable role="button" onPress={() => props.onSearchResultChosen(item)}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <Text>iprog.Image</Text>
                <Text>{item.title}</Text>
            </Pressable>
        );
    }

    return (
        <FlatList 
            data={props.searchResults}
            renderItem={renderItemCB}
            keyExtractor={item => item.id}
        />
    );
}

export { SearchResultsView };

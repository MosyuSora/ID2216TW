import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { getCardStyle } from './cardStyle';
import { router } from 'expo-router';

function SearchResultsView({ searchResults, onDishChosen }) {
    function renderItemACB({ item: dish }) {
        function dishPressedACB() {
            onDishChosen(dish);
            router.push('/details');
        }

        return (
            <Pressable 
                role="button" 
                onPress={dishPressedACB}
                style={styles.card}
            >
                <View>
                    <Text 
                        source={{ uri: dish.image }}
                        style={{ width: '100%', aspectRatio: 1, borderRadius: 8 }}
                    >
                        iprog.Image
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={3}>
                        {dish.title}
                    </Text>
                </View>
            </Pressable>
        );
    }

    function keyExtractorACB(item) {
        return item.id.toString();
    }

    return (
        <View>
            <FlatList
                data={searchResults}
                renderItem={renderItemACB}
                keyExtractor={keyExtractorACB}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...getCardStyle(),
    },
});

export { SearchResultsView };

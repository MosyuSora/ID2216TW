import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, StyleSheet } from 'react-native';
import { getCardStyle } from './cardStyle';
import { router } from 'expo-router';

function DetailsView({ dishData, guests, isDishInMenu, onAddToMenu }) {
    const pricePerPerson = dishData.pricePerServing;
    const totalPrice = pricePerPerson * guests;

    function addPressedACB() {
        onAddToMenu();
        router.push('/');
    }

    function moreInfoPressedACB() {
        Linking.openURL(dishData.sourceUrl);
    }

    function renderIngredientCB(ingredient, index) {
        return (
            <Text key={ingredient.id || index}>
                {ingredient.name}: {ingredient.amount.toFixed(2)} {ingredient.unit}
            </Text>
        );
    }

    function renderStepCB(step, index) {
        return <Text key={step.number || index}>{step.step}</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.card}>
                <View>
                    <Text>{dishData.title}</Text>
                </View>

                <View>
                    <Text 
                        source={{ uri: dishData.image }}
                        style={{ width: '100%', height: 200 }}
                    >
                        iprog.Image
                    </Text>
                </View>
                
                <View>
                    <Text>Price per person: {pricePerPerson.toFixed(2)}</Text>
                    <Text>Total price for {guests} guests: {totalPrice.toFixed(2)}</Text>
                </View>

                <View>
                    <Text style={{ fontWeight: 'bold' }}>Ingredients:</Text>
                    {dishData.extendedIngredients.map(renderIngredientCB)}
                </View>

                {dishData.analyzedInstructions?.[0]?.steps && (
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Steps:</Text>
                        {dishData.analyzedInstructions[0].steps.map(renderStepCB)}
                    </View>
                )}
            </View>

            <Pressable 
                role="button" 
                onPress={addPressedACB}
                disabled={isDishInMenu}
            >
                <Text>{isDishInMenu ? "Added to menu" : "Add to menu"}</Text>
            </Pressable>

            <Pressable 
                role="button" 
                onPress={moreInfoPressedACB}
            >
                <Text>More info</Text>
            </Pressable>

            <View role="button">
                <Text>Cancel</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        ...getCardStyle(),
    },
});

export { DetailsView };

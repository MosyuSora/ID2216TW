import React from 'react';
import { View, Text, ScrollView, Pressable, Image, Linking } from 'react-native';

function DetailsView(props) {
    const dish = props.dishData;
    return (
        <ScrollView>
            <Image source={{ uri: dish.image }} style={{ width: 200, height: 200 }} />
            <Text>iprog.Image</Text>
            <Text>{dish.title}</Text>
            <Text>Price per person: {(dish.pricePerServing || 0).toFixed(2)}</Text>
            <Text>Total price for {props.guests} guests: {((dish.pricePerServing || 0) * props.guests).toFixed(2)}</Text>
            
            {dish.extendedIngredients?.map((ing, i) => (
                <Text key={i}>{ing.name}: {ing.amount.toFixed(2)} {ing.unit}</Text>
            ))}

            {dish.analyzedInstructions?.[0]?.steps?.map((step, i) => (
                <Text key={i}>{step.step}</Text>
            ))}

            <Pressable 
                role="button" 
                onPress={() => props.onAddDish()} 
                disabled={props.isDishInMenu}
            >
                <Text>{props.isDishInMenu ? 'Added to menu' : 'Add to menu'}</Text>
            </Pressable>

            <Pressable role="button" onPress={() => Linking.openURL(dish.sourceUrl)}>
                <Text>More info</Text>
            </Pressable>
        </ScrollView>
    );
}

export { DetailsView };

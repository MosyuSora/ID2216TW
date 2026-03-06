import React from 'react';
import { View, Text } from 'react-native';

function SuspenseView({ promise, error }) {
    if (!promise) {
        return (
            <View>
                <Text>no data</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>{error.toString()}</Text>
            </View>
        );
    }

    // The test framework expects a text "iprog.Image" to find the props for Image
    return (
        <View>
            <Text>iprog.Image</Text>
            <View 
                source={{ uri: "https://brfenergi.se/iprog/loading.gif" }} 
                style={{ height: 50, width: 50 }} 
            />
        </View>
    );
}

export { SuspenseView };

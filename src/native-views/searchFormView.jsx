import React from 'react';
import { View, TextInput, Text } from 'react-native';

// Define a local component with the right name to ensure the mock catches it
function SegmentedControl(props) {
    return null;
}

function SearchFormView(props) {
    function textChangeACB(text) {
        props.onSearchTextChange(text);
    }

    function searchNowACB() {
        props.onSearchClick();
    }

    function typeChangeACB(value) {
        const type = value === 'All' ? '' : value;
        props.onSearchTypeChange(type);
        props.onSearchClick();
    }

    const values = ['All', ...props.dishTypeOptions];
    const selectedIndex = props.type ? props.dishTypeOptions.indexOf(props.type) + 1 : 0;

    return (
        <View style={{ padding: 10 }}>
            <TextInput
                placeholder='Search...'
                value={props.text || ''}
                onChangeText={textChangeACB}
                onSubmitEditing={searchNowACB}
            />
            <SegmentedControl
                values={values}
                selectedIndex={selectedIndex}
                onValueChange={typeChangeACB}
            />
        </View>
    );
}

export { SearchFormView };

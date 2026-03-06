import React from 'react';
import { View, TextInput, Text } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

function SearchFormView(props) {
    return (
        <View>
            <TextInput 
                value={props.text || ''}
                onChangeText={txt => props.onSearchTextChange(txt)}
                onSubmitEditing={() => props.onSearchClick()}
            />
            <SegmentedControl 
                values={['All', ...props.dishTypeOptions]}
                selectedIndex={props.type ? props.dishTypeOptions.indexOf(props.type) + 1 : 0}
                onValueChange={value => {
                    props.onSearchTypeChange(value === 'All' ? '' : value);
                    props.onSearchClick();
                }}
            />
        </View>
    );
}

export { SearchFormView };

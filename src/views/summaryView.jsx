import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { sortIngredients } from '../utilities.js';

export default function SummaryView({ people, ingredients }) {
  // Sort ingredients before rendering
  const sortedIngredients = sortIngredients(ingredients);

  // Render each ingredient item
  const renderItemACB = ({ item }) => {
    const amountForPeople = (item.amount * people).toFixed(2);
    return (
      <View style={styles.row}>
        <View>
          <Text>{item.name}</Text>
          <Text style={styles.aisleText}>{item.aisle}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text>{`${amountForPeople} ${item.unit}`}</Text>
        </View>
      </View>
    );
  };

  // Extract unique key for each ingredient
  const keyExtractorACB = (item, index) => {
    return item.id ? String(item.id) : `${item.name}-${index}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Summary for {people} {people === 1 ? 'person' : 'persons'}
      </Text>
      <FlatList
        data={sortedIngredients}
        renderItem={renderItemACB}
        keyExtractor={keyExtractorACB}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  aisleText: {
    fontSize: 12,
    color: '#666',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

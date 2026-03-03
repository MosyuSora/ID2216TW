import { FlatList, StyleSheet, Text, View } from "react-native"

// un-comment when needed:
//import {sortIngredients} from "/src/utilities.js";

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props) {
  return (
    <View style={styles.container}>
      {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
      <Text>
        Summary for <Text>{props.people}</Text> persons:
      </Text>

      {/* TW 1.3: remove this line (and the TW1.3 one below) to uncomment

      <View style={styles.card}>
        <View  style={styles.row}>
          <Text>Name</Text>
          <Text>Aisle</Text>
          <Text>Quantity</Text>
        </View>
        <FlatList
          data={props.TODO}
          renderItem={renderIngredientRowCB}
        />
      </View>

      TW1.3 remove this line to uncomment */}
    </View>
  )

  /* Callback for rendering each ingredient row - implement in TW 1.3 */
  function renderIngredientRowCB(element) {
    const ingr = element.item // FlatList sends objects with a property called item
    return (
      <View testID="summary-row" style={styles.row}>
        <Text>{ingr.name}</Text>
        <Text>{"TODO aisle"}</Text>
        <Text>
          {"TODO amount"} {"TODO unit"}
        </Text>
      </View>
    )
  }
}

// Basic styles to get started
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    padding: 8,
  },
})

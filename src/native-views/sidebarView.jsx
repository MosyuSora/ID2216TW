import { Text } from "react-native"

export function SidebarView(props) {
  return (
    <Text>
      {"SidebarView stub: number is " +
        props.number +
        " and we have " +
        props.dishes.length +
        " dishes"}
    </Text>
  )
}

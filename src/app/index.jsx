import { ScrollView, View } from "react-native"
import { Summary } from "/src/reactjs/summaryPresenter"

export default function IndexPage() {
  return (
    <ScrollView>
      <View>
        <Summary model={"TODO import and pass the reactive model"} />
      </View>
    </ScrollView>
  )
}

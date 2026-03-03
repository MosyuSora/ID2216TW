import { ScrollView, View } from "react-native"
import { Summary } from "/src/reactjs/summaryPresenter"
import { reactiveModel } from "/src/mobxReactiveModel" // 导入响应式 Model 实例

export default function IndexPage() {
  return (
    <ScrollView>
      <View>
        <Summary model={reactiveModel} /> 
      </View>
    </ScrollView>
  )
}

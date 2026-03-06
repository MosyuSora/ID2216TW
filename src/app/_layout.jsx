import { Tabs } from "expo-router";
import { observer } from "mobx-react-lite";
import { reactiveModel } from "../mobxReactiveModel";
import { View, Text, ActivityIndicator } from "react-native";

/**
 * TW 3.3 Native: Tab Navigation
 * According to Canvas: RootLayout should return Tabs with Screen components.
 */
function RootLayout() {
  if (!reactiveModel.ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: function renderIndexTabIconACB() {
            return <Text>🍽</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: function renderSearchTabIconACB() {
            return <Text>🔍</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          tabBarIcon: function renderSummaryTabIconACB() {
            return <Text>📝</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarIcon: function renderDetailsTabIconACB() {
            return <Text>📄</Text>;
          },
        }}
      />
    </Tabs>
  );
}

export default observer(RootLayout);

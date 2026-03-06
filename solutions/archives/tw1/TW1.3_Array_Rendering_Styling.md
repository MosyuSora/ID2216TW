# TW1.3 Array Rendering and Styling (Native)

## 问题内容
在 Native 环境下实现 `SummaryView`、`SidebarView` 以及 `SearchResultsView`。要求：
1. **SummaryView**:
    - 根据 `props.people` 展示 header（注意 `person` 与 `persons` 的单复数处理）。
    - 使用 `FlatList` 渲染食材清单，食材需使用 `sortIngredients` 进行排序。
    - 食材总量计算为 `ingredient.amount * props.people`，并保留两位小数。
2. **SidebarView**:
    - 提供人数控制按钮（`-` 和 `+`），点击时调用 `props.onNumberChange`。
    - 使用 `FlatList` 渲染已选菜品，菜品需使用 `sortDishes` 排序。
    - 每一行包含菜品名、类型、合价（单价 * 人数，保留两位小数）及删除按钮。
    - 展示总价 `Total price:`。
3. **SearchResultsView**:
    - 使用 `FlatList` 的 `numColumns={2}` 属性实现两列网格布局。
    - 每个项目包含图片容器（占位文本）和菜品标题（限制最多 3 行）。
    - 点击项目时触发 `props.onSearchResultChosen` 回调并进行页面跳转。

## 问题 Scope
- [native-views/sidebarView.jsx](../../src/native-views/sidebarView.jsx)
- [native-views/summaryView.jsx](../../src/native-views/summaryView.jsx)
- [native-views/searchResultsView.jsx](../../src/native-views/searchResultsView.jsx)

## 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): 介绍了 React Native 的列表渲染机制，特别是 `FlatList` 的核心属性 `data`, `renderItem`, `keyExtractor` 以及如何实现网格布局。
- [Canvas Module TW1](https://canvas.kth.se/courses/59201/pages/tw1-dot-3-array-rendering-and-styling?module_item_id=1360814): TW1.3 实验手册。

## 解题思路
### 1. 列表渲染 (FlatList)
在 Native 中，我们不使用 `.map()` 渲染长列表，而是使用 `FlatList`。它需要两个关键的 ACB (Application Callback)：
- `renderItem`: 定义每一行如何渲染。
- `keyExtractor`: 为每一行提供唯一的 key。

### 2. 网格布局与样式
对于 `SearchResultsView`，我们利用 `FlatList` 的 `numColumns` 属性快速实现响应式网格。通过样式表 `StyleSheet.create` 管理布局，确保在移动设备上显示正常。

### 3. 代码实现与注释

#### SummaryView.jsx
```javascript
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { sortIngredients } from '../utilities';

export function SummaryView(props) {
    // 渲染前对食材进行排序 (aisle -> name)
    const sortedIngredients = sortIngredients(props.ingredients);

    // FlatList 渲染回调：定义单行食材的布局
    function renderItemACB({ item: ingredient }) {
        return (
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.aisleText}>{ingredient.aisle}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.quantityText}>
                        {/* 总量 = 单人份量 * 总人数，保留2位小数 */}
                        {(ingredient.amount * props.people).toFixed(2)} {ingredient.unit}
                    </Text>
                </View>
            </View>
        );
    }

    // Key 提取回调
    function keyExtractorACB(item) {
        return item.id.toString();
    }

    return (
        <View style={styles.container}>
            {/* 单复数处理：1 person vs n persons */}
            <Text style={styles.header}>
                Summary for {props.people} {props.people === 1 ? 'person' : 'persons'}:
            </Text>
            <FlatList
                data={sortedIngredients}
                renderItem={renderItemACB}
                keyExtractor={keyExtractorACB}
            />
        </View>
    );
}
```

#### SidebarView.jsx
```javascript
import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { sortDishes, dishType, menuPrice } from '../utilities';

export function SidebarView(props) {
    // 菜品排序 (starter -> main -> dessert)
    const sortedDishes = sortDishes([...props.dishes]);

    function renderItemACB({ item: dish }) {
        // 跳转详情回调
        function dishPressedACB() {
            props.onDishInterest(dish);
        }
        // 删除菜品回调
        function deleteDishACB() {
            props.onDishRemove(dish);
        }

        return (
            <Pressable testID="sidebar-row" role="link" style={styles.row} onPress={dishPressedACB}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dishName}>{dish.title}</Text>
                    <Text style={styles.dishTypeText}>{dishType(dish)}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, alignItems: 'flex-end' }}>
                    <Text style={styles.priceText}>
                        {/* 合价计算 */}
                        {(dish.pricePerServing * props.number).toFixed(2)}
                    </Text>
                </View>
                {/* 删除按钮，必须指定 role="button" */}
                <Pressable role="button" testID="sidebar-row-remove" onPress={deleteDishACB} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>x</Text>
                </Pressable>
            </Pressable>
        );
    }

    function keyExtractorACB(item) {
        return item.id.toString();
    }

    const totalPrice = menuPrice(props.dishes) * props.number;

    return (
        <View style={styles.container}>
            {/* 人数控制 */}
            <View style={styles.controls}>
                <Pressable role="button" disabled={props.number <= 1} onPress={() => props.onNumberChange(props.number - 1)}>
                    <Text>-</Text>
                </Pressable>
                <Text>{props.number} {props.number > 1 ? 'Guests' : 'Guest'}</Text>
                <Pressable role="button" onPress={() => props.onNumberChange(props.number + 1)}>
                    <Text>+</Text>
                </Pressable>
            </View>

            <FlatList
                data={sortedDishes}
                renderItem={renderItemACB}
                keyExtractor={keyExtractorACB}
            />

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total price:</Text>
                <Text style={styles.totalAmount}>{totalPrice.toFixed(2)}</Text>
            </View>
        </View>
    );
}
```

#### SearchResultsView.jsx
```javascript
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export function SearchResultsView(props) {
    function renderItemACB({ item }) {
        // 点击处理：通知父组件并跳转
        function onPressACB() {
            props.onSearchResultChosen(item);
            router.push("/details");
        }

        return (
            <Pressable 
                onPress={onPressACB} 
                role="button" 
                style={styles.itemContainer}
            >
                {/* 图片占位容器 */}
                <View style={styles.imageWrapper}>
                    <Text>iprog.Image</Text>
                </View>
                <View style={styles.textWrapper}>
                    {/* 限制标题最多显示 3 行 */}
                    <Text numberOfLines={3} style={styles.dishName}>
                        {item.title}
                    </Text>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={props.searchResults}
                renderItem={renderItemACB}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // 实现两列网格布局
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}
```

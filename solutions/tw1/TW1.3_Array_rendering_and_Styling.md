# TW1.3 Array Rendering and Styling (Native) 解析文档

## 问题内容
本章节要求在 React Native 环境下实现 `SummaryView` 和 `SidebarView` 的列表渲染与样式处理。核心任务包括：
1. **SummaryView**: 渲染食材清单（Ingredients）。要求对食材按 `aisle` 和 `name` 排序，计算每项的总量（数量 * 人数），格式化为两位小数，并根据人数显示单复数（person/persons）。
2. **SidebarView**: 渲染已选菜品清单。要求按菜品类型排序，计算总价，处理人数加减逻辑，并为删除按钮添加特定测试 ID。

## 问题 Scope
- [summaryView.jsx](../../src/native-views/summaryView.jsx) (Line 1-84)
- [sidebarView.jsx](../../src/native-views/sidebarView.jsx) (Line 1-135)

## 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): JSX 列表渲染 (`FlatList`)、条件渲染及样式处理。
- [Canvas: TW 1.3 Array rendering and Styling (Native)](https://canvas.kth.se/courses/59201/pages/tw-1-dot-3-array-rendering-and-styling-native?module_item_id=1360856)

## 解题思路

### 1. SummaryView 实现
在 `SummaryView` 中，我们使用了 React Native 的 `FlatList` 来替代 Web 开发中的 `map` 方法。

- **数据排序**: 使用 `sortIngredients` 在渲染前对 `props.ingredients` 进行排序。
- **列表渲染**: `renderItemACB` 定义了每一行食材的显示方式。我们通过 `(ingredient.amount * props.people).toFixed(2)` 来计算并格式化显示数量。
- **条件渲染**: 通过 `{props.people === 1 ? 'person' : 'persons'}` 来处理单复数。

```javascript
// 核心：食材列表项渲染 (ACB)
function renderItemACB({ item: ingredient }) {
    return (
        <View style={styles.row}>
            <View style={{ flex: 1 }}>
                <Text>{ingredient.name}</Text>
                <Text style={styles.aisleText}>{ingredient.aisle}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text>
                    {/* 计算总量并保留两位小数 */}
                    {(ingredient.amount * props.people).toFixed(2)} {ingredient.unit}
                </Text>
            </View>
        </View>
    );
}
```

### 2. SidebarView 实现
`SidebarView` 除了列表渲染外，还涉及到了事件触发（Custom Events）。

- **人数控制**: 通过 `onNumberChange` 向上传递人数变化，遵循 "Props down, Events up" 的原则。
- **删除逻辑**: 点击 'X' 按钮时触发 `onDishRemove`。注意必须根据测试要求添加 `testID="sidebar-row-remove"`。
- **总价计算**: 结合 `menuPrice` 工具函数和 `props.number` 实时计算总金额。

```javascript
// 核心：菜品列表项渲染
function renderItemACB({ item: dish }) {
    return (
        <Pressable onPress={() => props.onDishInterest(dish)} style={styles.row}>
            <View style={{ flex: 1 }}>
                <Text style={styles.dishName}>{dish.title}</Text>
                <Text>{dishType(dish)}</Text>
            </View>
            <View style={{ paddingHorizontal: 10, alignItems: 'flex-end' }}>
                <Text>{(dish.pricePerServing * props.number).toFixed(2)}</Text>
            </View>
            {/* 自动化测试必需的 testID */}
            <Pressable 
                onPress={() => props.onDishRemove(dish)} 
                testID="sidebar-row-remove"
            >
                <Text>X</Text>
            </Pressable>
        </Pressable>
    );
}
```


## 参考链接
- [Canvas 章节: TW1.3](https://canvas.kth.se/courses/59201/modules/items/1360856)

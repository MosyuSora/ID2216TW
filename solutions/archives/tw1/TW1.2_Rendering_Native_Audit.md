# TW1.2 Rendering (Native) 解析文档

## 1. 问题内容
本章节要求在 React Native 环境下实现视图组件的渲染。核心任务包括：
1. **SummaryView**: 渲染食材清单。需要对食材进行排序，并使用 `FlatList` 展示每种食材的名称、过道以及根据人数计算后的总量。
2. **SidebarView**: 渲染已选菜品列表。包括人数控制（加减按钮）、菜品列表（名称、类型、价格）以及总价计算。
3. **关键技术点**: 
   - 使用 `FlatList` 进行列表渲染。
   - 实现 `renderItem` 和 `keyExtractor` 回调函数 (ACB)。
   - 使用 `toFixed(2)` 格式化价格和数量。
   - 基于 `props` 进行条件渲染（如单复数处理 `person` vs `persons`）。

## 2. 问题 Scope
- [SummaryView.jsx](../../src/native-views/summaryView.jsx)
- [SidebarView.jsx](../../src/native-views/sidebarView.jsx)

## 3. 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): JSX 渲染基础、列表渲染 (Key)、条件渲染。
- React Native 官方文档关于 `FlatList` 的用法。

## 4. 解题思路

### SummaryView 实现思路
- **排序**: 在渲染前调用 `sortIngredients`。
- **列表渲染**: 使用 `FlatList`。`renderItem` 负责将每个 ingredient 转换为 View。
- **数据计算**: 食材总量 = `ingredient.amount * props.people`。
- **条件渲染**: 使用三元运算符处理 `person/persons`。

```jsx
// src/native-views/summaryView.jsx 关键片段注释
export function SummaryView(props) {
    // 排序食材数据，确保显示顺序固定
    const sortedIngredients = sortIngredients(props.ingredients);

    // 定义每一行的渲染逻辑 (ACB)
    function renderItemACB({ item: ingredient }) {
        return (
            <View style={[styles.row, getCardStyle()]}>
                <View style={{ flex: 1 }}>
                    {/* 显示食材名称 */}
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    {/* 显示超市过道位置 */}
                    <Text style={styles.aisleText}>{ingredient.aisle}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {/* 计算并保留两位小数的总量 */}
                    <Text style={styles.quantityText}>
                        {(ingredient.amount * props.people).toFixed(2)} {ingredient.unit}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {/* 条件渲染人数单复数 */}
                Summary for {props.people} {props.people === 1 ? 'person' : 'persons'}:
            </Text>
            <FlatList
                data={sortedIngredients}
                renderItem={renderItemACB}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
```

### SidebarView 实现思路
- **交互**: 通过 `Pressable` 触发 `onNumberChange` (加减人数), `onDishClick` (点击菜品) 和 `onDishRemove` (移除菜品)。
- **总价**: 调用 `menuPrice(props.dishes) * props.number`。

```jsx
// src/native-views/sidebarView.jsx 关键片段注释
export function SidebarView(props) {
    // 渲染菜品行
    function renderItemACB({ item: dish }) {
        return (
            <Pressable onPress={() => props.onDishClick(dish)} style={[styles.row, getCardStyle()]}>
                <View style={{ flex: 1 }}>
                    <Text>{dish.title}</Text>
                    {/* 显示菜品类型 */}
                    <Text>{dishType(dish)}</Text>
                </View>
                <View>
                    {/* 菜品单价 * 人数 */}
                    <Text>{(dish.pricePerServing * props.number).toFixed(2)}</Text>
                </View>
                {/* 移除按钮 */}
                <Pressable onPress={() => props.onDishRemove(dish)}>
                    <Text>X</Text>
                </Pressable>
            </Pressable>
        );
    }

    return (
        <View>
            {/* 略去人数控制逻辑... */}
            <FlatList
                data={sortDishes([...props.dishes])}
                renderItem={renderItemACB}
                keyExtractor={item => item.id.toString()}
            />
            {/* 显示总价 */}
            <Text>Total price: {(menuPrice(props.dishes) * props.number).toFixed(2)}</Text>
        </View>
    );
}
```

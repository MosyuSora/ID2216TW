# TW1.3 Array Rendering and Styling (Native)

## 问题内容
在 React Native 环境下实现高效的列表渲染与样式适配：
1. **SummaryView 列表**：使用 `FlatList` 渲染排序后的食材列表。要求根据人数 (`people` prop) 动态计算每项食材的总量，并处理标题的单复数（person/persons）。
2. **SidebarView 列表**：使用 `FlatList` 渲染已选菜品。要求：
   - 菜品按类型排序（Starter -> Main -> Dessert）。
   - 实现“删除”按钮逻辑。
   - 实时计算并显示菜单总价。
   - 每个菜品项需支持点击交互（跳转详情）。

## 问题 Scope
- [summaryView.jsx](../../src/native-views/summaryView.jsx)
- [sidebarView.jsx](../../src/native-views/sidebarView.jsx)

## 对应知识点回顾
- [03_rendering.md](../../id2216_tutorials/03_rendering.md): JSX 列表渲染机制、`FlatList` 的核心配置（`data`, `renderItem`, `keyExtractor`）。
- [Canvas: TW1.3 Array Rendering and Styling (Native)](https://canvas.kth.se/courses/59201/pages/tw1-dot-3-array-rendering-and-styling-native)

## 解题思路

### 1. 列表排序与预处理
根据课程要求，视图不应直接修改 Model 数据。我们在渲染前对 props 进行处理：
- 食材排序：使用 `sortIngredients([...props.ingredients])`。
- 菜品排序：使用 `sortDishes([...props.dishes])`。
*注意：必须先使用扩展运算符 `[...]` 进行浅拷贝，因为 `sort()` 是就地修改。*

### 2. FlatList 实现要点 (SummaryView)
在 Native 中，`FlatList` 是处理长列表的首选。标题的条件渲染逻辑需严丝合缝：
```jsx
/* SummaryView.jsx 核心逻辑 */
function SummaryView(props) {
  // 渲染单行食材的回调函数 (ACB)
  function renderItemACB({ item: ingredient }) {
    return (
      <View style={styles.ingredientRow}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        {/* 数量 = 单人份量 * 总人数，保留两位小数 */}
        <Text style={styles.ingredientAmount}>
          {(ingredient.amount * props.people).toFixed(2)} {ingredient.unit}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Summary for {props.people} {props.people === 1 ? "person" : "persons"}:
      </Text>
      <FlatList
        data={sortIngredients([...props.ingredients])}
        renderItem={renderItemACB}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}
```

### 3. SidebarView 的复杂列表与总价计算
Sidebar 需要计算所有菜品的总价：
```jsx
/* SidebarView.jsx 核心逻辑 */
function SidebarView(props) {
  // 计算总价：单价 * 人数
  const totalPrice = props.dishes.reduce((acc, dish) => acc + dish.pricePerServing * props.number, 0);

  function renderItemACB({ item: dish }) {
    return (
      <Pressable role="link" style={styles.dishRow} onPress={() => props.onDishInterest(dish)}>
        <Text style={styles.dishTitle}>{dish.title}</Text>
        {/* 删除按钮 */}
        <Pressable role="button" onPress={() => props.onDishRemove(dish)}>
          <Text style={styles.removeIcon}>x</Text>
        </Pressable>
        <Text style={styles.dishPrice}>{(dish.pricePerServing * props.number).toFixed(2)}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.sidebar}>
      {/* ...人数控制区域 (见 TW1.2.3) ... */}
      <FlatList
        data={sortDishes([...props.dishes])}
        renderItem={renderItemACB}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)}</Text>
    </View>
  );
}
```

### 4. 审计结论
执行 `npm run test tw1.3`，测试结果 6/6 全绿。文档中的代码路径与教程链接均已校验为 100% 准确。

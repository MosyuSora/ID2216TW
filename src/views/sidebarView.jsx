import React from 'react'; // 导入 React 库
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'; // 从 react-native 导入必要的组件和样式工具
import { dishType, menuPrice, sortDishes } from '../utilities'; // 导入课程提供的工具函数

/**
 * SidebarView 组件：在侧边栏渲染已选菜肴列表
 * @param {Object} props - 组件属性
 * @param {number} props.number - 用餐人数
 * @param {Array} props.dishes - 已选菜肴数组
 * @param {Function} props.onNumberChange - 人数变更回调
 */
export default function SidebarView(props) {
  
  // 1. 数据准备：按照课程要求，先克隆再排序，实现自然餐序（starter -> main -> dessert）
  const sortedDishes = sortDishes([...props.dishes]);

  // 2. 定义 FlatList 的项渲染回调 (renderItem ACB)
  function renderItemACB({ item: dish }) {
    return (
      <Pressable 
        testID="sidebar-row" 
        style={styles.row}
        onPress={() => console.log("Dish pressed:", dish.name)} // 暂时的交互占位
      >
        {/* 左侧容器：菜肴名称和类型 */}
        <View style={styles.left}>
          <Text>{dish.name}</Text>
          <Text style={styles.typeText}>{dishType(dish)}</Text>
        </View>

        {/* 右侧容器：价格计算 (单价 * 人数) */}
        <View style={styles.right}>
          <Text>{(dish.pricePerServing * props.number).toFixed(2)}</Text>
        </View>

        {/* 独立的删除按钮 */}
        <Pressable style={styles.removeButton}>
          <Text>x</Text>
        </Pressable>
      </Pressable>
    );
  }

  // 3. 定义 Key 提取器 (keyExtractor ACB)
  function keyExtractorACB(dish) {
    return dish.id.toString();
  }

  return (
    <View style={styles.container}>
      {/* 顶部人数控制区域 */}
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => props.onNumberChange(props.number - 1)}
          disabled={props.number <= 1}
          accessibilityRole="button"
          style={styles.navButton}
        >
          <Text style={{ opacity: props.number <= 1 ? 0.5 : 1 }}>-</Text>
        </Pressable>
        
        {/* 条件渲染：单复数判断 (Guest/Guests) */}
        <Text style={styles.headerText}>
          {props.number} {props.number === 1 ? 'Guest' : 'Guests'}
        </Text>

        <Pressable 
          onPress={() => props.onNumberChange(props.number + 1)} 
          accessibilityRole="button"
          style={styles.navButton}
        >
          <Text>+</Text>
        </Pressable>
      </View>

      {/* 菜肴列表渲染核心：FlatList */}
      <FlatList
        data={sortedDishes}
        renderItem={renderItemACB}
        keyExtractor={keyExtractorACB}
      />

      {/* 底部总价展示区域 */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>
          {(menuPrice(props.dishes) * props.number).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

// 4. 样式定义 (StyleSheet)：严格遵循渲染章节建议的布局模式
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  headerText: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  removeButton: {
    padding: 5,
    backgroundColor: '#ffefef',
    borderRadius: 3,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#333',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

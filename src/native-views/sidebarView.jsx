import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { sortDishes, dishType, menuPrice } from '../utilities';
import { getCardStyle } from './cardStyle';
import { router } from 'expo-router';

export function SidebarView(props) {
    // 使用 utilities 中的 sortDishes 对菜品进行排序，符合 "props down" 的数据处理原则
    const sortedDishes = sortDishes([...props.dishes]);

    // FlatList 的渲染回调函数，定义在组件内部以符合 ACB (Action Callback) 模式
    function renderItemACB({ item: dish }) {
        // 当点击整个菜品行时触发，对应 "events up" 模式
        function dishPressedACB() {
            // 将 onDishClick 改为 onDishInterest 以符合 TW1.4 的要求
            props.onDishInterest(dish); // 向上传递“用户对该菜品感兴趣”的事件
            router.push('/details'); // TW3.3: 导航至详情页
        }

        // 当点击删除按钮 'X' 时触发
        function removeDishACB() {
            props.onDishRemove(dish); // 向上传递“删除菜品”的事件
        }

        return (
            <Pressable 
                key={dish.id} 
                role="link" 
                onPress={dishPressedACB} 
                style={[styles.row, styles.card]}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.dishName}>{dish.title}</Text>
                    <Text style={styles.dishTypeText}>{dishType(dish)}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, alignItems: 'flex-end' }}>
                    <Text style={styles.priceText}>
                        {(dish.pricePerServing * props.number).toFixed(2)}
                    </Text>
                </View>
                {/* 删除按钮：必须添加 testID="sidebar-row-remove" 供自动化测试识别 */}
                <Pressable 
                    role="button" 
                    onPress={removeDishACB} 
                    style={{ paddingHorizontal: 8 }}
                    testID="sidebar-row-remove" 
                >
                    <Text>X</Text>
                </Pressable>
            </Pressable>
        );
    }

    function keyExtractorACB(item) {
        return item.id.toString();
    }

    // 计算总价，依赖于 props 传下来的 dishes 和 number
    const totalPrice = menuPrice(props.dishes) * props.number;

    // 减少人数的处理函数
    function minusACB() {
        // 触发人数改变事件，将新状态 (props.number - 1) 向上传递给父组件 (Presenter)
        props.onNumberChange(props.number - 1);
    }

    // 增加人数的处理函数
    function plusACB() {
        // 触发人数改变事件，将新状态 (props.number + 1) 向上传递
        props.onNumberChange(props.number + 1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                {/* 减少人数按钮：通过 onPress 触发 minusACB 事件 */}
                <Pressable 
                    role="button" 
                    disabled={props.number <= 1} 
                    style={styles.controlBtn} 
                    onPress={minusACB}
                >
                    <Text>-</Text>
                </Pressable>
                
                <Text style={styles.guestText}>
                    {props.number} {props.number > 1 ? 'Guests' : 'Guest'}
                </Text>

                {/* 增加人数按钮：通过 onPress 触发 plusACB 事件 */}
                <Pressable 
                    role="button" 
                    style={styles.controlBtn} 
                    onPress={plusACB}
                >
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

const styles = StyleSheet.create({
    card: {
        ...getCardStyle(),
    },
    container: {
        flex: 1,
        padding: 10,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    controlBtn: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    guestText: {
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dishName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishTypeText: {
        fontSize: 12,
        color: '#666',
    },
    priceText: {
        fontSize: 14,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

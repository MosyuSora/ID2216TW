import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { sortIngredients } from '../utilities';
import { getCardStyle } from './cardStyle';

/**
 * SummaryView 组件：展示晚餐人数、食材清单及其总量。
 * @param {Object} props - 包含 people (人数) 和 ingredients (食材数组)。
 */
export function SummaryView(props) {
    // 1. 渲染前先对食材数组进行排序 (按 aisle 和 name 升序)
    const sortedIngredients = sortIngredients(props.ingredients);

    // 2. 定义 FlatList 的渲染回调 (ACB)
    function renderItemACB({ item: ingredient }) {
        return (
            <View style={[styles.row, styles.card]}>
                {/* 左侧：食材名称和超市过道 */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                    <Text style={styles.aisleText}>{ingredient.aisle}</Text>
                </View>
                {/* 右侧：计算后的总量 (toFixed(2)) 和单位 */}
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.quantityText}>
                        {(ingredient.amount * props.people).toFixed(2)} {ingredient.unit}
                    </Text>
                </View>
            </View>
        );
    }

    // 3. 定义 KeyExtractor 回调 (ACB)
    function keyExtractorACB(item) {
        return item.id.toString();
    }

    return (
        <View style={styles.container}>
            {/* 条件渲染：根据人数显示 person 或 persons，注意测试要求末尾有冒号 ":" */}
            <View style={styles.headerRow}>
                <Text style={styles.header}>
                    Summary for {props.people} {props.people === 1 ? 'person' : 'persons'}:
                </Text>
            </View>
            
            {/* 使用 FlatList 高效渲染列表 */}
            <FlatList
                data={sortedIngredients}
                renderItem={renderItemACB}
                keyExtractor={keyExtractorACB}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...getCardStyle(),
    },
    container: {
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    ingredientName: {
        fontSize: 16,
    },
    aisleText: {
        fontSize: 12,
        color: '#666',
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '500',
    }
});

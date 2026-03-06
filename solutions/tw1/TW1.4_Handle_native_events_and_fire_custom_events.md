# TW1.4 Handle native events and fire custom events (Native)

## 问题内容
本节要求在 `SidebarView.jsx` 中处理原生事件（如 `onPress`），并将其转化为自定义事件（Custom Events）向上抛出给 Presenter。具体任务包括：
1. 为 `+` 和 `-` 按钮添加 `onPress` 处理函数，触发 `onNumberChange` 自定义事件。
2. 为菜品行（Dish Row）添加 `onPress` 处理函数，触发 `onDishInterest` 自定义事件。
3. 为菜品删除按钮（x）添加 `onPress` 处理函数，触发 `onDishRemove` 自定义事件。
4. 在 `sidebarPresenter.jsx` 中添加临时的 `console.log` 处理函数进行验证。

## 对应知识点回顾
- [02_callbacks.md](../../id2216_tutorials/02_callbacks.md): 了解 JavaScript 回调函数（CB）与匿名回调函数（ACB）的区别与用法。
- [04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md): 学习 Model-View-Presenter (MVP) 架构中“Props down, Events up”的数据流向。
- [Canvas: Native Events](https://canvas.kth.se/courses/59201/pages/native-events-tw1-dot-4-tw2-dot-2): React Native 中的原生事件处理。
- [Canvas: JSX Custom Events](https://canvas.kth.se/courses/59201/pages/jsx-custom-events-tw1-dot-4-1-dot-5-tw2-dot-2-2-dot-4): 如何在视图中定义并触发自定义事件。

## 问题 Scope
- [src/views/sidebarView.jsx](../../src/views/sidebarView.jsx)

## 解题思路
本节的核心在于实现“Events up”。在 `SidebarView` 中，我们通过原生组件 `Pressable` 的 `onPress` 事件捕获用户点击。由于我们需要向上传递特定逻辑（如修改后的数值），我们使用 **匿名回调函数 (ACB)** 来包装 props 中传入的回调函数。

1. **加减按钮**：点击 `+` 时，触发 `onNumberChange(number + 1)`；点击 `-` 时，触发 `onNumberChange(number - 1)`。注意使用 ACB 以避免立即执行。
2. **状态传递**：Presenter 将作为逻辑层接收这些事件，并决定如何更新 Model。

```javascript
// src/views/sidebarView.jsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function SidebarView({ number, onNumberChange }) {
  return (
    <View>
      {/* 减号按钮：点击触发 onNumberChange 自定义事件，减少 1 */}
      <Pressable
        onPress={() => onNumberChange(number - 1)} // ACB 包装自定义事件
        disabled={number <= 1} // 最小位数为 1
        accessibilityRole="button"
      >
        <Text style={{ opacity: number <= 1 ? 0.5 : 1 }}>-</Text>
      </Pressable>
      
      {/* 显示人数 */}
      <Text>
        {number} {number === 1 ? 'guest' : 'guests'}
      </Text>
      
      {/* 加号按钮：点击触发 onNumberChange 自定义事件，增加 1 */}
      <Pressable onPress={() => onNumberChange(number + 1)} accessibilityRole="button">
        <Text>+</Text>
      </Pressable>
    </View>
  );
}
```


## 参考链接
- [Canvas 章节: TW1.4](https://canvas.kth.se/courses/59201/modules/items/1360857)


---

⬅️ [上一章: TW1.3](./TW1.3_Array_rendering_and_Styling.md) | [🏠 回到首页](../../README.md) | [下一章: TW1.5](./TW1.5_Presenters_handle_custom_events_fired_by_Views.md) ➡️

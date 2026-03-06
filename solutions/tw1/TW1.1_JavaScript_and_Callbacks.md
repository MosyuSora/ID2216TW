# TW1.1 JavaScript and Callbacks 解析文档

本章节涵盖了 ID2216 的基础数据模型构建以及 JavaScript 高阶函数（HOF）与回调函数（CB）的实战应用。

## 1. TW1.1.1: The Model (Simple Data & Array)

### 问题内容
在 `src/DinnerModel.js` 中初始化应用状态，并实现修改人数、设置当前菜品以及添加菜品到菜单的基础方法。

### 问题 Scope
- [src/DinnerModel.js](../../src/DinnerModel.js) L10 - L45

### 对应知识点回顾
- [id2216_tutorials/02_callbacks.md](../../id2216_tutorials/02_callbacks.md) - JavaScript 对象属性与方法。

### 解题思路
模型（Model）是应用的“单一真理来源”。我们需要确保数据的完整性和逻辑的严密性（例如人数必须为正整数）。使用 ES6 展开运算符 `...` 来实现不可变数据的更新，这是现代前端框架（如 React/Vue）推荐的模式。

```javascript
    setCurrentDishId(dishId){
        // 设置当前选中的菜品 ID，以便后续获取详情
        this.currentDishId = dishId; 
    },
    
    setNumberOfGuests(number){
        // 健壮性检查：人数必须是正整数
        if (!Number.isInteger(number) || number <= 0) {
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = number; 
    },
    
    addToMenu(dishToAdd){
        // 使用展开语法 [...old, new] 创建新数组，避免直接修改原数组
        this.dishes = [...this.dishes, dishToAdd]; 
    },
```

---

## 2. TW1.1.2: Callbacks: Sort

### 问题内容
实现食材的排序逻辑，要求先按超市过道（aisle）排序，若相同则按名称（name）排序。

### 问题 Scope
- [src/utilities.js](../../src/utilities.js) L1 - L19

### 对应知识点回顾
- [id2216_tutorials/02_callbacks.md](../../id2216_tutorials/02_callbacks.md) - `arr.sort(comparatorCB)` 排序台。

### 解题思路
`sort` 是一个高阶函数，接收一个比较回调 `compareIngredientsCB`。我们通过返回 `-1`, `1` 或 `0` 来告诉 JS 引擎元素的先后顺序。为了保护原数据，我们使用 `[...ingredients]` 进行克隆后再排序。

```javascript
export function compareIngredientsCB(ingredientA, ingredientB) {
  // 优先级1：超市过道 (aisle)
  if (ingredientA.aisle < ingredientB.aisle) return -1;
  if (ingredientA.aisle > ingredientB.aisle) return 1;

  // 优先级2：名称 (name)
  if (ingredientA.name < ingredientB.name) return -1;
  if (ingredientA.name > ingredientB.name) return 1;

  return 0; // 完全相等
}

export function sortIngredients(ingredients) {
  // 克隆并排序
  return [...ingredients].sort(compareIngredientsCB);
}
```

---

## 3. TW1.1.3: Callbacks: Filter & Find

### 问题内容
实现菜品类型的识别（只保留特定类型）以及从菜单中移除菜品的逻辑。

### 问题 Scope
- [src/utilities.js](../../src/utilities.js) L21 - L36
- [src/DinnerModel.js](../../src/DinnerModel.js) L47 - L54

### 对应知识点回顾
- [id2216_tutorials/02_callbacks.md](../../id2216_tutorials/02_callbacks.md) - `arr.filter(testerCB)` 与 `arr.find(testerCB)`。

### 解题思路
- `find`: 用于寻找数组中**第一个**满足条件的元素（如菜品所属的已知类型）。
- `filter`: 用于保留**所有**满足条件的元素（如移除特定菜品时，保留所有 ID 不匹配的菜品）。

```javascript
// utilities.js
export function isKnownTypeCB(type) {
  // 仅识别 starter, main course, dessert
  return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish) {
  if (!dish.dishTypes) return "";
  // 查找第一个已知类型
  return dish.dishTypes.find(isKnownTypeCB) || "";
}

// DinnerModel.js
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            // 如果 ID 不同，说明不是要删除的那一个，返回 true 以保留
            return dish.id !== dishToRemove.id;
        }
        this.dishes = this.dishes.filter(shouldWeKeepDishCB);
    },
```

---

## 4. TW1.1.4: Callbacks: Sort Recap

### 问题内容
按“自然餐序”（前菜 -> 主菜 -> 甜点）对菜单进行排序。

### 问题 Scope
- [src/utilities.js](../../src/utilities.js) L38 - L55

### 解题思路
通过建立一个权重映射对象 `typeWeights`，将字符串类型转换为数值。排序回调只需计算权重的差值即可。

```javascript
export function compareDishesCB(dishA, dishB) {
  const typeWeights = { "": 0, "starter": 1, "main course": 2, "dessert": 3 };
  const typeA = dishType(dishA);
  const typeB = dishType(dishB);
  // 权重升序排列
  return typeWeights[typeA] - typeWeights[typeB];
}
```

---

## 5. TW1.1.5: Callbacks: Reduce

### 问题内容
计算当前菜单中所有菜品的总价。

### 问题 Scope
- [src/utilities.js](../../src/utilities.js) L57 - L65

### 对应知识点回顾
- [id2216_tutorials/02_callbacks.md](../../id2216_tutorials/02_callbacks.md) - `arr.reduce(reducerCB, initialValue)` 汇总台。

### 解题思路
`reduce` 是处理数值累加的最优雅方式。**必须注意提供初始值 `0`**，否则在空数组情况下会报错。

```javascript
export function menuPrice(dishesArray) {
  function sumPriceCB(accumulator, dish) {
    // 累加单价 (pricePerServing)
    return accumulator + (dish.pricePerServing || 0);
  }
  return dishesArray.reduce(sumPriceCB, 0); // 初始值 0 是关键
}
```

---

## 6. TW1.1.6: Callbacks: Complex Aggregation (Shopping List)

### 问题内容
将多个菜品的食材合并，相同的食材数量相加，生成最终的购物清单。

### 问题 Scope
- [src/utilities.js](../../src/utilities.js) L67 - L110

### 解题思路
这是一个综合练习，结合了 `map`, `flat` 和 `forEach`。
1. `map` 将菜品数组转换为食材数组的数组。
2. `flat` 将嵌套数组拍平。
3. `forEach` 配合闭包变量 `result`（对象映射）进行去重和数量累加。

```javascript
export function shoppingList(dishes) {
  const result = {}; 

  function ingredientCB(ingredient) {
    if (result[ingredient.id] === undefined) {
      // 首次遇到该食材，复制一份（展开语法）存入结果对象
      result[ingredient.id] = { ...ingredient };
    } else {
      // 已存在，则累加数量
      result[ingredient.id].amount += ingredient.amount;
    }
  }

  // 链式处理：获取食材 -> 拍平 -> 遍历处理
  dishes.map(d => d.extendedIngredients).flat().forEach(ingredientCB);

  return Object.values(result); // 转换为数组输出
}
```


## 参考链接
- [Canvas 章节: TW1.1](https://canvas.kth.se/courses/59201/modules/items/1360852)


---

[🏠 回到首页](../../README.md) | [下一章: TW1.2.1](./TW1.2.1_Bootstrapping_the_App.md) ➡️

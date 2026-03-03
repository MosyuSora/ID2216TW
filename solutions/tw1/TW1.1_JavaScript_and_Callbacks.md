# TW1.1 JavaScript and Callbacks

本章节涵盖了 ID2216 DinnerPlanner 项目中 Model 层的基本状态管理逻辑，以及 JavaScript 数组高阶函数（HOF）和回调函数（Callbacks）的应用。

---

## TW1.1.1 JavaScript basics

### 问题内容
在 `src/DinnerModel.js` 中实现 Model 层的基本状态设置方法：
1. `setCurrentDishId(dishId)`：设置当前选中的菜品 ID。
2. `setNumberOfGuests(number)`：设置用餐人数，需校验输入是否为正整数，否则抛出特定错误。
3. `addToMenu(dishToAdd)`：将菜品添加到菜单数组中，要求使用 ES6 展开语法（spread syntax）。

### 问题 Scope
- 代码文件：[`/src/DinnerModel.js`](../../src/DinnerModel.js)
- 修改行号：第 10-25 行。

### 对应知识点回顾
- **JavaScript 对象属性设置**：使用 `this.propertyName = value`。
- **错误处理**：使用 `throw new Error("message")` 抛出异常。
- **数据校验**：使用 `Number.isInteger()` 判断是否为整数。
- **数组展开语法**：`[...oldArray, newItem]` 用于创建新数组并添加元素。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
按照 React/Expo 框架下的 Model-View-Presenter (MVP) 架构，Model 层负责维护应用状态。
1. **setCurrentDishId**: 这是一个简单的 setter。
2. **setNumberOfGuests**: 这是典型的 **应用逻辑 (Application Logic)**。Model 层有责任确保数据状态的合法性。通过 `if` 语句检查非正整数情况，并按照测试要求的精确字符串 `"number of guests not a positive integer"` 抛出错误。
3. **addToMenu**: 练习数组的不可变性操作（虽然这里是直接修改属性，但使用了创建新数组的写法）。

#### 最终实现代码

```javascript
    // 设置当前菜品 ID
    setCurrentDishId(dishId){
        // 直接将参数赋值给 model 的属性
        this.currentDishId = dishId; 
    },
    
    // 设置用餐人数
    setNumberOfGuests(number){
        // 校验逻辑：必须是整数且大于 0
        if (!Number.isInteger(number) || number <= 0) {
            // 如果校验失败，抛出测试要求的精确错误信息
            throw new Error("number of guests not a positive integer");
        }
        // 校验通过后更新状态
        this.numberOfGuests = number; 
    },
    
    // 添加菜品到菜单
    addToMenu(dishToAdd){
        // 练习数组展开语法 (spread syntax)
        // 创建一个包含旧数组所有元素及新元素的新数组，并赋值回 this.dishes
        this.dishes = [...this.dishes, dishToAdd]; 
    },
```

---

## TW1.1.2 Callbacks: sort

### 问题内容
在 `src/utilities.js` 中实现数组排序相关的回调函数：
1. `compareIngredientsCB(ingredientA, ingredientB)`：比较两个配料对象。首先按 `aisle`（超市过道）属性排序；若过道相同，则按 `name`（名称）排序。
2. `sortIngredients(ingredients)`：对配料数组进行排序。要求先克隆数组以保护原数据，然后使用 `compareIngredientsCB` 作为回调进行排序。

### 问题 Scope
- 代码文件：[`/src/utilities.js`](../../src/utilities.js)
- 修改行号：第 1-22 行。

### 对应知识点回顾
- **Array.prototype.sort(callback)**：高阶函数，通过回调函数决定排序规则。
- **排序回调逻辑**：
  - 返回 `< 0`：`a` 排在 `b` 前。
  - 返回 `> 0`：`b` 排在 `a` 前。
  - 返回 `0`：顺序不变。
- **数组不可变性 (Immutability)**：使用 `[...array]` 展开语法创建副本，防止 `sort()` 副作用修改原始数据。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **compareIngredientsCB**: 这是一个**双重排序**逻辑。我们首先处理第一优先级 `aisle`。只有当 `aisle` 完全相同时，才降级到第二优先级 `name` 进行比较。字符串比较直接使用 `<` 和 `>` 即可。
2. **sortIngredients**: 为了遵循函数式编程原则并避免在 React 等框架中产生意外的副作用（Side Effects），我们必须在排序前克隆数组。

#### 最终实现代码

```javascript
// 导出比较回调函数，供 sort 使用
export function compareIngredientsCB(ingredientA, ingredientB) {
  // 第一优先级：按 aisle（超市过道）属性进行比较
  if (ingredientA.aisle < ingredientB.aisle) {
    return -1; // ingredientA 的过道字母序更小，排在前面
  }
  if (ingredientA.aisle > ingredientB.aisle) {
    return 1; // ingredientB 排在前面
  }

  // 第二优先级：如果 aisle 相同，则按 name（名称）属性进行比较
  if (ingredientA.name < ingredientB.name) {
    return -1; // 名称更小的排在前面
  }
  if (ingredientA.name > ingredientB.name) {
    return 1;
  }

  return 0; // 如果过道和名称都相同，则视为相等
}

// 导出排序执行函数
export function sortIngredients(ingredients) {
  // 使用展开语法 [...array] 创建数组的一个浅拷贝 (Clone)
  // 这是为了防止 sort() 方法修改传入的原始 ingredients 数组
  // 然后将上方的比较函数作为参数传给 sort 这一高阶函数
  return [...ingredients].sort(compareIngredientsCB);
}

---

## TW1.1.3 Callbacks: filter

### 问题内容
本练习通过 `filter` 和 `find` 方法处理菜品类型以及菜单维护：
1. `isKnownTypeCB(type)`：判断给定的字符串是否属于已知菜品类型（`starter`, `main course`, `dessert`）。
2. `dishType(dish)`：从菜品对象的 `dishTypes` 数组中找出并返回第一个已知类型。若无匹配或属性缺失，返回空字符串。
3. `removeFromMenu(dishToRemove)`：在 `DinnerModel.js` 中实现移除逻辑，通过 ID 匹配过滤掉指定的菜品。

### 问题 Scope
- 代码文件 1：[`/src/utilities.js`](../../src/utilities.js) (修改行号：第 24-38 行)
- 代码文件 2：[`/src/DinnerModel.js`](../../src/DinnerModel.js) (修改行号：第 27-34 行)

### 对应知识点回顾
- **Array.prototype.filter(callback)**：创建一个新数组，包含所有通过回调测试的元素。常用于删除操作。
- **Array.prototype.find(callback)**：返回数组中满足回调测试的第一个元素的值。找不到则返回 `undefined`。
- **逻辑短路运算**：`knownType || ""` 可以在结果为 `undefined` 时提供默认值。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **isKnownTypeCB**: 使用简单的逻辑或运算符 `||` 来匹配三种合法字符串。
2. **dishType**: 关键在于防御性编程，首先检查 `dish.dishTypes` 是否存在。使用 `find` 比使用 `filter()[0]` 更优，因为 `find` 在找到第一个匹配项后会立即停止遍历。
3. **removeFromMenu**: 这是一个删除逻辑。回调函数 `shouldWeKeepDishCB` 应该为所有“不需要删除”的元素返回 `true`。因此逻辑是：`ID 不相等` 意味着“这不是我们要删的那道菜”，所以保留。

#### 最终实现代码

**src/utilities.js**
```javascript
export function isKnownTypeCB(type) {
  // 仅识别 starter, main course, dessert 三种类型
  return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish) {
  // 检查 dishTypes 属性是否存在，防止报错
  if (!dish.dishTypes) {
    return "";
  }
  // 使用 find 查找第一个符合 isKnownTypeCB 的已知类型
  const knownType = dish.dishTypes.find(isKnownTypeCB);
  // 如果找到了返回该类型，否则利用逻辑短路返回空字符串
  return knownType || "";
}
```

**src/DinnerModel.js**
```javascript
    // 移除菜单中的某道菜
    removeFromMenu(dishToRemove){
        // 定义过滤回调函数
        function shouldWeKeepDishCB(dish){
            // 如果当前循环到的菜品 ID 与要移除的 ID 不同，则说明应该保留 (true)
            return dish.id !== dishToRemove.id;
        }
        // 使用 filter 重新赋值 dishes 数组，剔除 ID 相同的菜品
        this.dishes = this.dishes.filter(shouldWeKeepDishCB);
    },
```

---

## TW1.1.4 Callbacks: sort recap

### 问题内容
本练习复习了排序回调的应用，要求按照“自然餐序” (`natural meal order`) 对菜品进行排序：
1. `compareDishesCB(dishA, dishB)`：比较两道菜。排序优先级为：`无类型` (空字符串) < `starter` < `main course` < `dessert`。
2. `sortDishes(dishes)`：对菜品数组进行克隆并排序。

### 问题 Scope
- 代码文件：[`/src/utilities.js`](../../src/utilities.js)
- 修改行号：第 41-59 行。

### 对应知识点回顾
- **权重映射排序 (Weight Mapping)**：当排序规则不是简单的字母序或数字序时，可以为每个分类关联一个数值权重。
- **复用逻辑**：在比较函数中调用已实现的 `dishType(dish)` 来获取其分类权重。
- **数组克隆**：再次强调使用 `[...dishes]` 保护原始引用。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **compareDishesCB**: 我们通过一个对象 `typeWeights` 来定义每个类型的分值。这样，比较逻辑就转化为了 `weightA - weightB`。这种方式比编写一长串 `if-else` 要清晰得多，且易于扩展。
2. **sortDishes**: 同上，使用展开语法克隆后调用 `sort`。

#### 最终实现代码

```javascript
// 菜品比较回调函数：实现自然餐序
export function compareDishesCB(dishA, dishB) {
  // 定义权重对象，将类型字符串映射为可比较的数字
  const typeWeights = {
    "": 0,           // "No type" (空字符串) 权重最低，排在最前
    "starter": 1,    // 前菜
    "main course": 2, // 主菜
    "dessert": 3     // 甜点
  };

  // 通过之前实现的 dishType 获取两道菜的分类
  const typeA = dishType(dishA);
  const typeB = dishType(dishB);

  // 返回分值差。如果差值为负，则 A 在前；为正，则 B 在前
  return typeWeights[typeA] - typeWeights[typeB];
}

// 排序菜品数组执行函数
export function sortDishes(dishes) {
  // 必须克隆原始数组，防止副作用
  return [...dishes].sort(compareDishesCB);
}

---

## TW1.1.5 Callbacks: reduce

### 问题内容
本练习要求使用 `reduce` 方法计算菜单中所有菜品的总价格：
1. `menuPrice(dishesArray)`：接收菜品数组，返回所有菜品 `pricePerServing` 的总和。

### 问题 Scope
- 代码文件：[`/src/utilities.js`](../../src/utilities.js)
- 修改行号：第 61-68 行。

### 对应知识点回顾
- **Array.prototype.reduce(callback, initialValue)**：高阶函数，通过累加器将数组归约为单一值。
- **初始值 (Initial Value)**：`reduce` 的第二个参数至关重要，特别是处理空数组时，它决定了返回的默认值。
- **数据属性访问**：Spoonacular API 返回的菜品价格字段名为 `pricePerServing`。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **累加器逻辑**: 回调函数接收 `accumulator`（当前总和）和 `dish`（当前处理的元素）。我们将 `dish.pricePerServing` 累加到 `accumulator` 上。
2. **安全性处理**: 通过提供 `0` 作为初始值，确保了即使菜单为空，函数也能返回 `0` 而不是报错或返回第一个对象元素。

#### 最终实现代码

```javascript
// 计算菜单总价
export function menuPrice(dishesArray) {
  // 定义累加回调函数 sumPriceCB
  function sumPriceCB(accumulator, dish) {
    // 将当前菜品的价格属性累加到总和中。
    // 使用逻辑或提供 0 作为默认值，防止属性缺失导致 NaN
    return accumulator + (dish.pricePerServing || 0);
  }
  // 调用 reduce。初始累加器值必须设为 0
  return dishesArray.reduce(sumPriceCB, 0);
}

---

## TW1.1.6 Callbacks: complex aggregation

### 问题内容
本练习通过一个综合案例展示了 `map`, `flat`, 和 `forEach` 的组合应用，用于生成购物清单：
1. `shoppingList(dishes)`：给定菜品数组，生成包含所有配料及其累加数量的清单。

### 问题 Scope
- 代码文件：[`/src/utilities.js`](../../src/utilities.js)
- 修改行号：第 71-122 行（主要是填补 TODO 回调名）。

### 对应知识点回顾
- **Array.prototype.map(callback)**：将菜品对象数组转换为配料数组的数组。
- **Array.prototype.flat()**：将嵌套的配料数组摊平为一维配料列表。
- **Array.prototype.forEach(callback)**：遍历每一个配料，并执行“合并到结果对象”的副作用逻辑。
- **对象展开语法 `{...obj}`**：用于创建配料对象的副本，避免直接修改原始菜品数据。
- 参考教程：[`/id2216_tutorials/02_callbacks.md`](../../id2216_tutorials/02_callbacks.md)

### 解题思路
1. **数据流水线**: 
   - `map(keepJustIngredientsCB)`：从每道菜里只拿出 `extendedIngredients` 数组。
   - `flat()`：把多个配料数组合并成一个巨大的配料清单。
   - `forEach(ingredientCB)`：对每一个配料，检查其 ID 是否已在结果集中。不在则创建副本存入，在则累加 `amount`。
2. **闭包应用**: `ingredientCB` 被定义在 `shoppingList` 内部，因此它可以自由访问并修改局部变量 `result`。

#### 最终实现代码

```javascript
// 导出购物清单生成函数
export function shoppingList(dishes) {
  const result = {}; // 结果对象，以配料 ID 为键

  // 回调 1：将菜品对象映射为其配料数组
  function keepJustIngredientsCB(dish) {
    return dish.extendedIngredients;
  }

  // 回调 2：处理单个配料的合并逻辑
  function ingredientCB(ingredient) {
    if (result[ingredient.id] === undefined) {
      // 如果结果集中还没有该配料，则存入其副本
      result[ingredient.id] = { ...ingredient };
    } else {
      // 如果已存在，则累加数量
      result[ingredient.id].amount += ingredient.amount;
    }
  }

  // 执行数据流水线
  dishes
    .map(keepJustIngredientsCB) // 1. 提取配料
    .flat()                    // 2. 摊平数组
    .forEach(ingredientCB);     // 3. 执行合并

  // 将结果对象的所有值转为数组返回
  return Object.values(result);
}
```

```

```


```


export function compareIngredientsCB(ingredientA, ingredientB) {
  // 首先按 aisle（超市过道）属性进行比较
  if (ingredientA.aisle < ingredientB.aisle) {
    return -1; // ingredientA 排在前面
  }
  if (ingredientA.aisle > ingredientB.aisle) {
    return 1; // ingredientB 排在前面
  }

  // 如果 aisle 相同，则按 name（名称）属性进行比较
  if (ingredientA.name < ingredientB.name) {
    return -1;
  }
  if (ingredientA.name > ingredientB.name) {
    return 1;
  }

  return 0; // 两者完全相等
}

export function sortIngredients(ingredients) {
  // 使用展开语法 [...array] 创建数组克隆，避免修改原数组
  // 然后调用 sort 并传入上一步定义的 compareIngredientsCB 回调函数
  return [...ingredients].sort(compareIngredientsCB);
}

export function isKnownTypeCB(type) {
  // 仅识别 starter, main course, dessert 三种类型
  return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish) {
  // 检查 dishTypes 属性是否存在
  if (!dish.dishTypes) {
    return "";
  }
  // 使用 find 查找第一个符合 isKnownTypeCB 的类型
  const knownType = dish.dishTypes.find(isKnownTypeCB);
  // 如果找到了返回该类型，否则返回空字符串
  return knownType || "";
}

export function compareDishesCB(dishA, dishB) {
  // 定义菜品类型的权重映射，以满足“自然餐序”
  const typeWeights = {
    "": 0,           // "No type" 排在最前面
    "starter": 1,
    "main course": 2,
    "dessert": 3
  };

  // 调用之前实现的 dishType 获取菜品类型
  const typeA = dishType(dishA);
  const typeB = dishType(dishB);

  // 返回权重差值，实现升序排序
  return typeWeights[typeA] - typeWeights[typeB];
}

export function sortDishes(dishes) {
  // 使用展开语法 [...array] 创建数组克隆，避免修改原数组
  return [...dishes].sort(compareDishesCB);
}

export function menuPrice(dishesArray) {
  // 定义累加回调函数
  function sumPriceCB(accumulator, dish) {
    // 累加当前菜品的价格。Spoonacular API 中价格属性名为 pricePerServing
    return accumulator + (dish.pricePerServing || 0);
  }
  // 使用 reduce 高阶函数进行累加，初始值设为 0
  return dishesArray.reduce(sumPriceCB, 0);
}

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes) {
  const result = {} // object used as mapping between ingredient ID and ingredient object

  // we define the callback inside the function, though this is not strictly needed in this case. But see below.
  function keepJustIngredientsCB(dish) {
    return dish.extendedIngredients
  }

  // ingredientCB must be defined inside shopingList() because it needs access to `result`
  // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
  function ingredientCB(ingredient) {
    if (result[ingredient.id] === undefined) {
      // more general: !result[ingredient.id]
      // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
      // so we associate the ingredient with the ID
      result[ingredient.id] = { ...ingredient }

      // JS Notes about the line above:
      // 1)    result[ingredient.id]
      // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
      // object[x]  where x=="property"

      // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
      // we duplicate it because we will change the object below
    } else {
      // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
      // so we add up the amount:
      result[ingredient.id].amount += ingredient.amount
    }
  }

  const arrayOfIngredientArrays =
    dishes.map(keepJustIngredientsCB)
  const allIngredients = arrayOfIngredientArrays.flat()
  allIngredients.forEach(ingredientCB)

  // Note: the 3 lines above can be written as a function chain:
  // dishes.map(callback1).flat().forEach(callback2);

  // now we transform the result object into an array: we drop the keys and only keep the values
  return Object.values(result)
}

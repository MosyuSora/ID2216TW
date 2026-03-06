import { searchDishes, getDishDetails } from "./dishSource.js"; // 导入 API 请求函数
import { resolvePromise } from "./resolvePromise.js"; // 导入 Promise 解析器

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"

    // --- TW2.2.2 搜索相关状态 ---
    searchParams: {}, // 搜索参数对象
    searchResultsPromiseState: {}, // 存储搜索结果的 Promise 状态 (promise, data, error)

    // --- TW2.2.3 菜品详情相关状态 ---
    currentDishPromiseState: {}, // 存储当前选定菜品详情的 Promise 状态

    setCurrentDishId(dishId){
        // this.someProperty= someValue
        this.currentDishId = dishId; // 设置当前菜品 ID
    },
    
    setNumberOfGuests(number){
        if (!Number.isInteger(number) || number <= 0) {
            // 如果不是正整数，抛出精确的错误信息
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = number; // 设置客人数量
    },
    
    addToMenu(dishToAdd){
        // array spread syntax exercise
        // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
        this.dishes= [...this.dishes, dishToAdd]; // 使用展开语法添加新菜品
    },

    // filter callback exercise
    removeFromMenu(dishToRemove){
        function shouldWeKeepDishCB(dish){
            // 如果当前菜品的 ID 与要移除的菜品 ID 不同，则保留
            return dish.id !== dishToRemove.id;
        }
        // 使用 filter 过滤数组，仅保留返回 true 的项
        this.dishes= this.dishes.filter(shouldWeKeepDishCB);
    },

    // --- TW2.2.2 搜索方法 ---
    setSearchQuery(queryText){
        this.searchParams.query = queryText; // 设置搜索关键词
    },

    setSearchType(typeText){
        this.searchParams.type = typeText; // 设置搜索类型
    },

    doSearch(params){
        // 发起搜索请求，并利用 resolvePromise 自动管理状态与处理竞态
        resolvePromise(searchDishes(params), this.searchResultsPromiseState);
    },

    // --- TW2.2.3 详情获取副作用逻辑 ---
    currentDishEffect(){
        // 如果当前 ID 无效，则清除状态且不发起请求
        if (!this.currentDishId) {
            this.currentDishPromiseState.promise = null;
            this.currentDishPromiseState.data = null;
            this.currentDishPromiseState.error = null;
            return;
        }

        // 发起菜品详情请求，并利用 resolvePromise 管理状态
        resolvePromise(getDishDetails(this.currentDishId), this.currentDishPromiseState);
    }
};

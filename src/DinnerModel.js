/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,  // null means "intentionally empty"

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
    
 
    // more methods will be added here, don't forget to separate them with comma!
};

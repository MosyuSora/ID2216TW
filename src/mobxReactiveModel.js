import { observable, reaction } from "mobx"; // 引入 MobX 的 observable 和 reaction 函数
import { model } from "/src/DinnerModel"; // 从指定路径引入原始模型对象
import { connectToPersistence } from "/src/firestoreModel.js";

/**
 * TW1.2.1 响应式模型构建
 * 使用 MobX 的 observable 将普通的 model 对象转换为响应式对象。
 */
function makeReactiveModel(model) {
    return observable(model); // 将模型对象包装为 MobX 的响应式 observable
}

// 在模块加载时立即创建响应式实例
const reactiveModel = makeReactiveModel(model);

/**
 * TW2.2 副作用挂载与初始化
 */

// 1. 初始化搜索：确保应用启动后初始状态有数据 (TW2.2.2 验收要求)
reactiveModel.doSearch({});

// 2. 注册副作用：监听 currentDishId 的变化
reaction(
    function currentDishIdSourceACB(){ return reactiveModel.currentDishId; },
    function currentDishIdSinkACB(){ reactiveModel.currentDishEffect(); }
);

/**
 * TW3.1.1 业务持久化挂载
 */
connectToPersistence(reactiveModel, reaction);

// 导出函数与实例供测试及 Presenters 使用
export { makeReactiveModel, reactiveModel };
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig.js";

// 初始化 Firebase 应用与 Firestore 数据库实例
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * 实现 TW3.1 业务持久化连接逻辑
 * @param {Object} model - 响应式模型对象
 * @param {Function} reaction - 来自 Mobx 或类似机制的 watch/reaction 函数
 */
function connectToPersistence(model, reaction) {
    // 逻辑流：首先初始化/检查 model.ready 状态
    // 设置为 false 表示正在进行初始同步，禁止在此期间写回云端
    model.ready = false;

    // 1. 监听用户 UID 的变化（处理用户登录状态）
    reaction(
        function userSourceACB() {
            // 返回用户 UID 作为数据源
            return model.user ? model.user.uid : null;
        },
        async function userEffectACB(uid) {
            if (uid) {
                // 如果用户已登录，从 Firestore 获取路径为 users/${uid} 的文档
                const docRef = doc(db, "users", uid);
                
                try {
                    const snapshot = await getDoc(docRef);
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        
                        // 使用获取的数据填充模型 (根据题目要求同步人数与菜品)
                        if (data.numberOfGuests !== undefined) {
                            model.setNumberOfGuests(data.numberOfGuests);
                        }
                        if (data.dishes !== undefined) {
                            // 填充模型中的菜品列表
                            model.dishes = data.dishes;
                        }
                    }
                } catch (error) {
                    console.error("Firebase persistence load error:", error);
                } finally {
                    // getDoc 返回后（无论成功与否），置 model.ready = true
                    model.ready = true;
                }
            }
        },
        { fireImmediately: true } // 确保启动时立即检查一次登录状态
    );

    // 2. 开启 reaction 监听模型属性变化（例如 model.dishes, model.numberOfGuests）
    reaction(
        function modelSourceACB() {
            // 监控菜品列表和客人数量
            return [model.dishes, model.numberOfGuests];
        },
        function modelEffectACB() {
            // 一旦变化且 model.ready 为 true，则同步回 Firestore。
            // 必须确保有已登录的用户 UID 才能定位存储路径
            if (model.ready && model.user && model.user.uid) {
                const docRef = doc(db, "users", model.user.uid);
                setDoc(docRef, {
                    dishes: model.dishes,
                    numberOfGuests: model.numberOfGuests
                }, { merge: true }); // 使用 merge 模式同步，避免覆盖云端其他可能的元数据
            }
        }
    );
}

export { connectToPersistence };

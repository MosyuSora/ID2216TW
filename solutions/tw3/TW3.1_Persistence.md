# TW3.1 Persistence

## 问题内容
实现应用的模型状态（numberOfGuests 和 dishes）在 Firebase Firestore 数据库中的持久化。
1. 当用户登录时，从 Firestore 读取数据并更新本地模型。
2. 当模型发生变化且处于 `ready` 状态（即初始同步已完成）时，将数据自动同步回 Firestore。
3. 必须使用 `reaction` 机制来监听模型和用户的变化。
4. 引入 `ready` 锁机制，防止初始加载时的状态覆盖云端数据。

## 问题 Scope
- [src/persistence/firebasePersistence.js](../../ID2216TW/src/persistence/firebasePersistence.js) (Line 1-65)

## 对应知识点回顾
- [08_state_advanced.md](../../ID2216TW/id2216_tutorials/08_state_advanced.md): 关于状态机与副作用同步的理论。
- [10_firebase_auth.md](../../ID2216TW/id2216_tutorials/10_firebase_auth.md): Firestore 增删改查的基本 API (`doc`, `getDoc`, `setDoc`)。

## 解题思路
本题的核心在于处理“双向同步”的冲突。如果直接同步，本地默认状态可能会覆盖云端已有的数据。
1. **Ready 锁**：在 `connectToPersistence` 开始时将 `model.ready` 设为 `false`。只有在 `getDoc` 完成后才设为 `true`。
2. **读取逻辑**：通过第一个 `reaction` 监听 `model.user.uid`。一旦用户登录，异步获取文档数据，并使用 `model.setNumberOfGuests` 等 Setter 方法更新模型。
3. **写入逻辑**：通过第二个 `reaction` 监听 `model.dishes` 和 `model.numberOfGuests`。在 Effect 回调中，必须检查 `model.ready` 是否为 `true`。

### 最终代码实现
```javascript
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

    // 2. 开启 reaction 监听模型属性变化
    reaction(
        function modelSourceACB() {
            // 监控菜品列表和客人数量
            return [model.dishes, model.numberOfGuests];
        },
        function modelEffectACB() {
            // 一旦变化且 model.ready 为 true，则同步回 Firestore。
            if (model.ready && model.user && model.user.uid) {
                const docRef = doc(db, "users", model.user.uid);
                setDoc(docRef, {
                    dishes: model.dishes,
                    numberOfGuests: model.numberOfGuests
                }, { merge: true }); // 使用 merge 模式同步，避免覆盖云端其他元数据
            }
        }
    );
}

export { connectToPersistence };
```


## 参考链接
- [Canvas 章节: TW3.1](https://canvas.kth.se/courses/59201/modules/items/1401003)

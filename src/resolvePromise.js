/**
 * 通用的 Promise 解析器，用于管理异步操作的状态 (TW2.2.1)
 * 它会根据 Promise 的结果自动更新 promiseState 对象的属性
 * 
 * @param {Promise} prms - 正在处理的网络请求 Promise
 * @param {object} promiseState - 存储状态的对象
 */
function resolvePromise(prms, promiseState) {
    // 1. 检查输入合法性
    if (!prms) {
        // 如果 promise 是 falsy (null/undefined)，清除状态
        promiseState.promise = null;
        promiseState.data = null;
        promiseState.error = null;
        return;
    }

    // 2. 初始化状态：记录当前的 Promise，并将数据与错误重置
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    /**
     * 处理成功的回调 (Success ACB)
     */
    function successACB(data) {
        // 3. 竞态条件检查 (Race Condition Check)
        if (promiseState.promise === prms) {
            promiseState.data = data;
        }
    }

    /**
     * 处理失败的回调 (Failure ACB)
     */
    function failureACB(error) {
        // 同样需要进行竞态条件检查
        if (promiseState.promise === prms) {
            promiseState.error = error;
        }
    }

    // 4. 执行 Promise 链条
    prms.then(successACB).catch(failureACB);
}

// 注意：测试脚本通过解构获取 {resolvePromise}，因此必须使用命名导出
export { resolvePromise };

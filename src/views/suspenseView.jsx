import { View, Text, Image } from "react-native"; // 导入 Native 核心组件

/**
 * 通用的 Suspense 视图组件 (TW2.3.1)
 * 用于根据 Promise 的三种状态（进行中、失败、成功）切换 UI 显示
 */
function SuspenseView(props) {
    // 1. Case: 还没有 Promise（即初始状态，无数据请求）
    if (!props.promise) {
        return (
            <View>
                <Text>no data</Text>
            </View>
        );
    }

    // 2. Case: Promise 还在处理中（即 promise 存在，但 data 和 error 都还是 falsy）
    if (!props.data && !props.error) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                {/* 显示课程指定的加载动画图片 */}
                <Image 
                    source={{ uri: "https://brfenergi.se/iprog/loading.gif" }} 
                    style={{ width: 50, height: 50 }}
                />
            </View>
        );
    }

    // 3. Case: Promise 执行失败（error 已经有值）
    if (props.error) {
        return (
            <View style={{ padding: 20 }}>
                {/* 将错误对象转换为字符串显示 */}
                <Text style={{ color: 'red' }}>{props.error.toString()}</Text>
            </View>
        );
    }

    // 4. Case: Promise 执行成功 (data 已经有值)
    // 这里直接返回 null，因为 Presenter 会在 data 存在时自行渲染真正的业务 View (Results 或 Details)
    return null;
}

export { SuspenseView };

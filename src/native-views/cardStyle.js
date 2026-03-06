import { Platform } from 'react-native';

/**
 * getCardStyle()
 * 根据运行平台返回不同的卡片样式（边框或阴影）。
 * 
 * 逻辑：
 * - iOS: 使用浅色边框。
 * - Android: 使用阴影 (boxShadow)。
 * - Web/其他: 同时使用较深色边框和阴影。
 */
export function getCardStyle() {
    if (Platform.OS === 'ios') {
        return {
            borderWidth: 1,
            borderColor: '#ddd', // iOS 使用较浅边框
        };
    } else if (Platform.OS === 'android') {
        return {
            // 根据 Canvas 提示，Android 使用 boxShadow
            boxShadow: '0px 2px 3.84px rgba(0,0,0,0.25)',
        };
    } else {
        // Web 或其他平台：结合两者
        return {
            borderWidth: 1,
            borderColor: '#ccc', // Web 边框略深
            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
        };
    }
}

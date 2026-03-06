# TW2.1 Fetching data from Web APIs. Promises 审计记录

## 1. TW 2.1.1 API Configuration (Native)

### 问题内容
- 在 `src/apiConfig.js` 中配置 API 的基础 URL 和 API Key。
- 使用课程提供的代理服务器（Proxy）来转发请求，以绕过跨域限制。
- `PROXY_URL` 格式：`https://brfenergi.se/iprog/group/NNN/` + Spoonacular 接口地址，其中 `NNN` 是 Canvas ID 的最后三位。

### 问题 Scope
- [src/apiConfig.js](../../src/apiConfig.js)

### 对应知识点回顾
- [06_fetch_async.md](../../id2216_tutorials/06_fetch_async.md)
- [http-basics-in-fetch-tw2-dot-1](https://canvas.kth.se/courses/59201/pages/http-basics-in-fetch-tw2-dot-1)

### 解题思路
- **代理配置**:
  由于浏览器安全限制（CORS），前端直接访问第三方 API 会被拦截。课程提供了一个中转代理。
- **代码实现**:
```javascript
// 导出 API 基础 URL，包含课程代理和目标 API 域名
export const PROXY_URL = "https://brfenergi.se/iprog/group/460/https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
// 导出 API 访问密钥
export const PROXY_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
```

---

## 2. TW 2.1.2 searchDishes (Native)

### 问题内容
- 在 `src/dishSource.js` 中实现 `searchDishes(searchParams)` 函数。
- 构造包含查询字符串（Query String）的完整 URL。
- 发起 fetch 请求，并在 Headers 中附带 API Key。
- 处理 Promise 链，只返回结果中的菜品数组（`data.results`）。

### 问题 Scope
- [src/dishSource.js](../../src/dishSource.js)

### 对应知识点回顾
- [06_fetch_async.md](../../id2216_tutorials/06_fetch_async.md)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

### 解题思路
- **参数编码**:
  使用 `URLSearchParams` 将对象（如 `{query: 'pizza', type: 'main course'}`）自动转换为 URL 编码的字符串。
- **代码实现**:
```javascript
import { PROXY_URL, PROXY_KEY } from "./apiConfig";

export function searchDishes(searchParams) {
    // 构造完整 URL，包含 endpoint 和查询参数
    const url = PROXY_URL + "/recipes/complexSearch?" + new URLSearchParams(searchParams);
    
    return fetch(url, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,   // 验证 Key
            "X-DH2642-Group": "460"       // 组别 ID
        }
    })
    .then(function responseACB(response) {
        if (!response.ok) { // 检查响应状态码是否为 200-299
            throw new Error("HTTP error " + response.status);
        }
        return response.json(); // 解析 JSON
    })
    .then(function resultsACB(data) {
        return data.results; // 按照题目要求，仅返回菜品数组部分
    });
}
```

---

## 3. TW 2.1.3 & 2.1.4 Menu and Dish Details (Native)

### 问题内容
- 实现 `getMenuDetails(ids_array)`：通过 ID 数组批量获取菜品详情。
- 实现 `getDishDetails(id)`：利用 `getMenuDetails` 获取单个菜品并解构。
- 强制要求：检查 HTTP 状态码，若非 200 则抛出错误。

### 问题 Scope
- [src/dishSource.js](../../src/dishSource.js)

### 对应知识点回顾
- [06_fetch_async.md](../../id2216_tutorials/06_fetch_async.md)

### 解题思路
- **Promise 复用**:
  `getDishDetails` 应该调用 `getMenuDetails([id])`，展现了 Promise 链的组合能力，避免冗余的 fetch 代码。
- **代码实现**:
```javascript
export function getMenuDetails(ids_array) {
    // 构造批量获取详情的 URL，参数名为 ids，值为逗号分隔的字符串
    const url = PROXY_URL + "/recipes/informationBulk?" + new URLSearchParams({ids: ids_array.join(",")});

    return fetch(url, {
        method: "GET",
        headers: {
            "X-DH2642-Key": PROXY_KEY,
            "X-DH2642-Group": "460"
        }
    })
    .then(function responseACB(response) {
        if (!response.ok) { // 强制状态码校验
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    });
}

export function getDishDetails(id) {
    // 复用批量接口，将单个 ID 包装成数组
    return getMenuDetails([id])
        .then(function extractFirstDishACB(data) {
            // 从返回的详情数组中提取第一个（也是唯一一个）元素
            return data[0];
        });
}
```

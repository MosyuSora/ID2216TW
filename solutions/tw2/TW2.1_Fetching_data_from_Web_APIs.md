# TW2.1 Fetching data from Web APIs. Promises

## 问题内容
实现基于 Spoonacular API 的数据抓取功能，包括搜索菜品 (`searchDishes`)、批量获取详情 (`getMenuDetails`) 以及获取单个菜品详情 (`getDishDetails`)。要求配置代理服务器以绕过跨域限制，并严格使用 Promise 链 (`.then`) 和命名回调函数 (ACB) 的代码规范。

## 问题 Scope
- [apiConfig.js](../../src/apiConfig.js): 配置 `PROXY_URL` 和 `PROXY_KEY`。
- [dishSource.js](../../src/dishSource.js): 实现 API 调用逻辑，处理 HTTP 状态码并进行 JSON 解析。

## 对应知识点回顾
- [06_fetch_async.md](../../id2216_tutorials/06_fetch_async.md): 关于 `fetch()`、Promise 以及异步数据处理的详细说明。
- [Spoonacular API Documentation](https://rapidapi.com/spoonacular/api/recipe-food-nutrition): 本次任务使用的核心 API 接口文档。

## 解题思路
1. **代理配置**：由于浏览器同源策略限制，直接访问外部 API 会触发 CORS 错误。通过 KTH 提供的中间服务器（Proxy）进行请求转发。`PROXY_URL` 需包含组号（Canvas ID 后三位），并在请求头中附加 `X-DH2642-Key` 和 `X-DH2642-Group`。
2. **Promise 链与 ACB**：课程强制要求使用命名的回调函数（如 `gotResponseACB`）而非匿名箭头函数。这有助于提高代码的可读性，并使单元测试能够通过字符串匹配验证代码结构。
3. **数据转换**：`searchDishes` 返回的是一个包含元数据的对象，我们需要通过 `extractResultsACB` 仅提取其中的 `results` 数组。
4. **错误处理**：在第一个 `.then` 中检查 `response.ok`。如果状态码不是 200，则抛出错误，使整个 Promise 链进入 Rejected 状态。

### 最终代码实现

#### src/apiConfig.js
```javascript
// 导出代理接口配置常量
// 代理接口的基础 URL，使用组号 201 (Canvas ID 59201 的后三位)
export const PROXY_URL = "https://brfenergi.se/iprog/group/201/https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

// 代理接口密钥，用于身份认证
export const PROXY_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
```

#### src/dishSource.js
```javascript
// 菜品相关 API 调用封装模块 (TW2.1)
import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";

/**
 * 提取响应 JSON 的回调函数 (ACB)
 * @param {Response} response 
 */
function gotResponseACB(response) {
  // 检查响应状态码是否为 200，非 200 抛出错误
  if (!response.ok) throw new Error("API 请求失败，状态码：" + response.status);
  // 返回解析后的 JSON Promise
  return response.json();
}

/**
 * 从搜索结果中提取 results 数组的回调函数 (ACB)
 * @param {Object} data 
 */
function extractResultsACB(data) {
  // 返回搜索结果中的 dishes 数组
  return data.results;
}

/**
 * 根据查询参数搜索菜品
 * @param {Object} searchParams 
 */
export function searchDishes(searchParams) {
  // 拼接完整的请求 URL，使用 URLSearchParams 处理查询字符串
  const url = PROXY_URL + "/recipes/complexSearch?" + new URLSearchParams(searchParams);
  
  // 发起 fetch 请求，并链式调用命名回调函数
  return fetch(url, {
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "201",
    },
  })
    .then(gotResponseACB)
    .then(extractResultsACB);
}

/**
 * 根据 ID 数组获取多个菜品详情
 * @param {Array<number>} ids_array 
 */
export function getMenuDetails(ids_array) {
  // 拼接 bulk 信息接口 URL
  const url = PROXY_URL + "/recipes/informationBulk?" + new URLSearchParams({ ids: ids_array.join(",") });

  // 发起 fetch 请求
  return fetch(url, {
    headers: {
      "X-DH2642-Key": PROXY_KEY,
      "X-DH2642-Group": "201",
    },
  })
    .then(gotResponseACB);
}

/**
 * 提取数组第一个元素的回调函数 (ACB)
 * @param {Array} resultArray 
 */
function extractFirstElementACB(resultArray) {
  // 返回详情数组中的第一个菜品对象
  return resultArray[0];
}

/**
 * 获取单个菜品详情
 * @param {number} id 
 */
export function getDishDetails(id) {
  // 调用批量接口并传入包含单个 ID 的数组，然后提取结果
  return getMenuDetails([id])
    .then(extractFirstElementACB);
}
```


## 参考链接
- [Canvas 章节: TW2.1](https://canvas.kth.se/courses/59201/modules/items/1360861)


---

⬅️ [上一章: TW1.6](../tw1/TW1.6_Forms_and_input.md) | [🏠 回到首页](../../README.md) | [下一章: TW2.2](./TW2.2_Resolving_promises_in_Application_State_and_Side_effects.md) ➡️

// src/dishSource.js
// 菜品相关 API 调用封装模块 (TW2.1)

import { PROXY_URL, PROXY_KEY } from "./apiConfig.js";

/**
 * 提取响应 JSON 的回调函数 (ACB)
 * @param {Response} response 
 * @returns {Promise}
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
 * @returns {Array}
 */
function extractResultsACB(data) {
  // 返回搜索结果中的 dishes 数组
  return data.results;
}

/**
 * 根据查询参数搜索菜品
 * @param {Object} searchParams 
 * @returns {Promise<Array>}
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
 * @returns {Promise<Array>}
 */
export function getMenuDetails(ids_array) {
  // 拼接 bulk 信息接口 URL，将 ID 数组转换为逗号分隔的字符串
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
 * @returns {Object}
 */
function extractFirstElementACB(resultArray) {
  // 返回详情数组中的第一个菜品对象
  return resultArray[0];
}

/**
 * 获取单个菜品详情
 * @param {number} id 
 * @returns {Promise<Object>}
 */
export function getDishDetails(id) {
  // 调用批量接口并传入包含单个 ID 的数组，然后提取结果
  return getMenuDetails([id])
    .then(extractFirstElementACB);
}

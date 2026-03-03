# 09 学术诚信与 AI 使用指南

在 ID2216 这门课中，我们鼓励使用各种工具（包括 AI）来辅助学习，但“辅助”与“抄袭”之间有一条明确的红线。

## 1. 餐厅类比：秘制配方与版权

想象你开了一家餐厅：

1. **合法引用**：你可以使用市面上公开的番茄酱品牌（开源库），但你必须在菜单上注明（引用）。
2. **辅助工具**：你可以使用自动切菜机（AI）来帮你准备食材，但菜品的调味和最终呈现必须由你主导。
3. **剽窃行为**：如果你潜入邻居餐厅偷走了他们的秘制配方并宣称是自己发明的，这就是学术不端。

## 2. 核心规定：Canvas TW1.0 指南

根据课程要求，所有代码必须是你自己理解并编写的。

## 3. AI 使用的“红绿灯”

为了避免学术不端，请严格遵守以下红绿灯准则：

### 🟢 绿灯：鼓励的行为 (学习辅助)
- **解释概念**：让 AI 用比喻解释什么是“闭包”或“响应式”。
- **语法查错**：遇到报错时，把错误日志贴给 AI 寻找拼写或逻辑错误。
- **构思算法**：讨论实现某个功能（如：过滤列表）的思路。

### 🟡 黄灯：需谨慎的行为 (注明引用)
- **代码重构**：让 AI 优化你已经写出来的丑陋代码（必须在 README 注明 AI 参与了重构）。
- **生成模板**：使用 AI 生成简单的 HTML 结构或 CSS 样式。

### 🔴 红灯：绝对禁止的行为 (剽窃)
- **直接生成核心逻辑**：将作业需求全文贴给 AI，直接复制生成的 JavaScript 代码。
- **瞒报使用**：在 README 中宣称 100% 手写，但实际包含大量 AI 生成的代码。

## 4. 如何优雅地写 Acknowledgment

在 ID2216 中，主动声明你使用的工具不仅不会扣分，反而能展示你的专业透明度。建议在你的项目 `README.md` 底部增加如下部分：

### 声明模板示例
```markdown
## Acknowledgments 📜

- **AI Tools**: Used ChatGPT for refactoring the reactive logic in `model.js` and Claude for explaining the Suspense sequence.
- **Assets**: Images from Unsplash; Icons from FontAwesome.
- **Tutorials**: Followed the official KTH Canvas TW2.3 guide for implementing Fetch logic.
```

**为什么这很重要？**
1. **诚信加分**：TA 看到你有明确的引用，会认为你对代码有深刻的掌控力。
2. **职业素养**：在开源世界，注明引用（Attribution）是基本的职场规则。

## 5. 核心原则：你必须能解释你的代码

在 ID2216 的最终口试（Oral Exam）中，老师可能会随机指着一行代码问你：“为什么这里要用 `await`？”或者“这个 `notifyObservers` 的调用时机是什么？”

### ⚠️ AI 写代码，你来背书
如果这段代码是 AI 生成的，但你无法解释它的运行逻辑，那么在老师眼里，这等同于**抄袭**。

**建议做法：**
- 每一行进入你项目的代码，你都必须 100% 理解。
- 如果不理解，请让 AI 为你逐行注释，直到你完全搞懂为止。

---

## 💡 TA 问答：面试自救指南

**问：如果我真的用 AI 写了一个非常复杂的 Selector，口试时解释不清楚怎么办？**

**答：** 两个建议。第一，**删掉重写**，用你能理解的简单方式写（哪怕代码丑一点，只要是自己写的就没问题）。第二，**画图**。口试前先画出数据的流向图（Data Flow Graph），图能对上，老师就知道你确实懂了逻辑。

---

## 6. 总结：做代码的主人

学术诚信不仅是为了应付检查，更是为了确保你真正掌握了 Interaction Programming 的精髓。AI 是强大的副驾驶（Copilot），但握着方向盘的永远应该是你。

---

## 📚 扩展阅读

- [KTH Academic Integrity Policy](https://www.kth.se/en/student/stod/studier/fusk-1.312302) - 瑞典皇家理工学院官方学术诚信准则
- [The Ethics of AI in Education](https://canvas.kth.se/courses/59201/pages/academic-integrity-and-ai-tw1-dot-0) - Canvas 上的深度讨论（需登录）

---
⚠️ **下一站**：我们将进入 [10 Firebase 认证](./10_firebase_auth.md)，学习如何为你的应用添加安全的登录功能。

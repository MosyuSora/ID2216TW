# ID2216 Project Rulebook (规则书) v1.0

## 核心原则：合规重于速度，规范高于一切

### 1. 原子化流程 (Atomic Process)
每一项任务必须严格遵循 **A -> B -> C** 三步走：
- **Phase A (Analysis)**: 
  - 必须查阅 Canvas 最新要求。
  - 必须产出“需求分析”和“知识点回顾”。
  - 必须明确涉及的文件路径和代码行号范围。
- **Phase B (Delegated Coding)**:
  - **隔离原则**：主助理（Phoebe）严禁直接编写任何业务逻辑代码。
  - **强制委派**：必须产生一个 `tao/sonnet` 类型的子代代理（subagent）负责实现逻辑。
  - **验证标准**：主助理仅负责运行 `npm run test`。
- **Phase C (Documentation)**:
  - 必须编写详细的中文文档，包含：(1) 问题内容, (2) 影响范围, (3) 知识点总结, (4) 解决逻辑。
  - 代码中必须包含详尽的中文注释。

### 2. 严禁幻觉 (Zero Hallucination)
- 严禁为了通过测试而创建任何官方模板之外的辅助文件（如 `tw1.1.1.model.test.js`）。
- 严禁修改测试脚本本身。
- 严禁在不符合课程架构（M-V-P）的情况下硬编码。

### 3. 运行环境
- 必须使用 Node.js v22/v23。
- 必须定期运行 `npm install @iprog/test@latest` 确保测试用例最新。

### 4. 进度同步
- 每次任务结束后，必须更新本地 `working_board.md`。
- 必须通过 WhatsApp 向老板（Luyu）汇报当前进度。

---
*注：违反本规则书任何条款将导致任务自动作废并重启。*

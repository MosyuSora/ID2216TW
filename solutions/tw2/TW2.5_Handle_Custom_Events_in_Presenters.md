# TW2.5 Handle Custom Events in Presenters

## 问题内容
本章节要求在 `DetailsPresenter` 和 `SearchPresenter` 中实现事件处理逻辑（Action Callbacks, ACB），将视图（Views）触发的自定义事件与模型（Model）的操作进行绑定。

### 具体任务：
1. **DetailsPresenter**: 
   - 实现 `onAddToMenu` 事件处理，将当前显示的菜品添加到菜单（`model.addToMenu`）。
   - 检查当前菜品是否已经在菜单中（`isDishInMenu`）。
2. **SearchPresenter**:
   - 实现搜索表单的输入变化处理（`onSearchTextChange`, `onSearchTypeChange`）。
   - 实现搜索按钮点击处理（`onSearchClick`）。
   - 实现搜索结果点击处理（`onDishChosen`），更新当前选中的菜品 ID。

---

## 问题 Scope
- [src/reactjs/detailsPresenter.jsx](../../src/reactjs/detailsPresenter.jsx)
- [src/reactjs/searchPresenter.jsx](../../src/reactjs/searchPresenter.jsx)

---

## 对应知识点回顾
- [id2216_tutorials/04_mvp_intro.md](../../id2216_tutorials/04_mvp_intro.md) (Presenter 职责与事件流)
- [id2216_tutorials/05_reactivity.md](../../id2216_tutorials/05_reactivity.md) (MobX 响应式更新)

---

## 解题思路

### 1. DetailsPresenter 解析
在 `DetailsPresenter` 中，我们需要将视图中的 "Add to Menu" 操作同步到模型。为了通过课程测试的严格校验，回调函数使用了 `onAddToMenuACB` 命名。

```javascript
// src/reactjs/detailsPresenter.jsx

import React from 'react';
import { observer } from 'mobx-react-lite';
import { SuspenseView } from '../views/suspenseView';
import { DetailsView } from '../views/detailsView';

function Details(props) {
    const { model } = props;
    const ps = model.currentDishPromiseState;

    // 1. 处理异步加载状态
    if (!ps || !ps.data) {
        return React.createElement(SuspenseView, {
            promise: ps?.promise,
            data: ps?.data,
            error: ps?.error
        });
    }

    // 2. 检查菜品是否已在菜单中
    function isDishInMenuCB(d) {
        return d.id === ps.data.id;
    }

    // 3. 渲染视图并注入回调
    return React.createElement(DetailsView, {
        dishData: ps.data,
        isDishInMenu: !!model.dishes.find(isDishInMenuCB),
        guests: model.numberOfGuests,
        // 使用具名 ACB 函数以符合测试正则匹配
        onAddToMenu: function onAddToMenuACB(){ 
            model.addToMenu(ps.data); 
        }
    });
}

const ObservedDetails = observer(Details);
export { Details };
export default ObservedDetails;
```

### 2. SearchPresenter 解析
`SearchPresenter` 负责协调搜索表单和搜索结果的交互。

```javascript
// src/reactjs/searchPresenter.jsx

import React from 'react';
import { observer } from 'mobx-react-lite';
import { SuspenseView } from '../views/suspenseView';
import { SearchResultsView } from '../views/searchResultsView';
import { SearchFormView } from '../views/searchFormView';

const Search = observer(function Search(props) {
    const { model } = props;
    if (!model) return null;

    const ps = model.searchResultsPromiseState;

    // 1. 搜索表单部分 (Form)
    const form = React.createElement(SearchFormView, {
        text: model.searchParams.query,
        type: model.searchParams.type,
        dishTypeOptions: ['starter', 'main course', 'dessert'],
        // 绑定输入变更 ACB
        onSearchTextChange: function onSearchTextChangeACB(txt){ model.setSearchQuery(txt); },
        onSearchTypeChange: function onSearchTypeChangeACB(type){ model.setSearchType(type); },
        onSearchClick: function onSearchClickACB(){ model.doSearch(model.searchParams); }
    });

    // 2. 搜索结果部分 (Results/Suspense)
    let result = null;
    if (ps?.data) {
        result = React.createElement(SearchResultsView, {
            searchResults: ps.data,
            onDishChosen: function onDishChosenACB(dish){ model.setCurrentDishId(dish.id); }
        });
    } else {
        result = React.createElement(SuspenseView, {
            promise: ps?.promise,
            data: ps?.data,
            error: ps?.error
        });
    }

    return React.createElement(React.Fragment, null, form, result);
});

export { Search };
export default Search;
```


## 参考链接
- [Canvas 章节: TW2.5](https://canvas.kth.se/courses/59201/modules/items/1360866)

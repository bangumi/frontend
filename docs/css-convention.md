## CSS 编码规范

### 组件库

1. 组件库 CSS 命名规范由 BEM 派生出来。其中，
   块（block）、元素（element）、修饰符（modifier）的概念在 BEM 中
   [定义](http://getbem.com/naming/)。

2. 一个组件本身应该成一个块，应使用 `.bgm-${组件名}` 作为容器的类。

3. 组件内部可以有任意多个元素，这些元素应使用 `.bgm-${组件名}__${元素}` 作为类。

4. 如果块或者元素需要根据状态（如可用态与禁用态）改变样式，则需要使用修饰符，`.${块/元素类名}--${修饰符}` 作为类。

### 网站

1. 页面及页面级组件应该使用 CSS Module，避免样式的全局污染。

## 夜间模式

在 `document.documentElement.dataset.theme` 设置 `dark` 为激活夜间模式，移除该 `dataset` 为激活日间模式。

### 组件库

未解决

### 网站

针对 `website` 样式使用 `[data-theme='dark']` 选中夜间模式样式。参考 [Header 样式](..\packages\website\src\components\Header\style.module.less) 。

```css
/* 主样式，Selector Specificity 为 0-1-0 */
.container {
  /* ...; */
}

/* 夜间样式，Selector Specificity 为 0-2-0，在 theme 为 dark 时该选择器内样式会覆盖主样式 */
[data-theme='dark'] .container {
  background: -webkit-linear-gradient(top, #37393b, #333); /* 0-2-0 */
}
```

### 参考

- [Selector Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

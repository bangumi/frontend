# code style

## 代码格式化

所有的代码都应该使用 `prettier` 进行格式化，确保贡献者们在不同的 ide 和 editor 设置下不会产生无意义的空格修改，方便进行 code review。

pre-commit hook 会自动运行 `prettier`。

## 代码风格

请确保 eslint 检查通过，如果认为某条 eslint 规则不合理也可以在 issue/PR 中提出。

pre-commit hook 会对修改过的文件运行 `eslint --fix`。

## 代码注释

不需要为每一个函数/变量/类都添加注释。

但如果要为含量/变量/类添加注释，需要使用 [`tsdoc`](https://tsdoc.org/) (简单来说就是不需要写类型的 `jsdoc`)。

不要使用 `// ...` 注释函数/变量/类，[TypeScript 无法提取这样的注释](https://github.com/bangumi/frontend/pull/542#discussion_r1179033149)，导致某些编辑器中无法正常显示提示。

bad：

```ts
// 对于过长的图片名，省略超出部分但保留文件扩展名
function getShortName(name: string): string;
```

good：

```ts
/**
 * 对于过长的图片名，省略超出部分但保留文件扩展名
 */
function getShortName(name: string): string;
```

由于我们已经使用了 TypeScript， 所以在注释中不需要也不应该再重复注明类型

bad：

```ts
/**
 * 将图片以base64编码
 * @param {File} img 需要处理的图片 Blob
 * @return {[String, String]} 图片名与base64字符串
 */
const readAsBase64 = async (img: File): Promise<[string, string]>;
```

good:

```ts
/**
 * 将图片以base64编码
 * @param img - 需要处理的图片 Blob
 * @return 图片名与base64字符串
 */
const readAsBase64 = async (img: File): Promise<[string, string]>;
```

# Bangumi Frontend 项目贡献指南

首先欢迎为新 Bangumi 的前端项目添砖加瓦。

## 开始

- 通过右上角的 Fork 按钮或者点击[这个链接](https://github.com/bangumi/frontend/fork)
  将 [repo](https://github.com/bangumi/frontend) fork 到自己的账号下面。
- 通过 SSH，GitHub CLI 或者 HTTP clone 你的 fork。

```bash
git clone git@github.com:<GITHUB_ID>/frontend # SSH
gh repo clone <GITHUB_ID>/frontend # GitHub CLI
git clone https://github.com/<GITHUB_ID>/frontend # HTTPS
```

- 进入项目目录

```bash
cd frontend
```

- 将 bangumi/frontend 添加为 `upstream`

```bash
git remote add upstream https://github.com/bangumi/frontend.git
```

- 为你的工作创建一个新的分支

```bash
git checkout -b <BRANCH_NAME>
```

- 启动开发服务器

使用测试后端（dev.bgm38.com）

```bash
pnpm dev
```

测试用的账号在 https://github.com/bangumi/dev-docs#api

使用生产后端（next.bgm.tv），**请谨慎使用**

```bash
pnpm dev --mode production
```

参照[代码风格指印](./docs/code-style.md)

- 提交前确认所有的测试、lint 通过

```bash
pnpm test
pnpm lint
```

- Commit 你的工作
- 开发完成后，Push 到你的分支上

```bash
git push -u origin <YOUR_BRANCH>
```

- 开一个新的 Pull Request，详细参见 [PR 规则](#pr-规则)。

## PR 规则

- PR 的标题需要满足 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范的要求
- 尚未完成的 PR 请在标题中添加 `[WIP]`，或者设置为 draft 状态。
- ci 会对 PR 进行构建并进行部署，如果涉及 UI 修改，在预览上传成功后请修改 PR 说明添加预览 URL。

### 在合并之前

- 每一个 PR 都将会被打开至少 48 小时，以便所有 Collaborator 都有机会看到 PR，
  提出建议。以下情况除外：
  - PR 只包含 typo 的修复；
  - PR 只关于项目架构的维护（如 Github Action 的维护）；
  - PR 只包括测试用例的变更；
- 所有关于新特性与缺陷修复的 PR 都必须包含对应测试用例；
- 如果在 `packages/design` 下面添加新的组件，需要包含一个 storybook 作为组件文档；
- test/lint/build 等 ci 应该通过。

在 PR 打开 48 小时并被任意两位 collaborator approve 之后会被 bot 自动合并。

## 如何成为 Collaborator

- Collaborator 需要对项目作出活跃的贡献；
- 想要成为 Collaborator 的话，需要向 `README.md` 文件的 Collaborator 小节提起 PR，
  将自己添加到 Collaborator 列表中（注意列表以 GitHub ID 的字典序排列）；
- PR 需要被至少两名 Collaborator approve；
- PR 在打开 48 小时之后没有反对意见；
- 当上述条件满足，PR 将会被合并，然后邀请新同学成为 @bangumi/frontend-collaborators 组的成员；

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

- (a) The contribution was created in whole or in part by me and I have the right to
  submit it under the open source license indicated in the file; or
- (b) The contribution is based upon previous work that, to the best of my knowledge,
  is covered under an appropriate open source license and I have the right under that
  license to submit that work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am permitted to submit under a
  different license), as indicated in the file; or
- (c) The contribution was provided directly to me by some other person who certified
  (a), (b) or (c) and I have not modified it.
- (d) I understand and agree that this project and the contribution are public and that
  a record of the contribution (including all personal information I submit with it,
  including my sign-off) is maintained indefinitely and may be redistributed consistent
  with this project or the open source license(s) involved.

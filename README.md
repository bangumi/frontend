# Bangumi Front-end Project

Bangumi 新前端项目，基于 React/TypeScript/Vite。

## 如何开发

项目使用 [pnpm](https://pnpm.io/) 管理依赖。在启动项目之前，
请确保安装好 pnpm , 请参见 [安装文档](https://pnpm.io/installation)

安装依赖

``` bash
pnpm install
```

启动开发环境

```bash
pnpm dev
```

lint 代码风格

```bash
pnpm lint
```

### 对于使用 Windows 的开发者

由于 pnpm 对 exFAT 格式的硬盘支持不佳，见 [issue](https://github.com/pnpm/pnpm/issues/3952)，
在 exFAT 格式的分区上启动项目可能报 `ENOENT: no such file or directory` 错误。
在上游修复之前，建议在 NTFS 格式的硬盘上存储本项目。

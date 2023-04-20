# @bangumi/client

我们使用 [oazapfts](https://github.com/oazapfts/oazapfts) 从 openapi 定义直接生成 js API client

在大多数情况下 ci 会自动对 openapi 进行更新的，不需要手动操作。

## 使用

```typescript
import { ozaClient } from '@bangumi/client';

async function request() {
  try {
    const res = await ozaClient.$apiCall(...);
    if (res.status === 200) {
      console.log('操作成功');
      return
    } else if (res.status === 400) {
      // 在这里 res.data 可以正常进行 type narrow
    } else {
      console.log("未知错误：", res.data)
    }
  } catch (e: unknown) {
    // http 请求失败
  }
}
```

一般来说一个请求有两个错误需要处理：

1. fetch 因为 HTTP 请求未完成时抛出的 `Error`
2. HTTP 请求完成，但是响应不符合预期。

比如，当用户尝试上传封面而调用 `oazClient.uploadSubjectCover` 时，可能会因为用户不是维基人而返回 http code 401，也有可能因为用户上传的图片格式暂不支持而返回 http code 400。

这里需要针对响应的 `res.status.code` 进行判断，并且分别进行处理。

实际的使用例子：

https://github.com/bangumi/frontend/blob/6d20bfd22f64b2f2d354d73094fe3aff0d549250/packages/website/src/hooks/use-user.tsx#L89

更多其他的 oazapfts 的 api （如 `ok`） 请查看文档

https://github.com/oazapfts/oazapfts#consuming-the-generated-api

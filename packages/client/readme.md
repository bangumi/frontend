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
      console.log('请求成功');
      return
    } else if (res.status === 400) {
      /**
       * http 请求正常进行，服务器正常返回，但是响应内容不符合预期。比如用户没有登陆/没有对应权限/请求内容格式错误等等原因
       *
       * 具体原因请查看对应的文档或者查看响应内容。
       *
       * 生成的 ts client 可以根据 `res.status` 对 res.data 进行 type narrow。
       */
    } else {
      console.log("未知错误：", res.data)
    }
  } catch (e: unknown) {
    // http 请求失败
  }
}
```

实际的使用例子：

https://github.com/bangumi/frontend/blob/6d20bfd22f64b2f2d354d73094fe3aff0d549250/packages/website/src/hooks/use-user.tsx#L89

更多其他的 oazapfts 的 api （如 `ok`） 请查看文档

https://github.com/oazapfts/oazapfts#consuming-the-generated-api

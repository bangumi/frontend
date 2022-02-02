# @bangumi/website

## API Mock

为了保持单元测试的稳定性，不应该在单元测试中发出真实的 API 请求。
所有对外的请求应该通过 mock。在 website 项目中，我们通过
[msw](https://mswjs.io/) 来 mock 所有 API 请求。用法可以见
`mocks/handler.ts` 文件。

通过 `mockAPI` 方法创建的 mock 将会自动从 `fixtures` 文件夹中的对应 JSON
文件中读取 JSON 作为 API 的响应。例如要 mock `GET v0/foo/bar`，
将会自动将 `fixtures/v0/foo/bar-GET.json` 文件中的 JSON 作为响应读取。

# LingThink

一个插件生态系统

用 **LingThink** 来融合你的所有创造吧

## 特性

- 去中心化 应用数据去中心化储存 + 用户身份去中心化认证，你的数据永远不会被任何科技巨头绑架
- 隐私加密 私有数据完全加密
- 自动同步 所有设备都为对等节点，数据会在设备间自动同步，操作一个设备就是操作在所有设备的数据
- 高可依赖 无中心服务器，无单点故障
- 插件生态 作为开发者，你可以将任何创造物嵌入运行，并调用去中心化生态系统功能
- 超兼容性 可在浏览器中直接运行
- 完全开源 生态至上，可私有部署
- 多语言库 完善的国际化支持
- 可定制化 UI 界面完全分离，可自由更换主题

## 应用列表

很快就有应用市场界面可供选择

- [Grapher-2d](https://github.com/graph-analysis/grapher-2d) 基于 Graphin 开发的图可视分析应用

## 应用开发

#### 开发 web 微应用

1. 根据 [qiankun 微应用](https://qiankun.umijs.org/zh) 文档初始化应用
2. 将应用打包托管到静态服务器
3. 在 package.json 中配置应用信息，加入以下字段

```js
...
  "plugin": {
    "source": {
      "domain": "cdn.jsdelivr.net", // 静态文件托管服务器域名
      "baseURL": "npm/${name}@${version}", // 资源在非根路由下的 baseURL, ${}可以直接取到 pakage.json 中的字段
      "entry": "index.html" // 入口文件名称
    }
  },
...
```

4. 提交应用信息

#### 开发其他应用

支持计划

1. [ ] svelte 组件微应用

2. [ ] Web Component 微应用

3. [ ] utools 微应用

## 项目参与指南

1. [x] 克隆至本地

`git clone https://github.com/graph-analysis/LingThink`

2. [x] 开发

`pnpm i && pnpm dev`

3. [x] 编译

`pnpm build`

4. [x] 部署

`node build/index.js`

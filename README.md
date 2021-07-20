# LingThink

一个插件生态系统

**LingThink** 采用插件设计模式，基于 qiankun 微前端框架，可动态加载数据分析应用作为插件

## 应用列表

很快就有应用市场界面可供选择

- Grapher-2d 基于 Graphin 开发的图可视分析应用

## 插件开发

#### 开发 web 微应用

1. 根据 [qiankun微应用](https://qiankun.umijs.org/zh) 文档初始化应用
2. 将应用打包托管到静态服务器
3. 在 package.json 中配置应用信息，加入以下字段
```json
...
  "plugin": {
    "source": {
      "domain": "cdn.jsdelivr.net", // 静态文件托管服务器域名
      "baseURL": "npm/${name}@${version}", // 资源在非根路由下的 baseURL
      "entry": "index.html" // 入口文件名称
    }
  },
...
```

 	4. 提交应用信息


## 项目参与指南

1. [x] 克隆至本地

`git clone https://github.com/graph-analysis/grapher`

2. [x] 开发

`pnpm i && pnpm dev`

3. [x] 编译

`pnpm build`

4. [x] 部署

`node build/index.js`

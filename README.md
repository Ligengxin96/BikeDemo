# BikeDemo
- master 分支 是用 Create React App 创建的项目(后项目采用dva框架后切换到了dev分支)
- dev 分支是基于dva框架,使用React,ES6和Antd组件搭建的项目

## 项目主要文件夹介绍

```bash
├── /Mock/           # 请求模拟数据的配置文件
├── /src/            # 项目源码
│ ├── /components/   # UI组件及UI相关方法
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /style/        # 全局样式
│ ├── /utils/        # 工具函数
│ │ ├── request.js   # 异步请求函数
│ ├── admin.js       # 入口文件次级路由组件
│ ├── App.js         # 入口文件顶级路由组件
│ ├── router.js      # 路由配置
│ ├── index.js       # 入口文件
├── package.json     # 项目依赖包信息
├── .eslintrc        # Eslint配置文件
└── .webpackrc       # roadhog配置
```

## 开发环境搭建

```bash
$ git clone https://github.com/Ligengxin96/BikeDemo.git
$ cd BikeDemo
$ git checkout dev
$ cnpm install      # 如果使用 yarn 安装依赖包可能会导致 [启动报错缺失 crypto-browserify](https://github.com/Ligengxin96/BikeDemo/issues/1)
$ npm start
```

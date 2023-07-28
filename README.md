## 1. 启动项目

```
npm run start
// 或者
npm run dev
```

## 2. 配置文件
+ **服务器地址 & md文件跟目录** src -> app -> config.js
+ **路径常量** src -> constant -> index.js

## 3. public文件夹结构

![目录结构](public/public.png)

+ Logo/LOGO.jpg 首页头像
+ papers md文件 & 插图
  + papers/illustration 图片

> papers 内文件夹代表分类(可嵌套)  .md 文件代表文章

## 4. 文章拉取
+ 文件存放在 github 上，通过 github 提供的 webhook 触发后端执行 scripts/pull.sh 文件。将文件拉取到服务器指定位置(参见 2 中配置)。
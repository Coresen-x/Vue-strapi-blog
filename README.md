# Vue-strapi-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

这是一个前后端分离的项目。
后端基于 Strapi，但暂未提供线上服务，因此动态数据无法加载。
代码仅供参考，主要展示前端设计和开发逻辑。

后端基于 Strapi 构建，如果需要运行后端，需确保本地安装 Node.js 和 npm。
// 其实我这里跑不了，我里面api都写的是针对我本地strapi的api地址
// 类似于
// const response = await axios.get('http://localhost:1337/api/algos');
// const apiUrl = "http://localhost:1337/api/progresses/igfq7qpffu2gtpokbv58g0kg";

还有呢，我在netlify作了前端部署，有兴趣的小伙伴可以看一下。
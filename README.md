# Vue-strapi-blog
这是一个使用 **Vue.js** 构建的前后端分离博客项目，后端使用 **Strapi CMS** 实现内容管理。

## 在线预览

前端已部署至 Netlify：

🔗 [https://vue-strapi-blog.netlify.app/?page=1](https://vue-strapi-blog.netlify.app/?page=1)

注：当前页面无法加载动态内容，因为所有 API 请求均指向本地服务（ `http://localhost:1337`），因此数据加载功能在部署环境下无法使用。

## 技术栈

- **前端框架**：Vue.js (Vue CLI)
- **UI 框架**：自定义样式
- **HTTP 客户端**：Axios
- **内容管理系统（CMS）**：Strapi (本地服务)
- **部署平台**：Netlify


## 📦 项目安装与运行

#### 克隆仓库

```bash
git clone https://github.com/your-username/vue-strapi-blog.git
cd vue-strapi-blog

## Project setup
```

#### 安装依赖
```bash
npm install
```

#### 启动开发服务器
```bash
npm run serve
```
前端将启动在默认的 http://localhost:8080/。

## 后端服务说明（Strapi）

如需运行后端，请参考以下要求：

- 确保已安装 Node.js 与 npm  
- 安装并运行 Strapi 本地服务（默认端口为 `http://localhost:1337`）  
- 修改前端中的 API 请求地址以匹配你的后端地址  

#### 示例 API 请求代码如下：

```js
const response = await axios.get('http://localhost:1337/api/algos');
const apiUrl = "http://localhost:1337/api/progresses/igfq7qpffu2gtpokbv58g0kg";
```

## 项目总结

这是一个通过Vue3+Strapi实现 の 练手博客项目，目标是希望得到自设计的blog，同时提高自己的代码水平，了解前后端开发的具体流程。

<template>
  <div>
    <!-- 顶栏组件 -->
    <DingLan />
    <div class="container mx-auto mt-2">
      <div class="flex">
        <!-- 预留的目录空间，宽度占20% -->
        <div class="w-1/5 p-5">
          <!-- 可放置侧边栏内容 -->
        </div>
        <!-- 内容区域，宽度占80% -->
        <div class="w-4/5 p-4">
          <div class="post-detail bg-white shadow-md rounded-lg p-6">
            <!-- 帖子标题 -->
            <h1 class="text-3xl font-bold mb-6 text-center">{{ post?.Title }}</h1>
            <!-- 帖子内容 -->
            <div v-html="renderedContent" class="post-content prose max-w-3xl mx-auto"></div>
            <!-- 返回按钮 -->
            <div class="text-right mt-6">
              <button @click="goBack" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // 引入Vue的相关API
import { useRoute, useRouter } from 'vue-router'; // 引入Vue Router的钩子
import axios from '../axios'; // 引入自定义的axios实例
import { marked } from 'marked'; // 引入marked，用于Markdown解析
import DingLan from '@/components/DingLan.vue'; // 引入顶栏组件

const router = useRouter(); // 获取路由实例
const route = useRoute(); // 获取当前路由信息
const post = ref([]); // 帖子数据

onMounted(async () => {
  const postId = route.params.id; // 从路由参数中获取贴子ID
  let endpoint = '';

  // 根据路径设定请求的API endpoint
  if (route.path.startsWith('/posts/')) {
    endpoint = `/posts/${postId}`;
  } 
  else if (route.path.startsWith('/algos/')) {
    endpoint = `/algos/${postId}`;
  }

  try {
    // 通过axios发送GET请求获取帖子数据
    const response = await axios.get(endpoint);
    post.value = response.data.data; // 将返回的数据赋值给post
  } catch (error) {
    console.error('Error fetching post:', error); // 捕获错误并输出
  }
});

const renderedContent = computed(() =>
  post.value.Content ? marked(post.value.Content) : ''
);

// 映射路径到返回路径
const returnPaths = {
  '/posts/': '/',
  '/algos/': '/algo-notes',
  // 添加其他路径映射
};

// 返回按钮的点击事件
const goBack = () => {
  const routePrefix = Object.keys(returnPaths).find(prefix =>
    route.path.startsWith(prefix)
  );
  const returnPath = returnPaths[routePrefix] || '/';
  const page = route.query.page || 1;
  router.push({ path: returnPath, query: { page } });
};
</script>

<style scoped>
/* 可以在这里添加组件的局部样式 */
</style>
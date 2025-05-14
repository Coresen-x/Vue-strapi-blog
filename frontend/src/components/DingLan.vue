<template>
  <!-- 顶部导航栏容器，背景为白色，带阴影 -->
  <div class="bg-white shadow-md">
      <!-- 内容主体的容器，确保内容居中，并在不同屏幕大小下自适应 -->
      <div class="container mx-auto flex items-center justify-between py-6 px-6">
          <!-- 网站标题，字体大小为2xl，使用衬线字体 -->
          <div class="text-2xl font-serif">
              Coresen の 小站 <br>
              <span class="mt-1 text-xs font-cursive italic text-gray-600">
                  In a gentle way, you can shake the world.
              </span>
          </div>
          <!-- 导航栏，使用flex布局创建水平导航项 -->
          <nav class="flex space-x-4">
              <!-- 路由链接，点击时更新rememberScroll -->
              <router-link
                  :class="{ 'active-link': isActiveOpenAI }"
                  class="hover:underline"
                  to="/"
                  @click="setRememberScroll(0)"
              >Open AI</router-link>

              <!-- 路由链接，点击时更新rememberScroll_algo -->
              <router-link
                  :class="{ 'active-link': isActiveAlgoNotes }"
                  class="hover:underline"
                  to="/algo-notes"
                  @click="setRememberScrollAlgo(0)"
              >Algo Notes</router-link>
              
              <!-- 路由链接，带有悬停下划线效果 -->
              <router-link
                  class="hover:underline"
                  to="/about-us"
                  active-class="active-link"
              >关于我</router-link>
          </nav>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { rememberScroll, rememberScroll_algo } from '@/useScrollStore'; // 导入相关变量

const route = useRoute();

const isActiveOpenAI = computed(() => {
return route.path === '/' || route.path.startsWith('/posts/');
});

const isActiveAlgoNotes = computed(() => {
return route.path.startsWith('/algo-notes') || route.path.startsWith('/algos/');
});

// 更新rememberScroll的函数
const setRememberScroll = (value) => {
rememberScroll.value = value;
};

// 更新rememberScroll_algo的函数
const setRememberScrollAlgo = (value) => {
rememberScroll_algo.value = value;
};
</script>

<style>
  body {
      font-family: 'Arial', sans-serif;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  .active-link {
    color: #42b983;
  }
</style>
<template>
  <DingLan />
  <BlogList :items="posts" :perPage="7" :initialPage="currentPage" path="/" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { rememberScroll } from '@/useScrollStore';
import DingLan from '@/components/DingLan.vue';
import BlogList from '@/components/BlogList.vue';

const posts = ref([]);
const router = useRouter();
const route = useRoute();

const currentPage = ref(parseInt(route.query.page) || 1);

// 获取文章数据
onMounted(async () => {
  if (!router.currentRoute.value.query.page) {
    router.replace({ path: '/', query: { page: 1 } });
  }

  try {
    const response = await axios.get('http://localhost:1337/api/posts');
    posts.value = response.data.data;
    await nextTick(); 
    window.scrollTo(0, rememberScroll.value);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});
</script>
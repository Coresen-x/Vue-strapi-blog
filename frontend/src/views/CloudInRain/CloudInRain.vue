<template>
    <div class="page-background">
      <BlogList :items="experiences" :perPage="7" :initialPage="currentPage" path="/exist-and-life/" />
  
      <!-- Return Button -->
      <div class="return-button">
        <button @click="goBack" class="return-btn">Return</button>
      </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { rememberScroll_experience } from '@/useScrollStore';
import BlogList from '@/components/BlogList.vue';

const experiences = ref([]);
const router = useRouter();
const route = useRoute();

const currentPage = ref(parseInt(route.query.page) || 1);

//返回主站
function goBack() {
  router.push('/');
}

// 获取文章数据
onMounted(async () => {
if (!router.currentRoute.value.query.page) {
    router.replace({ path: '/exist-and-life', query: { page: 1 } });
}

try {
    const response = await axios.get('http://localhost:1337/api/experiences');
    experiences.value = response.data.data;
    await nextTick(); 
    window.scrollTo(0, rememberScroll_experience.value);
} catch (error) {
    console.error('Error fetching posts:', error);
}
});
</script>

<style scoped>
.page-background {
  background-image: url('../image/pixel-heart.webp') !important;
  background-size: cover !important;
  background-position: center !important;
  opacity: 0.8 !important;
  min-height: 100vh !important;
  padding: 20px !important;
}

.return-button {
    position: fixed;
    bottom: 25px;   
    right: 25px;
}
</style>
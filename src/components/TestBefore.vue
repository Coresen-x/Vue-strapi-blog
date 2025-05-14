<template>
    <DingLan />
    <div class="container mx-auto p-6">
    <!-- 主容器，包含每篇文章，应用了间距和边距 -->
        <div class="space-y-4 mx-auto mt-6 parent-container">
        <!-- 遍历 paginatedPosts，显示每篇文章 -->
            <div v-for="algo in paginatedAlgos" :key="algo.id" class="border-b pb-4">
            <!-- 带有链接的文章标题，点击后跳转到详细文章页面 -->
                <h1 @click="navigateToAlgo(algo.documentId)" class="cursor-pointer hover:underline text-xl font-semibold mb-4">
                {{ algo.Title }}
                </h1>
                <!-- 文章简介，点击时导航到详细文章 -->
                <p @click="navigateToAlgo(algo.documentId)" class="cursor-pointer mb-2 small-italic">
                {{ algo.Introduction }}
                </p>
                <!-- 文章发布日期 -->
                <small class="text-gray-500">{{ algo.Date }}</small>
            </div>
            
            <div class="flex justify-between items-center">
            <!-- 数字页码 -->
                <div class="flex-grow flex justify-center space-x-1 text-xs font-serif">
                <!-- 跳转输入框 -->
                <span>第</span>
                <input v-model="inputPageNumber" type="number" min="1" :max="totalPages" class="w-12 text-center border rounded px-2 py-1 text-xs font-serif" />
                <span>页</span>
                <button @click="jumpToPage" class="bg-gray-200 px-3 py-1 rounded text-xs font-serif">
                Jump
                </button>
            </div>
            
            <!-- 上一页和下一页按钮 -->
            <div class="space-x-2">
                <button @click="previousPage" :disabled="currentPage_notes === 1" class="text-sm bg-gray-200 px-4 py-2 rounded">
                    上一页
                </button>
                <button @click="nextPage" :disabled="currentPage_notes === totalPages" class="text-sm bg-gray-200 px-4 py-2 rounded">
                    下一页
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { rememberScroll_algo } from '@/useScrollStore';
import DingLan from '@/components/DingLan.vue';

// 存储获取的文章
const algos = ref([]);
// 每页显示文章数量
const algosPerPage = 7;
// Vue Router 实例
const router = useRouter();
const route = useRoute();

// 当前页数
const currentPage_notes = ref(parseInt(route.query.page) || 1);

// 计算总页数
const totalPages = computed(() => Math.ceil(algos.value.length / algosPerPage));

// 根据日期对文章排序
const sortedPosts = computed(() =>
    algos.value.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date))
);

// 获取当前页面的文章
const paginatedAlgos = computed(() => {
    const start = (currentPage_notes.value - 1) * algosPerPage;
    return sortedPosts.value.slice(start, start + algosPerPage);
});

// 跳转到下一页
const nextPage = () => {
    if (currentPage_notes.value < totalPages.value) {
        currentPage_notes.value++;
        router.push({ path: '/algo-notes', query: { page: currentPage_notes.value } });
        window.scrollTo(0, 0);
    }
}

// 返回到上一页
const previousPage = () => {
if (currentPage_notes.value > 1) {
currentPage_notes.value--;
router.push({ path: '/algo-notes', query: { page: currentPage_notes.value } });
window.scrollTo(0, 0);
}
}

// 输入的页码
const inputPageNumber = ref(currentPage_notes.value);

// 页面跳转
const jumpToPage = () => {
const pageNum = parseInt(inputPageNumber.value);
if (pageNum >= 1 && pageNum <= totalPages.value && pageNum !== currentPage_notes.value) {
goToPage(pageNum);
}
};

// 跳转到指定页
const goToPage = (pageNum) => {
currentPage_notes.value = pageNum;
router.push({ path: '/algo-notes', query: { page: currentPage_notes.value } });
};

// 导航到文章详情
const navigateToAlgo = (algoId) => {
rememberScroll_algo.value = window.scrollY;
router.push({ path: `/algos/${algoId}`, query: { page: currentPage_notes.value } });
};

// 组件挂载时获取文章数据
onMounted(async () => {
if (!router.currentRoute.value.query.page) {
router.replace({ path: '/algo-notes', query: { page: 1 } });
}

try {
const response = await axios.get('http://localhost:1337/api/algos');
algos.value = response.data.data;

// 确保DOM更新完成后再滚动
await nextTick();
window.scrollTo(0, rememberScroll_algo.value);

} catch (error) {
console.error('Error fetching posts:', error);
}
});

// 监听路由变更
watch(() => route.query.page, (newPage) => {
currentPage_notes.value = parseInt(newPage) || 1;
});

watch(currentPage_notes, (newPage) => {
inputPageNumber.value = newPage;
});
</script>
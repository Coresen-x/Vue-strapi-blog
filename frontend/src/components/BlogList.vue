<template>
    <div class="container mx-auto p-6">
      <div class="space-y-4 mx-auto mt-6 parent-container">
        <div v-for="item in paginatedItems" :key="item.id" class="border-b pb-4">
          <h1 @click="navigateToItem(item.documentId)" class="cursor-pointer hover:underline text-lg font-semibold mb-4">
              {{ item.Title }}
          </h1>
          <p @click="navigateToItem(item.documentId)" class="cursor-pointer mb-2 small-italic">
            {{ item.Introduction }}
          </p>
          <small class="text-gray-500">{{ item.Date }}</small>
        </div>
  
        <div class="flex justify-between items-center">
          <div class="flex-grow flex justify-center space-x-1 text-xs font-serif">
            <span>第</span>
            <input v-model="inputPageNumber" type="number" min="1" :max="totalPages" class="w-12 text-center border rounded px-2 py-1 text-xs font-serif" />
            <span>页</span>
            <button @click="jumpToPage" class="bg-gray-200 px-3 py-1 rounded text-xs font-serif"> Jump </button>
          </div>
  
          <div class="space-x-2">
            <button @click="previousPage" :disabled="currentPage === 1" class="text-sm bg-gray-200 px-4 py-2 rounded"> 上一页 </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="text-sm bg-gray-200 px-4 py-2 rounded"> 下一页 </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed,watch } from 'vue';
import { rememberScroll,rememberScroll_algo,rememberScroll_experience } from '@/useScrollStore';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  items: Array,
  perPage: Number,
  initialPage: Number,
  path: String,
});

const router = useRouter();
const route = useRoute();

const currentPage = ref(props.initialPage || 1);
const totalPages = computed(() => Math.ceil(props.items.length / props.perPage));

const sortedPosts = computed(() =>
  props.items.slice().sort((a, b) => new Date(b.Date) - new Date(a.Date))
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.perPage;
  return sortedPosts.value.slice(start, start + props.perPage);
});

const inputPageNumber = ref(currentPage.value);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    router.push({ path: props.path, query: { page: currentPage.value } });
    window.scrollTo(0, 0);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    router.push({ path: props.path, query: { page: currentPage.value } });
    window.scrollTo(0, 0);
  }
};

const jumpToPage = () => {
  const pageNum = parseInt(inputPageNumber.value);
  if (pageNum >= 1 && pageNum <= totalPages.value && pageNum !== currentPage.value) {
    currentPage.value = pageNum;
    router.push({ path: props.path, query: { page: currentPage.value } });
  }
};

const navigateToItem = (documentId) => {
  if (props.path === '/') {
    rememberScroll.value = window.scrollY;
    router.push({ path: `/posts/${documentId}`, query: { page: currentPage.value } });
  } else if (props.path === '/algo-notes/') {
    rememberScroll_algo.value = window.scrollY;
    router.push({ path: `/algos/${documentId}`, query: { page: currentPage.value } });
  } else if (props.path === '/exist-and-life/') {
    rememberScroll_experience.value = window.scrollY;
    router.push({ path: `/experiences/${documentId}`, query: { page: currentPage.value } });
  }
};

// 监听路由变更
watch(() => route.query.page, (newPage) => {
  currentPage.value = parseInt(newPage) || 1;
});

watch(currentPage, (newPage) => {
  inputPageNumber.value = newPage;
});
</script>

<style scoped>
body, html {
  text-align: left; /* 文本左对齐 */
}

.parent-container {
  text-align: left; /* 文本左对齐 */
}

.align-center, .justify-center {
  align-items: initial;
  justify-content: initial;
}

.parent-container .text-gray-500 {
  display: block;
  margin-top: 4px;
  font-size: 12px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed; /* 禁用状态下的按钮样式 */
}

.small-italic {
  font-size: smaller; /* 缩小一个字号 */
  color: #7a8b9a; /* 字体颜色设置为灰色 */
}
</style>
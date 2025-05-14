<template>
    <DingLan />
    <div class="important-center mt-6 font-serif text-xm">
        <!-- 显示题量 -->
        <div @dblclick="editField('questionCount')">
            题量：{{ questionCount }} 题 &nbsp;&nbsp;&nbsp;--Algorithm Notes--&nbsp;&nbsp;&nbsp;
        </div>
        <!-- 显示时长 -->
        <div @dblclick="editField('studyTime')">
            时长：{{ studyTime }} 时
        </div>
    </div>

    <BlogList :items="algos" :perPage="7" :initialPage="currentPage_notes" path="/algo-notes/" />
</template>
  
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axios from 'axios';
import DingLan from '@/components/DingLan.vue';
import BlogList from '@/components/BlogList.vue';
import { useRouter, useRoute } from 'vue-router';
import { rememberScroll_algo } from '@/useScrollStore';

const algos = ref([]);
const router = useRouter();
const route = useRoute();

const currentPage_notes = ref(parseInt(route.query.page) || 1);

onMounted(async () => {
    if (!router.currentRoute.value.query.page) {
        router.replace({ path: '/algo-notes', query: { page: 1 } });
    }

    try {
        const response = await axios.get('http://localhost:1337/api/algos');
        algos.value = response.data.data;
        await nextTick(); 
        window.scrollTo(0, rememberScroll_algo.value);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
});

const questionCount = ref(0);
const studyTime = ref(0.0);
const apiUrl = "http://localhost:1337/api/progresses/igfq7qpffu2gtpokbv58g0kg";

const editField = async (field) => {
    const dialog = prompt("请输入权限字符串：");
    if (dialog === '认认真真做好一件事情') {
        if (field === 'questionCount') {
                questionCount.value = parseInt(questionCount.value, 10) + 1;
                await updateProgress();
        } else if (field === 'studyTime') {
            const input = prompt(`请输入要增加的时长（小数）：`);

            const increment = parseFloat(input);
            if (!isNaN(increment)) {
                studyTime.value = parseFloat(studyTime.value) + increment;
                await updateProgress();
            } else {
                alert("输入无效，请输入正确的小数。");
            }
        } else {
            alert("输入无效，请输入正确的值。");
        }
    } else {
        alert("权限字符串错误。");
    }
};

const updateProgress = async () => {
    try {
        await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    questionCount: questionCount.value,
                    studyTime: studyTime.value,
                }
            }),
        });
    } catch (error) {
        console.error("更新失败：", error);
    }
};

onMounted(async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        questionCount.value = data.data.questionCount;
        studyTime.value = data.data.studyTime;
    } catch (error) {
        console.error("获取数据失败：", error);
    }
});
</script>
  
<style scoped>
    body, html {
    text-align: left;
    }

    .parent-container {
    text-align: left;
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
    cursor: not-allowed;
    }

    .small-italic {
    font-size: smaller;
    color: #7a8b9a;
    }

    .important-center {
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
    }
</style>
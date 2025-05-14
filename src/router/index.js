import { createRouter, createWebHistory } from 'vue-router'
import OpenAI from '../views/OpenAI.vue'
import AlgoNotes from '@/views/AlgoNotes.vue'
import PostDetail from '../views/PostDetail.vue'
// import LifeEssay from '@/views/CloudInRain/LifeEssay.vue'
import AboutMe from '@/views/AboutMe.vue';
import CloudInRain from '@/views/CloudInRain/CloudInRain.vue';
import LifeEssay from '@/views/CloudInRain/LifeEssay.vue';

const routes = [
  {
    path: '/',
    name: 'openai',
    component: OpenAI,
  },
  {
    path: '/algo-notes',
    name: 'algoNotes',
    component: AlgoNotes,
  },
  {
    path: '/about-us',
    name: 'aboutMe',
    component: AboutMe
  },
  {
    path: '/exist-and-life',
    name: 'cloudInRain',
    component: CloudInRain
  },
  {
    path: '/posts/:id', // 新增文章详情页路径
    name: 'postDetail',
    component: PostDetail,
    props: true,
  },
  {
    path: '/algos/:id', // 新增文章详情页路径
    name: 'algoDetail',
    component: PostDetail,
    props: true,
  },
  {
    path: '/experiences/:id', // 新增文章详情页路径
    name: 'experienceDetail',
    component: LifeEssay,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
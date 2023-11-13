import { createRouter, createWebHistory } from 'vue-router';
import login from '@/pages/login/login.vue';
import main from '@/pages/main/main.vue';
import calendar from '@/pages/calendar/calendar.vue';
import EmoRecord from '@/pages/EmoRecord/EmoRecord.vue';
import about from '@/pages/about/about.vue';
const routes = [
  {
    path: '/pages/login/login',
    name: 'login',
    component: login,
  },
  {
    path: '/pages/main/main',
    name: 'main',
    component: main,
  },
  {
    path: '/pages/calendar/calendar',
    name: 'calendar',
    component: calendar,
  },
  {
    path: '/pages/EmoRecord/EmoRecord',
    name: 'EmoRecord',
    component: EmoRecord,
  },
  {
    path: '/pages/about/about',
    name: 'about',
    component: about,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

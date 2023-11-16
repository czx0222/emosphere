import { createRouter, createWebHistory } from 'vue-router';
import login from '@/pages/login/login.vue';
import main from '@/pages/main/main.vue';
import calendar from '@/pages/calendar/calendar.vue';
import EmoRecord from '@/pages/EmoRecord/EmoRecord.vue';
import about from '@/pages/about/about.vue';
import questions from '@/pages/questions/questions.vue';
import set from '@/pages/set/set.vue';

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
  {
    path: '/pages/questions/questions',
    name: 'questions',
    component: questions,
  },
  {
    path: '/pages/set/set',
    name: 'set',
    component: set,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

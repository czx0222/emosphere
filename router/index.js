import { createRouter, createWebHistory } from 'vue-router';
import login from '@/pages/login/login.vue';
import main from '@/pages/main/main.vue';
import clander from '@/pages/clander/clander.vue';
import clander1 from '@/pages/clander1/clander1.vue';
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
    path: '/pages/clander/clander',
    name: 'clander',
    component: clander,
  },
  {
    path: '/pages/clander1/clander1',
    name: 'clander1',
    component: clander1,
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

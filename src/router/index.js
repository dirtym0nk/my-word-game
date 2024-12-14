import { createRouter, createWebHistory } from 'vue-router';
import SettingsPage from '../components/SettingsPage.vue';
import GamePage from '../components/GamePage.vue';

const routes = [
  {
    path: '/',
    name: 'Settings',
    component: SettingsPage,
  },
  {
    path: '/game',
    name: 'Game',
    component: GamePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

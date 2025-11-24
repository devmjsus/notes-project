import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NoteListView from '@/views/NoteListView.vue'
import NoteCreateView from '@/views/NoteCreateView.vue'
import useAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notesList',
      component: NoteListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
    {
      path: '/create',
      name: 'noteCreate',
      component: NoteCreateView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = auth.token;

  if (to.meta.requiresAuth && isAuthenticated === null) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;

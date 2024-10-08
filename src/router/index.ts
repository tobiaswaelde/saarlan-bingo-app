import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { Routes } from './routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: Routes.Index,
    component: () => import('~/layouts/default.vue'),
    redirect: { name: Routes.Events },
    children: [
      {
        path: 'events',
        name: Routes.Events,
        component: () => import('~/views/events/index.vue'),
        meta: { title: 'Events' },
      },
      {
        path: 'items',
        name: Routes.Items,
        component: () => import('~/views/items/index.vue'),
        meta: { title: 'Items' },
      },
      {
        path: 'print',
        name: Routes.Print,
        component: () => import('~/views/print/index.vue'),
        meta: { title: 'Print' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const { title } = to.meta;

  if (title) {
    useLayoutStore().title = title;
  } else {
    useLayoutStore().title = 'SaarLAN Bingo';
  }

  return next();
});

export default router;

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        meta: {
          requiredLogin: true,
        },
      },
      {
        path: '/okozukai/rules',
        component: () => import('pages/OkozukaiRules.vue'),
        meta: {
          requiredLogin: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/Login.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: '404',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

import { route } from 'quasar/wrappers';
import { wait } from 'src/boot/wait';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  store.commit('okozukai/setUserId', window.localStorage.getItem('userId'));

  Router.beforeEach((to, from, next) => {
    const retry = 3;
    function guard(tryed = 0) {
      if (retry <= tryed) {
        next('/login');
        return;
      }

      async function waitFetchingUser() {
        for (let i = 0; i <= 20; i++) {
          await wait(500);
          if (!store.state.okozukai.isFetchingUser) {
            guard(tryed + 1);
            return;
          }
        }
        next('/login');
      }

      if (!to.meta.requiredLogin || store.state.okozukai.user) {
        next();
        return;
      } else {
        // まだユーザー情報取得中
        if (store.state.okozukai.isFetchingUser) {
          void waitFetchingUser();
          return;
        } else {
          next('/login');
          return;
        }
      }
    }

    guard();
  });

  return Router;
});

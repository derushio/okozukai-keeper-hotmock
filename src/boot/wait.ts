import { boot } from 'quasar/wrappers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $wait: (ms: number) => Promise<void>;
  }
}

const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default boot(({ app }) => {
  app.config.globalProperties.$wait = wait;
});

export { wait };

<template lang="pug">
q-page.q-pa-md
  .main
    h2.text-h4.q-mb-md Login
    q-btn(@click='login', color='primary') Login
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageLogin',
  setup() {
    const store = useStore();
    const router = useRouter();

    const login = () => {
      store.commit('okozukai/setUserId', 1);
      void store.dispatch('okozukai/fetchUser').then(() => {
        void router.push('/');
      });
    };
    return { store, login };
  },
});
</script>

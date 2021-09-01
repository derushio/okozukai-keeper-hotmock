<template lang="pug">
router-view
q-inner-loading(:showing='store.state.okozukai.isFetchingUser')
  q-spinner-gears.q-mb-lg(size='50px', color='primary')
  p ユーザー情報取得中...
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  setup: () => {
    const store = useStore();
    void store.dispatch('okozukai/fetchUser');
    return { store };
  },
});
</script>

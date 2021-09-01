<template lang="pug">
q-layout(view='hHh lpR fFf')
  q-page-container
    router-view
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageLayout',

  setup() {
    const meta = {
      title: 'Okozukai Keeper',
    };
    useMeta(meta);

    return {
      meta,
    };
  },
});
</script>

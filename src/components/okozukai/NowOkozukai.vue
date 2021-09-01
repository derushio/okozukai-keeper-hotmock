<template lang="pug">
.okozukai
  h2 あなたのおこづかい
  p.q-mb-none {{ store.state.okozukai.nowOkozukai }} 円

  q-inner-loading(:showing='store.state.okozukai.isCalcingNowOkozukai')
    q-spinner-gears(size='50px', color='primary')
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NowOkozukai',
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
});
</script>

<style lang="scss" scoped></style>

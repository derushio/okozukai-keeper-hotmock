<template lang="pug">
q-page.q-pa-md
  .main
    q-card.q-pa-md.q-mb-md
      now-okozukai
    q-card
      okozukai-histories

  q-page-sticky(position='bottom-right', :offset='[18, 18]')
    create-okozukai-history-btn
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import CreateOkozukaiHistoryBtn from 'src/components/okozukai/CreateOkozukaiHistoryBtn.vue';
import NowOkozukai from 'src/components/okozukai/NowOkozukai.vue';
import OkozukaiHistories from 'src/components/okozukai/OkozukaiHistories.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { NowOkozukai, OkozukaiHistories, CreateOkozukaiHistoryBtn },
  setup() {
    const meta = {
      title: 'Home | Okozukai Keeper',
    };
    useMeta(meta);

    return {
      meta,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  max-width: 900px;
  margin: 0 auto;
}
</style>

<template lang="pug">
q-page.q-pa-md
  .main
    q-card
      okozukai-rules

  q-page-sticky(position='bottom-right', :offset='[18, 18]')
    create-okozukai-rule-btn
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import CreateOkozukaiRuleBtn from 'src/components/okozukai/rules/CreateOkozukaiRuleBtn.vue';
import OkozukaiRules from 'src/components/okozukai/rules/OkozukaiRules.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageOkozukaiRules',
  components: { OkozukaiRules, CreateOkozukaiRuleBtn },
  setup() {
    const meta = {
      title: 'Rules | Okozukai Keeper',
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

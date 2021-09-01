<template lang="pug">
q-btn.create-okozukai-rule-btn(
  fab,
  icon='add',
  color='accent',
  @click='createRule'
)
  edit-okozukai-rule-dialog(
    v-if='data.okozukaiRule',
    v-model:isShowing='data.isShowingEditOkozukaiRuleDialog',
    :okozukai-rule-id='data.okozukaiRule.id',
    :is-new='true'
  )
</template>

<script lang="ts">
import dayjs from 'dayjs';
import EditOkozukaiRuleDialog from 'src/components/okozukai/rules/EditOkozukaiRuleDialog.vue';
import { useStore } from 'src/store';
import { OkozukaiRule } from 'src/store/module-okozukai/state';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'createRuleBtn',
  components: {
    EditOkozukaiRuleDialog,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      isShowingEditOkozukaiRuleDialog: false,
      okozukaiRule: null as OkozukaiRule | null,
    });

    const createRule = async () => {
      data.okozukaiRule = (await store.dispatch('okozukai/createRule', {
        title: '収入',
        value: 0,
        mode: 'span',
        span: {
          every: 'month',
          period: 1,
        },
        date: dayjs().format('MM/DD'),
        startTime: dayjs(),
      })) as OkozukaiRule;
      data.isShowingEditOkozukaiRuleDialog = true;
    };

    return {
      data,
      createRule,
    };
  },
});
</script>

<style lang="scss" scoped>
$dialog-min-height: 400px;

.dialog {
  width: 700px;
  max-width: 90%;
  min-height: $dialog-min-height;
}

.edit-okozukai-rule {
  min-height: $dialog-min-height;
}
</style>

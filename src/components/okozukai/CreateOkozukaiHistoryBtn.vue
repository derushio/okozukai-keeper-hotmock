<template lang="pug">
q-btn.create-okozukai-history-btn(
  fab,
  icon='add',
  color='accent',
  @click='createHistory'
)
  edit-okozukai-history-dialog(
    v-if='data.okozukaiHistory',
    v-model:isShowing='data.isShowingEditOkozukaiHistoryDialog',
    :okozukai-history-id='data.okozukaiHistory.id',
    :is-new='true'
  )
</template>

<script lang="ts">
import dayjs from 'dayjs';
import EditOkozukaiHistoryDialog from 'src/components/okozukai/EditOkozukaiHistoryDialog.vue';
import { useStore } from 'src/store';
import { OkozukaiHistory } from 'src/store/module-okozukai/state';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'createHistoryBtn',
  components: {
    EditOkozukaiHistoryDialog,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      isShowingEditOkozukaiHistoryDialog: false,
      okozukaiHistory: null as OkozukaiHistory | null,
    });

    const createHistory = async () => {
      data.okozukaiHistory = (await store.dispatch('okozukai/createHistory', {
        date: dayjs(),
        title: '臨時支出',
        value: 0,
      })) as OkozukaiHistory;
      data.isShowingEditOkozukaiHistoryDialog = true;
    };

    return {
      data,
      createHistory,
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

.edit-okozukai-history {
  min-height: $dialog-min-height;
}
</style>

<template lang="pug">
q-table.okozukai(
  flat,
  title='おこづかい使用履歴',
  :pagination='table.pagination',
  :columns='table.columns',
  :rows='store.state.okozukai.histories',
  :rows-per-page-options='[table.pagination.rowsPerPage]',
  @row-click='onClickRow'
)
q-inner-loading(:showing='store.state.okozukai.isFetchingHistories')
  q-spinner-gears(size='50px', color='primary')

edit-okozukai-history-dialog(
  v-if='data.editingOkozukaiHistoryId',
  v-model:isShowing='computedIsShowingEditOkozukaiHistoryDialog',
  :okozukaiHistoryId='data.editingOkozukaiHistoryId'
)
</template>

<script lang="ts">
import { Dayjs } from 'dayjs';
import EditOkozukaiHistoryDialog from 'src/components/okozukai/EditOkozukaiHistoryDialog.vue';
import { useStore } from 'src/store';
import { OkozukaiHistory } from 'src/store/module-okozukai/state';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'OkozukaiHistories',
  components: {
    EditOkozukaiHistoryDialog,
  },
  setup() {
    const store = useStore();

    const data = reactive({
      editingOkozukaiHistoryId: null as number | null,
    });
    const computedIsShowingEditOkozukaiHistoryDialog = computed({
      get() {
        return data.editingOkozukaiHistoryId != null;
      },
      set(isShowingEditOkozukaiHistoryDialog: boolean) {
        if (!isShowingEditOkozukaiHistoryDialog) {
          data.editingOkozukaiHistoryId = null;
        }
      },
    });

    const table = {
      pagination: {
        rowsPerPage: 20,
      },
      columns: [
        {
          name: 'date',
          required: true,
          label: '日付',
          field: (row: OkozukaiHistory) => row.date,
          format: (val: Dayjs) => val.format('YYYY/MM/DD'),
          sortable: true,
        },
        {
          name: 'title',
          required: true,
          label: '名称',
          field: (row: OkozukaiHistory) => row.title,
          sortable: true,
        },
        {
          name: 'value',
          required: true,
          label: '収支',
          field: (row: OkozukaiHistory) => row.value,
          format: (val: number) => `${val}円`,
          sortable: true,
        },
      ],
    };

    const onClickRow = (evt: Event, row: OkozukaiHistory) => {
      if (row.id == null) {
        return;
      }
      data.editingOkozukaiHistoryId = row.id;
    };

    void store.dispatch('okozukai/fetchHistories');

    return {
      store,
      data,
      table,
      computedIsShowingEditOkozukaiHistoryDialog,
      onClickRow,
    };
  },
});
</script>

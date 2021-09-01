<template lang="pug">
q-table.okozukai(
  flat,
  title='おこづかいルール',
  :pagination='table.pagination',
  :columns='table.columns',
  :rows='store.state.okozukai.rules',
  :rows-per-page-options='[table.pagination.rowsPerPage]',
  @row-click='onClickRow'
)
q-inner-loading(:showing='store.state.okozukai.isFetchingRules')
  q-spinner-gears(size='50px', color='primary')

edit-okozukai-rule-dialog(
  v-if='data.editingOkozukaiRuleId',
  v-model:isShowing='computedIsShowingEditOkozukaiRuleDialog',
  :okozukaiRuleId='data.editingOkozukaiRuleId'
)
</template>

<script lang="ts">
import EditOkozukaiRuleDialog from 'src/components/okozukai/rules/EditOkozukaiRuleDialog.vue';
import { useStore } from 'src/store';
import { OkozukaiRule } from 'src/store/module-okozukai/state';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'OkozukaiRules',
  components: { EditOkozukaiRuleDialog },
  setup() {
    const store = useStore();

    const data = reactive({
      editingOkozukaiRuleId: null as number | null,
    });
    const computedIsShowingEditOkozukaiRuleDialog = computed({
      get() {
        return data.editingOkozukaiRuleId != null;
      },
      set(isShowingEditOkozukaiRuleDialog: boolean) {
        if (!isShowingEditOkozukaiRuleDialog) {
          data.editingOkozukaiRuleId = null;
        }
      },
    });

    const table = {
      pagination: {
        rowsPerPage: 20,
      },
      columns: [
        {
          name: 'title',
          required: true,
          label: '名称',
          field: (row: OkozukaiRule) => row.title,
          sortable: true,
        },
        {
          name: 'value',
          required: true,
          label: '収支',
          field: (row: OkozukaiRule) => row.value,
          format: (val: number) => `${val}円`,
          sortable: true,
        },
        {
          name: 'mode',
          required: true,
          label: 'モード',
          field: (row: OkozukaiRule) => row.mode,
          sortable: true,
        },
        {
          name: 'rule',
          required: true,
          label: 'ルール',
          field: (row: OkozukaiRule) =>
            row.mode === 'span'
              ? `毎 ${row.spanEvery} ${row.spanPeriod}`
              : row.mode === 'date'
              ? `毎年 ${row.date}`
              : '-',
          sortable: true,
        },
        {
          name: 'start',
          required: true,
          label: '開始',
          field: (row: OkozukaiRule) =>
            row.startTime.format('YYYY/MM/DD HH:mm'),
          sortable: true,
        },
        {
          name: 'end',
          required: true,
          label: '終了',
          field: (row: OkozukaiRule) =>
            row.endTime ? row.endTime.format('YYYY/MM/DD HH:mm') : '-',
          sortable: true,
        },
      ],
    };

    const onClickRow = (evt: Event, row: OkozukaiRule) => {
      if (row.id == null) {
        return;
      }
      data.editingOkozukaiRuleId = row.id;
    };

    void store.dispatch('okozukai/fetchRules');

    return {
      store,
      data,
      table,
      computedIsShowingEditOkozukaiRuleDialog,
      onClickRow,
    };
  },
});
</script>

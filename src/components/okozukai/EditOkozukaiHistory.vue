<template lang="pug">
.edit-okozukai-history.column
  .q-pa-lg
    h2.text-h6.q-mb-md おこづかい履歴編集
    template(v-if='data.okozukaiHistory')
      q-form
        q-input(
          label='日付',
          v-model='computedOkozukaiHistoryDate',
          mask='date',
          :rules='["date"]'
        )
          template(v-slot:append)
            q-icon.cursor-pointer(name='event')
              q-popup-proxy(
                ref='qDateProxy',
                transition-show='scale',
                transition-hide='scale'
              )
                q-date(v-model='computedOkozukaiHistoryDate')
                  .row.items-center.justify-end
                    q-btn(v-close-popup, label='Close', color='primary', flat)
        q-input(
          label='名称',
          v-model='data.okozukaiHistory.title',
          type='string'
        )
        q-input(
          label='収支',
          suffix='円',
          v-model.number='data.okozukaiHistory.value',
          type='number',
          input-class='text-right'
        )
    template(v-if='data.getOkozukaiHistoryError')
      q-banner.text-white.bg-red(inline-actions) 履歴が見つかりませんでした

    q-inner-loading(
      :showing='!data.okozukaiHistory && !data.getOkozukaiHistoryError'
    )
      q-spinner-gears(size='50px', color='primary')
  q-space
  q-separator
  q-card-actions(align='right')
    q-btn.action-btn(flat, color='warning', @click='cancel') CANCEL
    q-btn.action-btn(
      v-if='data.okozukaiHistory && !data.getOkozukaiHistoryError',
      flat,
      color='primary',
      @click='ok'
    ) OK
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { OkozukaiHistory } from 'src/store/module-okozukai/state';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'EditOkozukaiHistory',
  props: {
    okozukaiHistoryId: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const store = useStore();
    const q = useQuasar();
    const data = reactive({
      okozukaiHistory: null as OkozukaiHistory | null,
      getOkozukaiHistoryError: null as Error | null,
    });

    const computedOkozukaiHistoryDate = computed({
      get() {
        return data.okozukaiHistory?.date.format('YYYY/MM/DD') || '';
      },
      set(dateString: string) {
        if (data.okozukaiHistory) {
          data.okozukaiHistory.date = dayjs(dateString);
        }
      },
    });

    const ok = async () => {
      q.loading.show();
      try {
        await store.dispatch('okozukai/updateHistory', data.okozukaiHistory);
      } finally {
        context.emit('ok');
        q.loading.hide();
      }
    };

    const cancel = async () => {
      q.loading.show();
      try {
        if (props.isNew && data.okozukaiHistory) {
          await store.dispatch(
            'okozukai/deleteHistory',
            data.okozukaiHistory.id
          );
        }
      } finally {
        context.emit('cancel');
        q.loading.hide();
      }
    };

    void store
      .dispatch('okozukai/findHistoryById', props.okozukaiHistoryId)
      .then(
        (history: OkozukaiHistory | null) => (data.okozukaiHistory = history)
      )
      .catch((e: Error) => {
        data.getOkozukaiHistoryError = e;
      });

    return {
      props,
      context,
      store,
      data,
      computedOkozukaiHistoryDate,
      ok,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.action-btn {
  width: 5em;
}
</style>

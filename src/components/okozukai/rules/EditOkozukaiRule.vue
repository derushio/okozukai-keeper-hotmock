<template lang="pug">
.edit-okozukai-rule.column
  .q-pa-lg
    h2.text-h6.q-mb-md おこづかい履歴編集
    template(v-if='data.okozukaiRule')
      q-form
        q-input(label='名称', v-model='data.okozukaiRule.title', type='string')
        q-input.q-mb-md(
          label='収支',
          suffix='円',
          v-model.number='data.okozukaiRule.value',
          type='number',
          input-class='text-right'
        )

        q-tabs(v-model='data.okozukaiRule.mode', align='justify')
          q-tab(name='span') span
          q-tab(name='date') date
        q-tab-panels(v-model='data.okozukaiRule.mode', animated)
          q-tab-panel(name='span')
            .row
              q-select.select-span-every.q-mr-md(
                label='Every',
                v-model='data.okozukaiRule.spanEvery',
                :options='["hour", "day", "month"]'
              )
              .col
                q-input(
                  label='Period',
                  v-model.number='data.okozukaiRule.spanPeriod',
                  type='number',
                  input-class='text-right'
                )
          q-tab-panel(name='date')
            q-input(label='毎年', v-model='data.okozukaiRule.date')
              template(v-slot:append)
                q-icon.cursor-pointer(name='event')
                  q-popup-proxy(
                    ref='qDateProxy',
                    transition-show='scale',
                    transition-hide='scale'
                  )
                    q-date(v-model='data.okozukaiRule.date', mask='MM/DD')
                      .row.items-center.justify-end
                        q-btn(
                          v-close-popup,
                          label='Close',
                          color='primary',
                          flat
                        )

        q-separator

        q-input(
          label='ルール開始時間',
          v-model='computedOkozukaiRuleStartTime',
          :rules='["datetime"]'
        )
          template(v-slot:prepend)
            q-icon.cursor-pointer(name='event')
              q-popup-proxy(
                ref='qDateProxy',
                transition-show='scale',
                transition-hide='scale'
              )
                q-date(
                  v-model='computedOkozukaiRuleStartTime',
                  mask='YYYY/MM/DD HH:mm'
                )
                  .row.items-center.justify-end
                    q-btn(v-close-popup, label='Close', color='primary', flat)
          template(v-slot:append)
            q-icon.cursor-pointer(name='access_time')
              q-popup-proxy(
                ref='qDateProxy',
                transition-show='scale',
                transition-hide='scale'
              )
                q-time(
                  v-model='computedOkozukaiRuleStartTime',
                  mask='YYYY/MM/DD HH:mm',
                  format24h
                )
                  .row.items-center.justify-end
                    q-btn(v-close-popup, label='Close', color='primary', flat)

        q-input(
          label='ルール終了時間',
          v-model='computedOkozukaiRuleEndTime',
          :rules='["datetime"]'
        )
          template(v-slot:prepend)
            q-icon.cursor-pointer(name='event')
              q-popup-proxy(
                ref='qDateProxy',
                transition-show='scale',
                transition-hide='scale'
              )
                q-date(
                  v-model='computedOkozukaiRuleEndTime',
                  mask='YYYY/MM/DD HH:mm'
                )
                  .row.items-center.justify-end
                    q-btn(v-close-popup, label='Close', color='primary', flat)
          template(v-slot:append)
            q-icon.cursor-pointer(name='access_time')
              q-popup-proxy(
                ref='qDateProxy',
                transition-show='scale',
                transition-hide='scale'
              )
                q-time(
                  v-model='computedOkozukaiRuleEndTime',
                  mask='YYYY/MM/DD HH:mm',
                  format24h
                )
                  .row.items-center.justify-end
                    q-btn(v-close-popup, label='Close', color='primary', flat)

    template(v-if='data.getOkozukaiRuleError')
      q-banner.text-white.bg-red(inline-actions) 履歴が見つかりませんでした

    q-inner-loading(
      :showing='!data.okozukaiRule && !data.getOkozukaiRuleError'
    )
      q-spinner-gears(size='50px', color='primary')
  q-space
  q-separator
  q-card-actions(align='right')
    q-btn.action-btn(flat, color='warning', @click='cancel') CANCEL
    q-btn.action-btn(
      v-if='data.okozukaiRule && !data.getOkozukaiRuleError',
      flat,
      color='primary',
      @click='ok'
    ) OK
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { OkozukaiRule } from 'src/store/module-okozukai/state';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'EditOkozukaiRule',
  props: {
    okozukaiRuleId: {
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
      okozukaiRule: null as OkozukaiRule | null,
      getOkozukaiRuleError: null as Error | null,
    });

    const computedOkozukaiRuleStartTime = computed({
      get() {
        return data.okozukaiRule?.startTime.format('YYYY/MM/DD HH:mm') || '';
      },
      set(dateString: string) {
        if (data.okozukaiRule) {
          data.okozukaiRule.startTime = dayjs(dateString);
        }
      },
    });
    const computedOkozukaiRuleEndTime = computed({
      get() {
        return data.okozukaiRule?.endTime?.format('YYYY/MM/DD HH:mm') || '';
      },
      set(dateString: string) {
        if (data.okozukaiRule) {
          data.okozukaiRule.endTime = dayjs(dateString);
        }
      },
    });

    const ok = async () => {
      q.loading.show();
      try {
        await store.dispatch('okozukai/updateRule', data.okozukaiRule);
      } finally {
        context.emit('ok');
        q.loading.hide();
      }
    };

    const cancel = async () => {
      q.loading.show();
      try {
        if (props.isNew && data.okozukaiRule) {
          await store.dispatch('okozukai/deleteRule', data.okozukaiRule.id);
        }
      } finally {
        context.emit('cancel');
        q.loading.hide();
      }
    };

    void store
      .dispatch('okozukai/findRuleById', props.okozukaiRuleId)
      .then((rule: OkozukaiRule | null) => (data.okozukaiRule = rule))
      .catch((e: Error) => {
        data.getOkozukaiRuleError = e;
      });

    return {
      props,
      context,
      store,
      data,
      computedOkozukaiRuleStartTime,
      computedOkozukaiRuleEndTime,
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

.select-span-every {
  min-width: 10em;
}
</style>

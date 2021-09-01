<template lang="pug">
q-dialog(v-model='computedIsShowing')
  q-card.dialog
    edit-okozukai-history(
      :okozukai-history-id='props.okozukaiHistoryId',
      :is-new='props.isNew',
      @ok='computedIsShowing = false',
      @cancel='computedIsShowing = false'
    )
</template>

<script lang="ts">
import EditOkozukaiHistory from 'src/components/okozukai/EditOkozukaiHistory.vue';
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'createHistoryBtn',
  components: {
    EditOkozukaiHistory,
  },
  props: {
    isShowing: {
      type: Boolean,
      required: true,
    },
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

    const computedIsShowing = computed({
      get() {
        return props.isShowing;
      },
      set(isShowing) {
        context.emit('update:isShowing', isShowing);
      },
    });

    return {
      props,
      context,
      store,
      computedIsShowing,
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

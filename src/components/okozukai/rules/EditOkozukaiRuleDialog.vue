<template lang="pug">
q-dialog(v-model='computedIsShowing')
  q-card.dialog
    edit-okozukai-rule(
      :okozukai-rule-id='props.okozukaiRuleId',
      :is-new='props.isNew',
      @ok='computedIsShowing = false',
      @cancel='computedIsShowing = false'
    )
</template>

<script lang="ts">
import EditOkozukaiRule from 'src/components/okozukai/rules/EditOkozukaiRule.vue';
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'createRuleBtn',
  components: {
    EditOkozukaiRule,
  },
  props: {
    isShowing: {
      type: Boolean,
      required: true,
    },
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

.edit-okozukai-rule {
  min-height: $dialog-min-height;
}
</style>

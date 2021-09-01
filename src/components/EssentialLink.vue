<template lang="pug">
q-item(
  v-if='props.to',
  clickable,
  tag='router-link',
  :to='props.to',
  :exact='true'
)
  q-item-section(v-if='icon', avatar)
    q-icon(:name='icon')

  q-item-section
    q-item-label {{ title }}
    q-item-label(caption) {{ caption }}
q-item(v-else, clickable, tag='a', target='_blank', :href='link')
  q-item-section(v-if='icon', avatar)
    q-icon(:name='icon')

  q-item-section
    q-item-label {{ title }}
    q-item-label(caption) {{ caption }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    to: {
      type: String,
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    target: {
      type: String,
      default: '_self',
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

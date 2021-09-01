<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated)
    q-toolbar
      q-btn(
        flat,
        dense,
        round,
        icon='menu',
        aria-label='Menu',
        @click='data.leftDrawerOpen = !data.leftDrawerOpen'
      )

      q-toolbar-title {{ meta.title }}

      div Quasar v{{ $q.version }}

  q-drawer.bg-grey-1(v-model='data.leftDrawerOpen', show-if-above, bordered)
    q-list
      q-item-label.text-grey-8(header) Essential Links

      EssentialLink(
        v-for='link in essentialLinks',
        :key='link.title',
        v-bind='link'
      )

  q-page-container
    router-view
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import { useMeta } from 'quasar';
import { defineComponent, reactive } from 'vue';

const linksList = [
  {
    title: 'Home',
    caption: 'おこづかい帳',
    icon: 'notes',
    to: '/',
  },
  {
    title: 'Rules',
    caption: 'おこづかいルール',
    icon: 'schedule',
    to: '/okozukai/rules',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const meta = {
      title: 'Okozukai Keeper',
    };
    useMeta(meta);

    const data = reactive({
      leftDrawerOpen: false,
    });

    return {
      meta,
      data,
      essentialLinks: linksList,
    };
  },
});
</script>

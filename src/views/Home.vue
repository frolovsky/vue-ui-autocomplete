<template>
  <div class="home">
    <div class="ui-components">
      <ui-autocomplete
        v-model="autocompleteValue"
        :items="autocompleteItems"
        item-text-key="text"
        item-value-key="id"
        placeholder="Выберите рыбку"
        label="Список"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const UiAutocomplete = () =>
  import(
    /* webpackChunkName: "ui-autocomplete" */ "@/components/ui/ui-autocomplete/ui-autocomplete.vue"
  );

@Component({
  components: {
    UiAutocomplete,
  },
})
export default class Home extends Vue {
  autocompleteValue: null | string | number = null;
  autocompleteItems = [
    {
      id: 371,
      text: 'акула-катран',
    },
    {
      id: 370,
      text: 'акулы',
    },
    {
      id: 369,
      text: 'акулы, скаты',
    },
    {
      id: 133,
      text: 'амур',
    },
    {
      id: 19,
      text: 'анчоусы',
    },
    {
      id: 678,
      text: 'арки',
    },
    {
      id: 457,
      text: 'артемии всего',
    },
    {
      id: 625,
      text: 'асцидии',
    },
    {
      id: 177,
      text: 'берикс',
    },
    {
      id: 676,
      text: 'беспозвоночные',
    },
  ];
}
</script>

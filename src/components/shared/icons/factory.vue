<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
  >
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <slot />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "UiIconFactory",
})
export default class UiIconFactory extends Vue {
  @Prop({ type: String, default: "" }) iconName!: string;
  @Prop({ type: String, default: "" }) viewBox!: string;
  @Prop({ type: [String, Number], default: 24 }) width!: string | number;
  @Prop({ type: [String, Number], default: 24 }) height!: string | number;
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>

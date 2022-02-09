<script lang="ts">
import Vue, { VNode, CreateElement, RenderContext } from "vue";

interface UiHighlightProps {
  text: string;
  highlight: string;
  index: number;
  fontWeight: number;
}

export default Vue.extend({
  name: "UiHighlight",

  functional: true,

  props: ["text", "index", "fontWeight", "highlight"],

  render(
    h: CreateElement,
    {
      props: { text, index, fontWeight, highlight },
    }: RenderContext<UiHighlightProps>
  ): VNode {
    return h("span", [
      text.substring(0, index),
      h(
        "span",
        {
          style: { fontWeight },
        },
        text.substring(index, index + highlight.length)
      ),
      text.substring(index + highlight.length),
    ]);
  },
});
</script>

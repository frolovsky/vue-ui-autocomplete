<script lang="ts">
import Vue, { RenderContext, CreateElement, VNode } from "vue";
import { UiInputWrapperProps } from "@/components/ui/ui-input-wrapper/ui-input-wrapper.types";

export default Vue.extend({
  functional: true,
  props: [
    "label",
    "id",
    "hasError",
    "disabled",
    "isFile",
    "noBottomRadius",
    "separated",
  ],
  render(h: CreateElement, ctx: RenderContext<UiInputWrapperProps>): VNode {
    const props = ctx.props;
    return h(
      "label",
      {
        staticClass: "ui-input",
        class: {
          "ui-input--error": props.hasError,
          "ui-input--disabled": props.disabled,
          "ui-file-input": props.isFile,
        },
        attrs: {
          for: props.id,
        },
      },
      [
        h(
          "span",
          {
            staticClass: "ui-input__label",
            class: { "ui-input__label--separated": props.separated },
          },
          props.label
        ),
        h(
          "span",
          {
            staticClass: "ui-input__content",
            class: {
              "ui-input__content--no-bottom-radius": props.noBottomRadius,
            },
          },
          ctx.children
        ),
      ]
    );
  },
});
</script>

<style lang="scss">
.ui-file-input {
  height: 56px;
  display: block;
  cursor: pointer;

  .file-input__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 18px 0 14px;
  }

  .file-input__text {
    color: $text-color;
    font-size: 16px;
    line-height: 22px;

    &:last-child {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>

<style scoped lang="scss">
.ui-input {
  position: relative;
  transition: all 0.2s;
  width: 100%;

  &--error {
    border-color: $error-border-color;
  }

  &--disabled {
    cursor: default;
    background-color: #f7fafd;
  }

  &__label {
    color: #7991b4;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    left: 7px;
    top: -10px;
    background-color: #fff;
    padding: 2px;
    z-index: 1;

    &--separated {
      color: $text-color--deep;
      font-size: 14px;
      margin-bottom: 6px;
      position: relative;
      top: 0;
      left: 0;
      display: block;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 16px;
    border: 1px solid rgba(121, 145, 180, 0.5);
    background-color: #fff;
    border-radius: $app-radius;
    color: $text-color--deep;
    transition: all 0.2s;
    min-height: 56px;

    &--no-bottom-radius {
      border-radius: $app-radius $app-radius 0 0;
    }

    &:focus {
      border-color: #1a7fc3;
    }

    &::placeholder {
      color: rgba(121, 145, 180, 0.5);
    }
  }
}
</style>

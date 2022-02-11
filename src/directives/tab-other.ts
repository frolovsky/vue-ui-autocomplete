import { DirectiveOptions } from "vue";

interface HTMLElementWithTabOtherEvent extends HTMLElement {
  tabOtherEvent: (e: KeyboardEvent) => void;
}

export const tabOtherDirective: DirectiveOptions = {
  bind(el, binding) {
    (el as HTMLElementWithTabOtherEvent).tabOtherEvent = (event) => {
      setTimeout(() => {
        if (
          event.key === "Tab" &&
          !(
            document.activeElement === el || el.contains(document.activeElement)
          )
        ) {
          if (binding.value && typeof binding.value === "function") {
            binding.value();
          }
        }
      }, 0);
    };
    document.addEventListener(
      "keydown",
      (el as HTMLElementWithTabOtherEvent).tabOtherEvent
    );
  },
  unbind(el) {
    document.removeEventListener(
      "keydown",
      (el as HTMLElementWithTabOtherEvent).tabOtherEvent
    );
  },
};

import { DirectiveOptions } from "vue";

interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent: (e: any) => void;
}

export const clickOutsideDirective: DirectiveOptions = {
  bind(el, binding) {
    (el as HTMLElementWithClickOutside).clickOutsideEvent = (event) => {
      if (!(event.target === el || el.contains(event.target))) {
        if (binding.value && typeof binding.value === "function") {
          binding.value();
        }
      }
    };
    document.addEventListener(
      "click",
      (el as HTMLElementWithClickOutside).clickOutsideEvent
    );
  },
  unbind(el) {
    document.removeEventListener(
      "click",
      (el as HTMLElementWithClickOutside).clickOutsideEvent
    );
  },
};

import { nextTick, useState, onBeforeMount, onUnmounted } from "#imports";
import { isConsistTarget, isReachedBottom } from "../utils";

const useSelect = ({ id = "", onReachedBottom = (e) => {} }) => {
  const uid = id || useId();

  const isOpened = useState(`select-opened-${uid}`, () => false);

  const inputRef = useState(`select-input-${uid}`, () => null);

  const toggle = () => {
    if (document.activeElement != inputRef.value) {
      isOpened.value = !isOpened.value;
    }

    nextTick(() => {
      inputRef.value?.focus?.();
    });
  };
  const close = () => {
    isOpened.value = false;
  };

  const buttonRef = useState(`select-button-${id}`, () => null);

  const wrapperRef = useState(`select-wrapper-${id}`, () => null);

  const handleClickOutside = (event) => {
    if (!wrapperRef.value) return;

    if (!isConsistTarget(wrapperRef.value, event.target)) {
      isOpened.value = false;
    }
  };

  const wrapper = {
    bind: {
      ref: (el) => {
        wrapperRef.value = el;
      },
    },
  };
  const input = {
    bind: {
      ref: (el) => {
        inputRef.value = el;
      },
    },
  };
  const button = {
    bind: { ref: (el) => (buttonRef.value = el) },
    on: { click: toggle },
  };
  const content = {
    on: { scroll: (e) => isReachedBottom(e) && onReachedBottom(e) },
  };

  onBeforeMount(() => {
    document.addEventListener("click", handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return {
    isOpened,
    input,
    close,
    toggle,
    wrapper,
    content,
    button,
    buttonRef
  };
};
export default useSelect;

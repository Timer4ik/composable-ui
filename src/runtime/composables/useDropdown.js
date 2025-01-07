// EXAMPLE OF USAGE
// const {
//   wrapper,
//   isOpened,
//   toggle,
// } = useDropdown();
// <div v-bind="wrapper">
//   <button @click="toggle">

//   </button>
//   <div v-if="isOpened">
//     someContent
//   </div>
// </div>

export default function useDropdown() {
  const uid = useId();

  const contentRef = useState("content-ref-" + uid, () => null);
  const buttonRef = useState("button-ref-" + uid, () => null);

  const isOpened = useState("is-opened-ref-" + uid, () => false);

  const toggle = () => {
    isOpened.value = !isOpened.value;

    nextTick(() => {
      contentRef?.value?.focus();
    });
  };

  const setContentRef = (el) => {
    contentRef.value = el;
  };

  const setButtonRef = (el) => {
    buttonRef.value = el;
  };

  const onFocusout = (e) => {
    if (
      !contentRef?.value?.contains?.(e.relatedTarget) &&
      !buttonRef?.value?.contains?.(e.relatedTarget)
    )
      isOpened.value = false;
  };

  const contentBind = {
    ref: setContentRef,
    onFocusout: onFocusout,
    tabindex: "-1",
  };

  const buttonBind = {
    ref: setButtonRef,
  };

  return {
    isOpened,
    toggle,
    onFocusout,
    setButtonRef,
    setContentRef,
    contentBind,
    buttonBind,
    wrapper: contentBind,
  };
}

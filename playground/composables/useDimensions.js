import debounce from "lodash/debounce";

const DIMENSION_MAP = {
  xl: "1200px",
  lg: "992px",
  md: "768px",
  sm: "576px",
  xs: "0px",
};

export default function () {
  const isMobile = useState("is-mobile", () => null);
  const alreadyHasObserver = useState("is-mobile-observer");

  const debounceUpdate = debounce(() => {
    isMobile.value = window?.matchMedia(
      `(max-width: ${DIMENSION_MAP.xl})`
    )?.matches;
  }, 1000);

  if (!alreadyHasObserver.value && import.meta.client) {
    alreadyHasObserver.value = true;
    new ResizeObserver(() => {
      debounceUpdate();
    }).observe(document.body);
  }

  onMounted(() => {
    if (!alreadyHasObserver.value) {
      isMobile.value = window?.matchMedia(
        `(max-width: ${DIMENSION_MAP.xl})`
      )?.matches;
    }
  });

  return {
    isMobile,
  };
}

export default ({ id = null, defaultDates = [] } = {}) => {
  const uid = id || useId();

  const startDate = useState(`${uid}-start-date`, () => defaultDates?.[0]);
  const endDate = useState(`${uid}-end-date`, () => defaultDates?.[1]);
  // for set date
  const lastSelectedDates = useState(`${uid}-last-select-date`, () => []);

  const currentDates = computed(() => [startDate.value, endDate.value]);

  const setCurrentDates = (date) => {
    // date in milliseconds
    lastSelectedDates.value.push(new Date(date).valueOf());
    startDate.value = lastSelectedDates.value[0];
    endDate.value = null;

    if (lastSelectedDates.value?.length < 2) return;

    [startDate.value, endDate.value] = [...lastSelectedDates.value].sort(
      (a, b) => a - b
    );

    lastSelectedDates.value = [];
  };

  return {
    startDate,
    endDate,
    currentDates,
    setCurrentDates,
  };
};

export default ({ id = null, defaultDate = null } = {}) => {
  const uid = id || useId();

  const currentDate = useState(`${uid}-current-date`, () => defaultDate);
  const setCurrentDate = (date) => (currentDate.value = date);

  return {
    currentDate,
    setCurrentDate,
  };
};

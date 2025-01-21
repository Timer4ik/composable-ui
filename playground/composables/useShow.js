export default ({ id = null } = {}) => {
  const uid = id || useId();

  const isShow = useState(`${uid}-is-show`);
  const setShow = (value) => (isShow.value = value);
  const toggleShow = () => setShow(!isShow.value);

  return {
    isShow,
    setShow,
    toggleShow,
  };
};

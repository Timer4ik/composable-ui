const useToggle = (initial = false) => {

  const uid = useId();
  const active = useState(uid,() => initial);

  const enable = () => {
    active.value = true;
  };

  const disable = () => {
    active.value = false;
  };

  const toggle = () => {
    active.value = !active.value;
  };

  return { active, toggle, enable, disable };
};

export default useToggle;

const useUniqueState = (value) => useState(useId(), () => value || null);

export default useUniqueState
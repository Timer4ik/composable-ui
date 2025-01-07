export default ({ initialShowMore, initialCount }) => {
  const uid = useId();
  const isShowMore = useState(uid, () => initialShowMore);

  return {
    isShowMore,
    getVisibleData(data) {
      if (isShowMore.value) return data;
      return data.slice(0, initialCount);
    },
    canShowMore(data) {
      return data?.length > initialCount;
    },
  };
};

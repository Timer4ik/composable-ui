import { useState, useId } from "#imports";
import { v4 } from "uuid";

export default () => {
  const uniqKey = useState(useId(), () => useId());

  const updateUniqKey = () => (uniqKey.value = v4());

  return {
    uniqKey,
    updateUniqKey,
  };
};

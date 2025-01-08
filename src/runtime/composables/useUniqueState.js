import { useState, useId, } from "#imports";

const useUniqueState = (value) => useState(useId(), () => value || null);

export default useUniqueState
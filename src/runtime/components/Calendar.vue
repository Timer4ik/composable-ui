<template>
  <slot :="{ selectedDate, dates, next, prev, update }" />
</template>

<script setup>
import useCalendar from "../composables/useCalendar";

const props = defineProps({
  id: {
    type: [Number, String],
  },
  initialDate: {
    type: Date,
    default: Date.now(),
  },
  isFixedNumberDays: {
    type: Boolean,
  },
  forEachDate: {
    type: Function,
    default: (v) => v,
  },
  onUpdate: {
    type: Function,
  },
  deps: {
    type: [Array],
    default: [],
  },
});

const { selectedDate, dates, next, prev, update } = useCalendar({
  ...props,
});
</script>

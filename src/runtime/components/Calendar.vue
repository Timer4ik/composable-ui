<template>
  <slot :="{ selectedDate, dates, next, prev, update }" />
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  id: {
    type: [Number, String],
  },
  initialDate: {
    type: [Date, Number],
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

const deps = computed(() => props.deps);

const { calendarPageDate, dates, next, prev, update } = useCalendar({
  ...props,
  deps,
});
</script>

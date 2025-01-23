<template>
  <slot
    v-bind="{ open, close, isActive, toggle, name, data, callEvent, onEvent }"
  />
</template>

<script setup>
import useModal from "../composables/useModal";

const props = defineProps({
  name: String,
  initialData: [Object, Array, String, Boolean],
  initialIsActive: Boolean,
});

const { open, close, isActive, toggle, name, data, callEvent, onEvent } =
  useModal({
    name: props.name,
    initialData: props.initialData,
    initialIsActive: props.initialIsActive,
  });
</script>

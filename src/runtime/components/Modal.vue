<template>
  <slot v-bind="{ open, close, isActive, toggle, name, data, emit, on }" />
</template>

<script setup>
import { defineProps } from "vue";
import useModal from "../composables/useModal";

const props = defineProps({
  name: String,
  initialData: [Object, Array, String, Boolean],
  initialIsActive: Boolean,
});

const { open, close, isActive, toggle, name, data, emit, on } =
  useModal({
    name: props.name,
    initialData: props.initialData,
    initialIsActive: props.initialIsActive,
  });
</script>

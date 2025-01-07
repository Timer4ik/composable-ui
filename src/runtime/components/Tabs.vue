<template>
    <slot
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        v-if="modelValue == item.name"
    />
</template>

<script setup>
import { defineModel } from 'vue';

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    tabs: Array,
    by: String,
})

const modelValue = defineModel()

</script>
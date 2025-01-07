<template>
    <slot
        :active="active"
        :toggle="toggle"
    />
</template>

<script setup>
import useToggle from '../composables/useToggle';
const props = defineProps(['initialValue'])
const { active,toggle } = useToggle(props.initialValue)
</script>
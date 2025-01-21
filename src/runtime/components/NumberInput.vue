<template>
    <slot
        :on="{
            input: onInput,
            blur: onBlur
        }"
        :bind="bind"
    />
</template>

<script setup>
import useNumberInput from "../composables/useNumberInput";

const emits = defineEmits({
    "update:modelValue": null
})
const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: 0
    },
    id: { type: [Number, String] },
    min: {
        type: Number,
        default: -1_000_000_000
    },
    max: {
        type: Number,
        default: 1_000_000_000
    },
    fixed: {
        type: Number,
        default: 0
    },
    step: {
        type: Number,
        default: null
    },
})

const { bind } = useNumberInput({
    id: props.id,
    min: props.min,
    max: props.max,
    fixed: props.fixed,
    step: props.step,
    defaultValue: props.modelValue,
    onUpdate(value) {

        const number = +value.replace(/[^0-9\-,.]/g, '')

        emits('update:modelValue', number)
    }
})


</script>
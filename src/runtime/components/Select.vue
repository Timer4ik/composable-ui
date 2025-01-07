<template>
    <slot
        :button="button"
        :content="content"
        :input="input"
        :isOpened="isOpened"
        :toggle="toggle"
        :close="close"
        :wrapper="wrapper"
    />
</template>

<script setup>
import useSelect from '../composables/useSelect';

const emits = defineEmits(["select", 'reachedBottom'])
const props = defineProps({
    id: String
})

const { button, content, wrapper, close, input, isOpened, toggle } = useSelect({
    onReachedBottom: (...attrs) => emits('reachedBottom', ...attrs),
    id: props.id,
})

</script>
<template>
  <slot :items="getBreadcrumps(links)" />
</template>

<script setup>
import { getBreadcrumps } from '../utils';

const props = defineProps({
  links: Array
})
</script>

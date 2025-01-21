<template>
  <div class="">State mobile: {{ isMobile }}</div>
</template>

<script setup>
import useDimensions from "~/composables/useDimensions";

const { isMobile } = useDimensions();
</script>

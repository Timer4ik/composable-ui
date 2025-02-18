<template>
  <div class="">
    <button @click="updateUniqKey">Toggle</button>
    <ForceRender :key="uniqKey" />
  </div>
</template>

<script setup>
const { uniqKey, updateUniqKey } = useForceRender();

</script>

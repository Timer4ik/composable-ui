<template>
  <slot
      v-bind="$attrs"
      :data="data"
      :refetch="refetch"
      :loading="loading"
  />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  init: Function,
  watchOn: [Object, Array, String],
  initOnHasValue: { type: Boolean, default: false },
})

const data = ref([]);

const loading = ref(true);

const refetch = async (params) => {
  data.value = await props.init(params);
  loading.value = false;
};

watch(
  () => props.watchOn,
  async () => {
    data.value = await props.init();
    loading.value = false;
  },
);

onMounted(async () => {
  data.value = await props.init();
  loading.value = false;
});
</script>

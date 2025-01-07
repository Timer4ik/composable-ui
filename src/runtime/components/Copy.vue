<script setup>

import { ref } from "vue";
import { copy } from "../utils/index";
import { useRequestURL } from "nuxt/app";

const props = defineProps({
  link: { type: String, default: null }
})

const wrapper = ref(null);
const copied = ref(false);
const handleClick = () => {
  try {
    copy(props?.link ?? useRequestURL()?.href);
    copied.value = true;
  } catch (error) {
    console.error(error);
  }
};

</script>
<template>
  <div
      v-click-outside="() => (copied = false)"
      ref="wrapper"
  >
    <slot
        :wrapper="{
          onClick: handleClick,
          onFocusout: () => (copied = false),
        }"
        :active="copied"
    />
  </div>
</template>

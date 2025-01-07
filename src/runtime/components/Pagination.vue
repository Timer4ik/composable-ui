<template>
  <slot
      :setPage="setPage"
      :nextPage="nextPage"
      :prevPage="prevPage"
      :paginator="paginator"
  />
</template>

<script setup>
import usePagination from "../composables/usePagination";

const props = defineProps({
  perView: {
    type: [Number],
    default: 15,
  },
});

const currentPage = defineModel({
  default: 1,
});

const pageCount = defineModel("pageCount", {
  type: [Number],
  default: 40,
});

const { nextPage, paginator, prevPage, setPage } = usePagination(
  {
    currentPage: currentPage,
    pageCount: pageCount,
    perView: props.perView,
  },
);

</script>

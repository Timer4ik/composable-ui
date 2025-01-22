<template>
  <h3>Одиночный календарь</h3>
  <Datepicker />
  <h3>Мулти календарь</h3>
  <DatepickerMultiple />
  <h3>Календарь с выбором дат, где есть мероприятия</h3>
  <DatepickerWithDate />
</template>

<script setup>
import Calendar from "../../src/runtime/components/Calendar.vue";
</script>

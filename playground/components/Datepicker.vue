<template>
  <!-- <div>312</div> -->
  <button @click="prev">Prev</button>
  {{ moment(selectedDate).format("D-M-Y") }}
  <button @click="next">Next</button>
  <div class="dates">
    <div
      class="date"
      v-for="(date, index) in currentCalendarDates"
      :key="index"
    >
      {{ date?.day }}
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import useDatePicker from "../composables/useDatePicker";

const { selectedDate, currentCalendarDates, next, prev } = useDatePicker({
  initialDate: Date.now(),
});
</script>

<style lang="css">
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: fit-content;
}

.date {
  text-align: center;
  width: 20px;
  height: 20px;
}
</style>

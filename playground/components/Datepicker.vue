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
      :true="date?.disabled"
    >
      {{ date?.day }}
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import useCalendar from "../composables/useCalendar";

const { selectedDate, currentCalendarDates, next, prev } = useCalendar({
  initialDate: Date.now(),
  // forEachDate: (item) => ({
  //   ...item,
  //   disabled: true,
  // }),
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

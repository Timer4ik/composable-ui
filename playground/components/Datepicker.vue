<template>
  <Calendar>
    <template #default="{ selectedDate, dates, next, prev }">
      <input class="" @click="toggleShow" :value="currentDate" readonly />
      <div class="calendar" v-if="isShow">
        <button @click="prev">Prev</button>
        {{ moment(selectedDate).format("MMM Y") }}
        <button @click="next">Next</button>
        <div class="dates">
          <div
            class="date"
            v-for="(date, index) in dates"
            :key="index"
            :date="date?.date"
            @click="updateDate(date?.date)"
          >
            {{ date?.day }}
          </div>
        </div>
      </div>
    </template>
  </Calendar>
</template>

<script setup>
import Calendar from "../../src/runtime/components/Calendar.vue";

import moment from "moment";
// import useCalendar from "../composables/useCalendar";
import useDatepicker from "~/composables/useDatepicker";

const { isShow, toggleShow } = useShow();
const { currentDate, setCurrentDate } = useDatepicker();

const updateDate = (date) => {
  setCurrentDate(moment(date).format("DD-MM-Y"));
};

// const { selectedDate, dates, next, prev } = useCalendar({
//   // initialDate: Date.now(),
//   // forEachDate: (item) => ({
//   //   ...item,
//   //   disabled: true,
//   // }),
// });
</script>

<style lang="css">
.calendar {
  background: white;
  position: absolute;
  margin-top: 8px;
}

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

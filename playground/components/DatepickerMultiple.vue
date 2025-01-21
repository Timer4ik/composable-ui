<template>
  <div>
    <input class="" @click="toggleShow" :value="value" readonly />
    <div class="calendar" v-if="isShow">
      <button @click="prev">Prev</button>
      {{ moment(selectedDate).format("MMM Y") }}
      <button @click="next">Next</button>
      <div class="dates">
        <div
          class="date"
          :class="{ range: date?.inRange }"
          v-for="(date, index) in dates"
          :key="index"
          @click="updateDate(date?.currentDate)"
        >
          {{ date?.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import useCalendar from "../composables/useCalendar";
import useDatepickerMulti from "~/composables/useDatepickerMulti";

const { isShow, toggleShow } = useShow();
const { startDate, endDate, currentDates, setCurrentDates } =
  useDatepickerMulti({
    defaultDates: [
      moment().add(-2, "days").format(),
      moment().add(1, "M").format(),
    ],
  });

const value = computed(() => {
  if (startDate.value) {
    if (endDate.value)
      return `${moment(startDate.value).format("DD.MM")} - ${moment(
        endDate.value
      ).format("DD.MM")}`;

    return `${moment(startDate.value).format("DD.MM")} - `;
  }

  return "";
});

const setInRange = (date) => {
  if (
    moment(date).diff(startDate.value, "days") >= 0 &&
    moment(date).diff(endDate.value, "days") <= 0
  )
    return true;

  return false;
};

const {
  selectedDate,
  dates,
  update: updateCalendar,
  next,
  prev,
} = useCalendar({
  initialDate: Date.now(),
  forEachDate: (item) => ({
    ...item,
    inRange: setInRange(item?.currentDate),
  }),
  deps: computed(() => startDate.value),
});

const updateDate = (date) => {
  setCurrentDates(date);
  updateCalendar(selectedDate.value);
};
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

.date.range {
  background-color: rgba(42, 146, 240, 0.5);
}
</style>

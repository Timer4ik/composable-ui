<template>
  <div>
    <input class="" @click="toggleShow" :value="currentDate" readonly />
    <div class="calendar" v-if="isShow">
      <button @click="prev">Prev</button>
      {{ moment(selectedDate).format("MMM Y") }}
      <button @click="next">Next</button>
      <div class="dates">
        <div
          class="date"
          :class="{ disabled: date?.disabled }"
          v-for="(date, index) in dates"
          :data-date="moment(date?.date).format('Y-MM-DD')"
          :key="index"
          @click="!date?.disabled && updateDate(date?.date)"
        >
          {{ date?.day }}
        </div>
      </div>
    </div>
    <div class="" v-for="event in showEvents">
      <strong class="">{{ event?.name }} {{ event?.date }}</strong>
      <div>{{ event?.description }}</div>
      <br />
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import debounce from "lodash/debounce";
import useCalendar from "../composables/useCalendar";
import useDatepicker from "~/composables/useDatepicker";

const { isShow, toggleShow } = useShow();
const { currentDate, setCurrentDate } = useDatepicker();

const updateDate = (date) => {
  setCurrentDate(moment(date).format("Y-MM-DD"));
};

const events = ref([
  {
    name: "Тапочек Аделя",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-02",
  },
  {
    name: "Адреналин",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-03",
  },
  {
    name: "Продажа Хлеба",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-03",
  },
  {
    name: "Метро ООО",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-07",
  },
  {
    name: "Тг чат",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-15",
  },
  {
    name: "Завтрашнее ООО",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-21",
  },
  {
    name: "Завтраки",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dicta totam fugiat veritatis maiores dolores sunt, dolorum, aliquam ea labore recusandae hic laboriosam, ad velit? Sapiente sint autem ex rerum?",
    date: "2025-01-21",
  },
]);

const setDisabledDate = (date, events) =>
  !events?.find((item) => item?.date === date);

const showEvents = ref([]);

watch(
  () => currentDate.value,
  debounce((cur) => {
    showEvents.value = events?.value?.filter(
      (item) => item?.date === moment(cur).format("Y-MM-DD")
    );
  }, 400)
);

const { selectedDate, dates, next, prev } = useCalendar({
  initialDate: Date.now(),
  forEachDate: (item) => ({
    ...item,
    disabled: setDisabledDate(
      moment(item?.date).format("Y-MM-DD"),
      events.value
    ),
  }),
});
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

.date.disabled {
  background-color: rgba(0, 0, 0, 0.5);
  cursor: no-drop;
}
</style>

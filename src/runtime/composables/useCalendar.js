import moment from "moment";
import { useState, useId, watch } from "#imports";

const setRemainingDays = (isFixedNumberDays, calendarDays) => {
  if (isFixedNumberDays) {
    const totalDaysInCalendar = 42;
    return totalDaysInCalendar - calendarDays.length;
  }

  const daysInWeek = 7;
  return daysInWeek - (calendarDays.length % daysInWeek || daysInWeek);
};

const setDisabledStartDay = (firstWeekdayIndex) => {
  if (firstWeekdayIndex === 0) return 6;

  return firstWeekdayIndex - 1;
};

const generateCalendar = ({ date, isFixedNumberDays = false }) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();

  const firstDayOfMonth = moment([year, month, 1]);

  const firstWeekdayIndex = firstDayOfMonth.day();
  const totalDaysInMonth = firstDayOfMonth.daysInMonth();

  const calendarDays = [];

  const previousMonthLastDay = firstDayOfMonth
    .subtract(1, "month")
    .daysInMonth();

  const disabledStartDay = setDisabledStartDay(firstWeekdayIndex);

  for (let i = disabledStartDay; i > 0; i--) {
    calendarDays.push({
      day: previousMonthLastDay - i + 1,
      date: new Date(year, month - 1, previousMonthLastDay - i + 1).valueOf(),
      disabled: true,
    });
  }

  // days in month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      date: new Date(year, month, i).valueOf(),
      disabled: false,
    });
  }

  // last days in month
  const remainingDays = setRemainingDays(isFixedNumberDays, calendarDays);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      date: new Date(year, month + 1, i).valueOf(),
      disabled: true,
    });
  }

  return calendarDays;
};

export default ({
  id = null,
  initialDate = Date.now(),
  isFixedNumberDays = false,
  forEachDate = (v) => v,
  onUpdate = () => {},
  deps = [],
}) => {
  const uid = id || useId();

  const initial = new Date(initialDate);
  // this not state date, it is show current date for datepicker
  const selectedPageDate = useState(uid + "-selected-date", () =>
    new Date(initial.getFullYear(), initial.getMonth(), 1).valueOf()
  );
  const dates = useState(uid + "-current-dates", () =>
    generateCalendar({
      date: selectedPageDate.value,
      isFixedNumberDays,
    })?.map(forEachDate)
  );

  const next = () =>
    (selectedPageDate.value = moment(selectedPageDate.value).add(1, "M"));
  const prev = () =>
    (selectedPageDate.value = moment(selectedPageDate.value).add(-1, "M"));

  const update = (values) => {
    dates.value = generateCalendar({
      date: selectedPageDate.value,
      isFixedNumberDays,
    })?.map(forEachDate);
    onUpdate?.(values);
  };

  watch(
    () => selectedPageDate.value,
    (cur) => {
      update(cur);
    }
  );

  watch(deps, () => {
    update(deps);
  });

  return { selectedPageDate, dates, next, prev, update };
};

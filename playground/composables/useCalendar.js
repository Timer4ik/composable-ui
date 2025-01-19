import moment from "moment";

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
  const year = moment(date).year();
  const month = moment(date).month();

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
      currentDate: new Date(
        moment([year, month, previousMonthLastDay - i + 1]).add(-1, "M")
      ),
      disabled: true,
    });
  }

  // days in month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      currentDate: new Date(moment([year, month, i])),
      disabled: false,
    });
  }

  // last days in month
  const remainingDays = setRemainingDays(isFixedNumberDays, calendarDays);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      currentDate: new Date(moment([year, month, i]).add(1, "M")),
      disabled: true,
    });
  }

  return calendarDays;
};

export default ({
  id = null,
  initialDate,
  isFixedNumberDays = false,
  forEachDate = (v) => v,
  onUpdate = () => {},
  deps = [],
}) => {
  const uid = id || useId();

  // this not state date, it is show current date for datepicker
  const selectedDate = useState(uid + "-selected-date", () =>
    moment(initialDate).format()
  );
  const dates = useState(uid + "-current-dates", () =>
    generateCalendar({
      date: selectedDate.value,
      isFixedNumberDays,
    })?.map(forEachDate)
  );

  const next = () =>
    (selectedDate.value = moment(selectedDate.value).add(1, "M"));
  const prev = () =>
    (selectedDate.value = moment(selectedDate.value).add(-1, "M"));

  const update = (values) => {
    dates.value = generateCalendar({
      date: selectedDate.value,
      isFixedNumberDays,
    })?.map(forEachDate);
    onUpdate?.(values);
  };

  watch(
    () => selectedDate.value,
    (cur) => {
      update(cur);
    }
  );

  watch(
    () => deps,
    (cur) => update(cur)
  );

  return { selectedDate, dates, next, prev, update };
};

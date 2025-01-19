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

const generateCalendar = ({
  date,
  isFixedNumberDays = false,
  format = null,
}) => {
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
      date: moment([year, month, previousMonthLastDay - i + 1])
        .add(-1, "M")
        .format(format),
      disabled: true,
    });
  }

  // days in month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      date: moment([year, month, i]).format(format),
      disabled: false,
    });
  }

  // last days in month
  const remainingDays = setRemainingDays(isFixedNumberDays, calendarDays);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      date: moment([year, month, i]).add(1, "M").format(format),
      disabled: true,
    });
  }

  return calendarDays;
};

export default ({
  id = null,
  initialDate,
  isFixedNumberDays = false,
  format = null,
  forEachDate = (v) => v,
  onUpdate = () => {},
  deps = [],
}) => {
  const uid = id || useId();

  // this not state date, it is show current date for datepicker
  const selectedDate = useState(uid + "-selected-date", () =>
    moment(initialDate).format()
  );
  const currentCalendarDates = useState(uid + "-current-dates", () =>
    generateCalendar({
      date: selectedDate.value,
      isFixedNumberDays,
      format,
    })?.map(forEachDate)
  );

  const next = () =>
    (selectedDate.value = moment(selectedDate.value).add(1, "M"));
  const prev = () =>
    (selectedDate.value = moment(selectedDate.value).add(-1, "M"));

  const updateCurrentCalendarDates = (values) => {
    currentCalendarDates.value = generateCalendar({
      date: selectedDate.value,
      isFixedNumberDays,
      format,
    })?.map(forEachDate);
    onUpdate?.(values);
  };

  watch(
    () => selectedDate.value,
    (cur) => {
      updateCurrentCalendarDates(cur);
    }
  );

  watch(
    () => deps,
    (cur) => updateCurrentCalendarDates(cur)
  );

  return { selectedDate, currentCalendarDates, next, prev };
};

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
      date: new Date(
        moment([year, month, previousMonthLastDay - i + 1]).add(-1, "M")
      ).valueOf(),
      disabled: true,
    });
  }

  // days in month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      date: new Date(moment([year, month, i])).valueOf(),
      disabled: false,
    });
  }

  // last days in month
  const remainingDays = setRemainingDays(isFixedNumberDays, calendarDays);
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      date: new Date(moment([year, month, i]).add(1, "M")).valueOf(),
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

  // this not state date, it is show current date for datepicker
  const calendarPageDate = useState(uid + "-selected-date", () =>
    new Date(initialDate).valueOf()
  );
  const dates = useState(uid + "-current-dates", () =>
    generateCalendar({
      date: calendarPageDate.value,
      isFixedNumberDays,
    })?.map(forEachDate)
  );

  const next = () =>
    (calendarPageDate.value = moment(calendarPageDate.value).add(1, "M"));
  const prev = () =>
    (calendarPageDate.value = moment(calendarPageDate.value).add(-1, "M"));

  const update = (values) => {
    dates.value = generateCalendar({
      date: calendarPageDate.value,
      isFixedNumberDays,
    })?.map(forEachDate);
    onUpdate?.(values);
  };

  watch(
    () => calendarPageDate.value,
    (cur) => {
      update(cur);
    }
  );

  watch(
    () => deps,
    () => {
      update(deps);
    }
  );

  return { calendarPageDate, dates, next, prev, update };
};

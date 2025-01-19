import moment from "moment";

// const nowDate = Date.now();

const generateCalendar = (date) => {
  const daysInWeek = 7;
  const totalDaysInCalendar = 42;

  const year = moment(date).format("Y");
  const month = moment(date).format("M") - 1;

  const firstDayOfMonth = moment([year, month, 1]);

  const startDayOfWeek = firstDayOfMonth.day();
  const totalDaysInMonth = firstDayOfMonth.daysInMonth();

  const calendarDays = [];

  const previousMonthLastDay = firstDayOfMonth
    .clone()
    .subtract(1, "month")
    .daysInMonth();
  const disabledStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  // first days
  for (let i = disabledStartDay; i > 0; i--) {
    calendarDays.push({
      day: previousMonthLastDay - i + 1,
      disabled: true,
    });
  }

  // days in month
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      disabled: false,
    });
  }

  // last days
  const remainingDays = totalDaysInCalendar - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      disabled: true,
    });
  }

  return calendarDays;
};

export default ({
  id = null,
  initialDate,
  forEachDate = (v) => v,
  onUpdate = () => {},
}) => {
  const uid = id || useId();

  // this not state date, it is show current date for datepicker
  const selectedDate = useState(uid + "-selected-date", () =>
    moment(initialDate).format()
  );
  const currentCalendarDates = useState(
    uid + "-current-dates",
    () =>
      forEachDate?.(generateCalendar(selectedDate.value)) ??
      generateCalendar(selectedDate.value)
  );

  const next = () =>
    (selectedDate.value = moment(selectedDate.value).add(1, "M"));
  const prev = () =>
    (selectedDate.value = moment(selectedDate.value).add(-1, "M"));

  watch(
    () => selectedDate.value,
    (cur) => {
      currentCalendarDates.value = generateCalendar(cur);
      onUpdate?.(cur);
    }
  );

  return { selectedDate, currentCalendarDates, next, prev };
};

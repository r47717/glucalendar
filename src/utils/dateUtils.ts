import dayjs, { Dayjs } from "dayjs";

// Monday is the first week day

export function monthForDate(date: Dayjs) {
  const firstDay = date.startOf("month");
  let firstDayNumber = firstDay.day(); // 1 to 7 (Mon to Sun)

  if (firstDayNumber === 0) {
    firstDayNumber = 7;
  }

  const lastDay = date.endOf("month");
  let lastDayNumber = lastDay.day(); // 1 to 7 (Mon to Sun)

  if (lastDayNumber === 0) {
    lastDayNumber = 7;
  }

  const firstDayToShow =
    firstDayNumber > 1
      ? firstDay.subtract(firstDayNumber - 1, "day")
      : firstDay;

  const lastDayToShow =
    lastDayNumber < 7 ? lastDay.add(7 - lastDayNumber, "day") : lastDay;

  return {
    firstDayToShow,
    lastDayToShow,
  };
}

export function todayMonth() {
  return monthForDate(dayjs());
}

export function prevMonthYear(month: number, year: number) {
  const provided = dayjs()
    .date(1)
    .month(month - 1)
    .year(year);

  return {
    month: provided.subtract(1, "month").month() + 1,
    year: provided.subtract(1, "month").year(),
  };
}

export function nextMonthYear(month: number, year: number) {
  const provided = dayjs()
    .date(1)
    .month(month - 1)
    .year(year);

  return {
    month: provided.add(1, "month").month() + 1,
    year: provided.add(1, "month").year(),
  };
}

export function generateMonthDays(month: number, year: number) {
  const { firstDayToShow, lastDayToShow } = monthForDate(
    dayjs()
      .date(1)
      .month(month - 1)
      .year(year)
  );

  let data = [];

  for (
    let date = firstDayToShow;
    date.isBefore(lastDayToShow) || date.isSame(lastDayToShow);
    date = date.add(1, "day")
  ) {
    data.push(date);
  }

  return data;
}

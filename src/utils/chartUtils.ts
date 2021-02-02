import dayjs, { Dayjs } from "dayjs";
import { DayMeasures } from "../store";

export function buildChartData(
  measures: DayMeasures[],
  monthDays: Dayjs[],
  month: number,
  year: number
) {
  const data: { name: number; value: number; norm: number }[] = [];

  measures.forEach(({ measures, date }) => {
    if (date.year() !== year || date.month() + 1 !== month) {
      return;
    }

    if (monthDays.some((monthDay) => monthDay.isSame(date))) {
      data.push({
        name: date.date(),
        value: Number(measures.split("\n")[0].trim()),
        norm: 5.5,
      });
    }
  });

  return data;
}

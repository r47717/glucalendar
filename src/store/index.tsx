import dayjs, { Dayjs } from "dayjs";
import { createEvent, createStore } from "effector";
import {
  clearData,
  generateMonthDays,
  nextMonthYear,
  prevMonthYear,
  restoreData,
  saveData,
} from "../utils";

// types

export type DayMeasures = {
  measures: string;
  date: Dayjs;
};

export type Store = {
  measures: DayMeasures[];
  month: number;
  year: number;
  monthDays: Dayjs[];
};

// events

export const editMeasure = createEvent<DayMeasures>();
export const removeAllMeasures = createEvent<void>();
export const prevMonth = createEvent<void>();
export const nextMonth = createEvent<void>();
export const currentMonth = createEvent<void>();

// store + reducers

const todaysMonth = dayjs().month() + 1;
const todaysYear = dayjs().year();
const initialValues: Store = {
  measures: restoreData() || [],
  month: todaysMonth,
  year: todaysYear,
  monthDays: generateMonthDays(todaysMonth, todaysYear),
};

console.log(initialValues);

const store = createStore(initialValues)
  .on(editMeasure, (state: Store, { measures, date }: DayMeasures) => {
    const found = state.measures.find((item) => item.date.isSame(date));
    let newState: Store;

    if (found) {
      newState = {
        ...state,
        measures: state.measures.map((item) =>
          item.date.isSame(date)
            ? {
                ...item,
                measures,
              }
            : item
        ),
      };
    } else {
      newState = {
        ...state,
        measures: [...state.measures, { date, measures }],
      };
    }

    saveData(newState); // TODO: side effect

    return newState;
  })
  .on(removeAllMeasures, (state: Store) => {
    clearData(); // TODO: side effect
    return { ...state, measures: [] };
  })
  .on(prevMonth, (state: Store) => {
    const { month, year } = prevMonthYear(state.month, state.year);

    return {
      ...state,
      month,
      year,
      monthDays: generateMonthDays(month, year),
    };
  })
  .on(nextMonth, (state: Store) => {
    const { month, year } = nextMonthYear(state.month, state.year);

    return {
      ...state,
      month,
      year,
      monthDays: generateMonthDays(month, year),
    };
  })
  .on(currentMonth, (state: Store) => {
    const month = todaysMonth;
    const year = todaysYear;

    return {
      ...state,
      month,
      year,
      monthDays: generateMonthDays(month, year),
    };
  });

// logger

store.watch(console.log);

export default store;

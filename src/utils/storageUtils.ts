import dayjs from "dayjs";
import { Store } from "../store";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const STORAGE_KEY = "glucalendar-data";
const DATE_FORMAT = "DD-MM-YYYY";

type StoredData = {
  date: string;
  measures: string;
}[];

export function saveData(state: Store) {
  if (state.measures.length === 0) {
    return;
  }
  const dataToSave = state.measures.map(({ date, measures }) => ({
    date: date.format(DATE_FORMAT),
    measures,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}

export function restoreData() {
  const dataToRestore = localStorage.getItem(STORAGE_KEY);
  if (dataToRestore === null) {
    return [];
  }
  try {
    const json = JSON.parse(dataToRestore) as StoredData;

    const hydratedData = json.map(({ date, measures }) => ({
      date: dayjs(date, DATE_FORMAT),
      measures,
    }));

    return hydratedData;
  } catch (e) {
    // JSON parse errors
    console.log(`Incorrect data retrieved from local storage`, dataToRestore);
    return [];
  }
}

export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}

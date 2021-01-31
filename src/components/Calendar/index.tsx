import React from "react";
import Day from "../Day";
import cn from "classnames";
import styles from "./styles.module.scss";
import store, {
  DayMeasures,
  nextMonth,
  prevMonth,
  currentMonth,
  removeAllMeasures,
  editMeasure,
} from "../../store";
import { useStore } from "effector-react";
import dayjs, { Dayjs } from "dayjs";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

type CalenderProps = {
  month: number;
  year: number;
};

function Calendar({ month, year }: CalenderProps) {
  const { measures, monthDays } = useStore(store);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          {`Glucalendar - ${dayjs()
            .date(1)
            .month(month - 1)
            .year(year)
            .format("MMMM YYYY")}`}
          <div
            className={cn(styles.titleControls, styles.titlePrev)}
            onClick={() => prevMonth()}
          >
            &larr;
          </div>
          <div
            className={cn(styles.titleControls, styles.titleNext)}
            onClick={() => nextMonth()}
          >
            &rarr;
          </div>
        </div>
        <ContextMenuTrigger id="context-menu">
          <div className={styles.cells}>
            {monthDays.map((date: Dayjs, k) => {
              return (
                <Day
                  key={k}
                  previous={date.year() < year || date.month() + 1 < month}
                  next={date.year() > year || date.month() + 1 > month}
                  day={date.date()}
                  measures={
                    measures.find((item: DayMeasures) => item.date.isSame(date))
                      ?.measures || ""
                  }
                  updateMeasure={(measures: string) =>
                    editMeasure({ date, measures })
                  }
                />
              );
            })}
          </div>
        </ContextMenuTrigger>
      </div>
      <ContextMenu
        hideOnLeave={true}
        id="context-menu"
        className={styles.menuItems}
      >
        <MenuItem data={{ foo: "bar" }} onClick={() => prevMonth()}>
          Previous month
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={() => nextMonth()}>
          Next month
        </MenuItem>
        <MenuItem data={{ foo: "bar" }} onClick={() => currentMonth()}>
          Current month
        </MenuItem>
        <MenuItem className={styles.contextMenuDevider} divider />
        <MenuItem data={{ foo: "bar" }} onClick={() => removeAllMeasures()}>
          Clear all data
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default Calendar;

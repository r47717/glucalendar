import React from "react";
import Day from "../Day";
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
import leftArrow from "./left-arrow.svg";
import rightArrow from "./right-arrow.svg";
import bunnerImage from "./bunner-image.png";

type CalenderProps = {
  month: number;
  year: number;
};

function Calendar({ month, year }: CalenderProps) {
  const { measures, monthDays } = useStore(store);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h2>Welcome to your Glucose Calendar</h2>
          <h3>Record your data daily and control your glucose level</h3>
          <img src={bunnerImage} alt="bunner" className={styles.leftImage} />
          <img src={bunnerImage} alt="bunner" className={styles.rightImage} />
        </div>
        <div className={styles.title}>
          <div className={styles.leftGroup}>
            <h2 className={styles.selectedMonth}>
              {dayjs()
                .date(1)
                .month(month - 1)
                .year(year)
                .format("MMMM YYYY")}
            </h2>
            <img
              className={styles.leftArrow}
              src={leftArrow}
              alt="left arrow"
              onClick={() => prevMonth()}
            />
            <img
              className={styles.rightArrow}
              src={rightArrow}
              alt="right arrow"
              onClick={() => nextMonth()}
            />
            <div className={styles.todayDate}>
              Today {dayjs().format("MMMM d, YYYY")}
            </div>
          </div>
        </div>
        <ContextMenuTrigger id="context-menu">
          <div className={styles.cells}>
            <div className={styles.headerMonth}>MON</div>
            <div className={styles.headerMonth}>TUE</div>
            <div className={styles.headerMonth}>WED</div>
            <div className={styles.headerMonth}>THU</div>
            <div className={styles.headerMonth}>FRI</div>
            <div className={styles.headerMonth}>SAT</div>
            <div className={styles.headerMonth}>SUN</div>
            <div className={styles.delimiter}></div>
            {monthDays.map((date: Dayjs, k) => {
              return (
                <Day
                  key={k}
                  previous={date.year() < year || date.month() + 1 < month}
                  next={date.year() > year || date.month() + 1 > month}
                  day={date.date()}
                  measures={
                    measures.find((item: DayMeasures) =>
                      item.date.isSame(date, "day")
                    )?.measures || ""
                  }
                  today={date.isSame(dayjs(), "day")}
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

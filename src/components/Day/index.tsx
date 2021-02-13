import React, { useState } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import Editor from "../Editor";
import { MEASURE_EXCEED } from "../../utils";

type DayProps = {
  day: number;
  previous: boolean;
  next: boolean;
  measures: string;
  updateMeasure: (update: string) => void;
  today: boolean;
};

function Day({
  day,
  previous,
  next,
  measures,
  updateMeasure,
  today = false,
}: DayProps) {
  const [editor, setEditor] = useState<null | { day: number; content: string }>(
    null
  );

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.previous]: previous || next,
        [styles.today]: today,
      })}
    >
      <div className={styles.number}>{day}</div>

      <div
        className={styles.measures}
        title="Dbl click to edit"
        onDoubleClick={() => {
          setEditor({
            day,
            content: measures,
          });
        }}
      >
        {measures.split("\n").map((measure: string, i: number) => (
          <div
            key={i}
            className={cn({
              [styles.measure]: true,
              [styles.measureExceed]: Number(measure) > MEASURE_EXCEED,
            })}
          >
            {measure}
          </div>
        ))}
        {editor && (
          <Editor
            content={editor.content}
            onBlur={(value) => {
              updateMeasure(value);
              setEditor(null);
            }}
          />
        )}
      </div>
      {today && measures.length === 0 && (
        <div className={styles.todayNotice}>Fill me in!</div>
      )}
    </div>
  );
}

export default Day;

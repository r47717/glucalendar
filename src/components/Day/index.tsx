import React, { useState } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import Editor from "../Editor";

type DayProps = {
  day: number;
  previous: boolean;
  next: boolean;
  measures: string;
  updateMeasure: (update: string) => void;
};

const MEASURE_EXCEED = 5.5;

function Day({ day, previous, next, measures, updateMeasure }: DayProps) {
  const [editor, setEditor] = useState<null | { day: number; content: string }>(
    null
  );

  return (
    <div className={styles.container}>
      <div
        className={cn({
          [styles.number]: true,
          [styles.previous]: previous || next,
        })}
      >
        {day}
      </div>

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
    </div>
  );
}

export default Day;

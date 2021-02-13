import React, { useMemo } from "react";
import { useStore } from "effector-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import store from "../../store";
import { buildChartData, MEASURE_EXCEED } from "../../utils";
import styles from "./styles.module.scss";

type Props = {
  month: number;
  year: number;
};

function Chart({ month, year }: Props) {
  const { measures, monthDays } = useStore(store);
  const chartData = useMemo(
    () => buildChartData(measures, monthDays, month, year),
    [measures, monthDays, month, year]
  );

  return (
    <div className={styles.chartContainer}>
      {chartData.length > 0 && (
        <BarChart
          className={styles.chartWrapper}
          width={750}
          height={300}
          data={chartData}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="value" name="Value" fill="red">
            {chartData.map(({ value }, index) => (
              <Cell
                key={`cell-${index}`}
                fill={value > MEASURE_EXCEED ? "#FFAEA8" : "#ABED8C"}
              />
            ))}
          </Bar>
          <Bar dataKey="norm" name="Normal" fill="#FFF4BF" />
        </BarChart>
      )}
    </div>
  );
}

export default Chart;

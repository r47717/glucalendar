import { useStore } from "effector-react";
import React from "react";
import store from "../../store";
import Calendar from "../Calendar";

function App() {
  const { month, year } = useStore(store);

  return (
    <main>
      <Calendar month={month} year={year} />
    </main>
  );
}

export default App;

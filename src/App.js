import { useState } from "react";
import Header from "./components/header/Header";
import Garage from "./components/garage/Garage";
import Winners from "./components/winners/Winners";
import Car from "./components/car/Car";

function App() {
  const [tab, setTab] = useState("garage");

  return (
    <>
      <Header active={tab} onChange={(current) => setTab(current)} />
      {tab === "garage" && (
        <>
          <Garage />
          <Car />
        </>
      )}

      {tab === "winners" && (
        <>
          <Winners />
        </>
      )}
    </>
  );
}

export default App;

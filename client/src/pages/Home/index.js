import React from "react";
import "./styles.css";
import ButtonCategory from "../../components/Buttons/ButtonCategory"
import { NonprofitList, NonprofitListItem } from "../../components/NonprofitList/index"

function App() {
  return (
    <div className="App">
      <ButtonCategory />
      <NonprofitList />
      <NonprofitListItem />
    </div>
  );
}

export default App;
import React,{ useState } from "react";
import "./styles.css";
import ButtonCategory from "../../components/Buttons/ButtonCategory"
import { NonprofitList, NonprofitListItem } from "../../components/NonprofitList/index"

function App() {
  const [nonprofits, setNonProfits] = useState([]);
  return (
    <div className="App">
      <ButtonCategory setnonprofits={setNonProfits}/>
      <NonprofitList nonprofits={nonprofits}/>
      <NonprofitListItem />
    </div>
  );
}

export default App;
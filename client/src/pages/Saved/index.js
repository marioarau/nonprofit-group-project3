import React from "react";
import SavedPage from "./savedPage";
import "./SavedPage.css";
import UserContext from "../../userContext"

function SavedFav(props) {

  const myUser = React.useContext(UserContext);
  if(myUser.id === undefined){
    props.history.push('/login')
  }

  return (
    <div className="App">
      <SavedPage />
    </div>
  );
}

export default SavedFav;

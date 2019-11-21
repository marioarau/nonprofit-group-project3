import React from "react";
import "./styles.css";
import ValidatedLoginForm from "./ValidatedLoginForm";
import UserContext from "../../userContext";

function App() {
  const myUser = React.useContext(UserContext);
  console.log("myUser:", myUser);
  return (
    <div className="App">
      <h1>Login</h1>

      <ValidatedLoginForm />
    </div>
  );
}

export default App;
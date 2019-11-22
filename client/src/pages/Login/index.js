import React from "react";
import "./styles.css";
import ValidatedLoginForm from "./ValidatedLoginForm";
import userContext from "../../userContext";
function Login(props) {
  // function ClearData(){
  //   props.updateValue({  name: "aravindan", age: '21' });
  // }
  return (
    <div>
      {/* <button onClick={ClearData}>Set user</button> */}
      <div className="App">
        <h1>Login</h1>
        <ValidatedLoginForm {...props} />
      </div>
    </div>
  );
}
export default Login;
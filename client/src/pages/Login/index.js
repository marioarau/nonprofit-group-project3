import React from "react";
import "./styles.css";
import ValidatedLoginForm from "./ValidatedLoginForm";

function Login(props) {

  return (
    <div>
      <div className="App">
        <h1>Login</h1>
        <ValidatedLoginForm {...props} />
      </div>
    </div>
  );
}
export default Login;
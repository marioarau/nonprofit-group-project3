import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
  import UserContext from "../../userContext";
function Nav(props) {
    const myUser = React.useContext(UserContext);
  console.log("myUser nav:", myUser);
  if(myUser.id == undefined){
      console.log('not logged in')
    //   props.history.push('/login')
  }
    return (
        (myUser.id != undefined) ? 
        <ul className="nav justify-content-end">
            <li className="nav-item">
                {/* <a className="nav-link active" href="/home">Home</a> */}
                <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/categories">Categories</NavLink>
                {/* <a className="nav-link" to="/categories">Categories</a> */}
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/saved">Saved</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/donate">Donate</NavLink>
                {/* <a className="nav-link" href="/donate">Donate</a> */}
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" onClick={() => {props.updateValue({});} } to="/login">Logout</NavLink>
                {/* <a className="nav-link" href="/donate">Donate</a> */}
            </li>
        </ul>
        : null
    )
}

export default Nav;
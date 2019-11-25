import React from "react";
import Logo from "../../assets/images/logo.png"
import {
    NavLink
} from "react-router-dom";
import "./Nav.css";
import UserContext from "../../userContext";

function Nav(props) {
    const myUser = React.useContext(UserContext);

    if (myUser.id === undefined) {
        //console.log('not logged in')
        //   props.history.push('/login')
    }
    return (
        (myUser.id !== undefined) ?
            <ul className="nav navbar navbar-expand-lg">
                <img src={Logo} className="logo" height="70" width="75" alt="website logo" />
                <li className="nav-item">
                    {/* <a className="nav-link active" href="/home">Home</a> */}
                    <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link" to="/saved">Saved</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link" to="/donate">Donate</NavLink>
                    {/* <a className="nav-link" href="/donate">Donate</a> */}
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" className="nav-link" onClick={() => { props.updateValue({}); }} to="/login">Logout</NavLink>
                    {/* <a className="nav-link" href="/donate">Donate</a> */}
                </li>
            </ul>
            : null
    )
}

export default Nav;
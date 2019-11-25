import React from "react";
import Logo from "../../assets/images/logo.png";

function Jumbotron() {

    return (
        <div>
            <ul className="nav navbar navbar-expand-lg">
                <img src={Logo} className="logo" height="70" width="75" alt="website logo" />
                <li className="nav-item">
                    {/* <a className="nav-link active" href="/home">Home</a> */}
                    <a activeClassName="active" className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a activeClassName="active" className="nav-link" href="/register">Register</a>
                </li>
            </ul>
            <div className="jumbotron landing">
                <h2 className="display-4">The Non-Profit Hub</h2>

                <p className="lead"> At The Non-Profit Hub, we provide 
                our users with the ability to search from over one thousand 
                non-profit organizations based on their interest and allow them the 
                ability to manage multiple contributions in one single place.
                </p>



            </div>
        </div>
    );
}

export default Jumbotron;
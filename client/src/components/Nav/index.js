import React from "react";

function Nav() {
    return (
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <a className="nav-link active" href="/home">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/categories">Categories</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/saved">Saved</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/donate">Donate</a>
            </li>
        </ul>
    )
}

export default Nav;
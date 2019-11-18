import React from "react";

function Jumbotron() {

    return (
        <div className="jumbotron">
            <h2 className="display-4">The Non-Profit Hub</h2>

            <p className="lead"> At The Non-Profit Hub, our goal is to connect
                people with organizations that provide meaningful
                change in the world. We do this by creating a space in which
                you can search for organizations of your
                interest and create long time relationships
                through monetary contributions.
          </p>

          <hr className="my-4"></hr>

          <p>Please login or register if you do not have an account.</p>

          <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a>

          <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>

        </div>
    );
}

export default Jumbotron;
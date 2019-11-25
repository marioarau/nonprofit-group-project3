import React from "react";
import "./DonatePage.css";
import BillingForm from "../../components/BillingForm"

function Donate() {

    return (

        <div className="container-donate">

            <h1 className="header">Donate Today and Transform the Lives of People</h1>

            <div className="card text-center">
                <div className="card-body">
                    <h4 className="card-title">Choose Your Donation Type</h4>
                    <a href="#" className="btn btn-primary">One Time</a>
                    <a href="#" className="btn btn-primary">Monthly</a>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Choose Your Donation Amount</h4>
                    <a href="#" className="btn btn-success">$25</a>
                    <a href="#" className="btn btn-success">$50</a>
                    <a href="#" className="btn btn-success">$75</a>
                    <a href="#" className="btn btn-success">$100</a>
                </div>
                <div class="input-group">
                    <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)"></input>
                        <div class="input-group-append">
                            <span class="input-group-text">$</span>
                            <span class="input-group-text">0.00</span>
                        </div>
                </div>
                <div>
                <BillingForm />
                </div>

            </div>
        </div>

    )
        
}
        
export default Donate;
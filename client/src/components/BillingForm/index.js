import React from "react";
import "./BillingForm.css"

class Billing extends React.Component {

    render() {
        return (
            <div>
                <h4 className="header">Credit Card Information</h4>
                <form className="container">
                    <div className="form-row">
                        <div className="col">
                            <input type="text" class="form-control" id="name" placeholder="Name on Credit Card"></input>
                        </div>
                        <div className="col">
                            <input type="text" class="form-control" id="cc" placeholder="Credit Card Number"></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <input type="email" class="form-control" id="date" placeholder="Expiration Date (00/0000)"></input>
                        </div>
                        <div className="col">
                            <input type="email" class="form-control" id="cvc" placeholder="CVC"></input>
                        </div>
                    </div>

                     <button type="submit" id="donate" className="btn btn-lg btn-info">Donate</button>
                 
                </form>
            </div>

        )
    }
                                        
}
                                        
export default Billing;
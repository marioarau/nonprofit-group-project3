import React from "react";
import axios from "axios";
import "./SavedPage.css";
import UserContext from "../../userContext";
import { NonprofitList } from "../../components/NonprofitList"

class Saved extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = { nonprofits: [], isLoading: true }
    }


    componentDidMount() {
        const myUser = this.context
        this.getSavedNonprofits(myUser.id);
    }

    getSavedNonprofits = (UserId) => {
        console.log("UserId: ", UserId);
        axios.get('/api/get-user-favorites/userid/' + UserId)

            .then(res => {

                let resData = res.data
                this.setState(prevState => ({
                    nonprofits: resData    // like push but without mutation
                }));
                //this.setState({ nonprofits: res.data })
            }).catch(err => console.log(err));
    };

    handleDelete = id => {
        axios.delete('/api/delete-favorite/favoriteId/:favoriteId' + id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <li className="list list-group-item m-2">

                <div className="jumbotron">
                    <h3 className="display-5">Your Saved Non-Profits</h3>
                </div>

                <NonprofitList showAction={true} nonprofits={this.state.nonprofits} />


                {/* Need to get saved non-profit list down here */}
            </li>

        )
    }

}

export default Saved;


import React from "react";
import axios from "axios"

class Saved extends React.Component {

    state = {
        nonprofits: []
    };

    componentDidMount() {
        this.getSavedNonprofits();
    }

    getSavedNonprofits = () => {
        axios.get('/api/get-user-favorites/userid/:userid')
            .then(res =>
                this.setState({
                    nonprofits: res.data
                })
            )
            .catch(err => console.log(err));
    };

    handleDelete = id => {
        axios.delete('/api/delete-favorite/favoriteId/:favoriteId' + id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {

        return (
            <li className="list-group-item m-2">

                <div className="jumbotron">
                    <h3 className="display-4">Your Saved Non-Profits</h3>
                </div>


                <div className="float-right">

                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete()}>Delete
                    </button>

                    <button id="donate" className="btn btn-primary ml-2 mr-2"
                        href="/donate" target="_blank" rel="noopener noreferrer">Donate
                    </button>

                </div>

                {/* Need to get saved non-profit list down here */}
            </li>

        )
    }

}

export default Saved;


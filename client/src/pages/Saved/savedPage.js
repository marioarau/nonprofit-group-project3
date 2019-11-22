import React from "react";
import axios from "axios"
import userContext from "../../userContext";
import { NonprofitListItem, NonprofitList } from "../../components/NonprofitList";

class Saved extends React.Component {

    constructor(props)
    {  
        //let value = this.userContext;
        //console.log(value);
        super(props);  
        
        this.state = { nonprofits : [] , isLoading: true} 
    }  


    componentDidMount() {
        this.getSavedNonprofits();
    }

     getSavedNonprofits = () => {

        axios.get('/api/get-user-favorites/userid/2')
       
        .then(res => {
            console.log('save res',res)
            let resData = res.data
            this.setState(prevState => ({
                nonprofits : resData    // like push but without mutation
            }));
            console.log(res.data);
            //this.setState({ nonprofits: res.data })
        }).catch(err => console.log(err));
          
            console.log(this.state);
    };

    handleDelete = id => {
        axios.delete('/api/delete-favorite/favoriteId/:favoriteId' + id)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        console.log('render log',this.state.nonprofits)
        return (
            <li className="list-group-item m-2">

                <div className="jumbotron">
                    <h3 className="display-4">Your Saved Non-Profits</h3>
                </div>

                <NonprofitList showAction={true} nonprofits={this.state.nonprofits}/>
                 

                {/* Need to get saved non-profit list down here */}
            </li>

        )
    }

}

export default Saved;


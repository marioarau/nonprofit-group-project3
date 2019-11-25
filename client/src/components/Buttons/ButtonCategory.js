import React from "react";
import UserContext from "../../userContext";

class Buttons extends React.Component {
    static contextType = UserContext
    state = {
        nonprofits: [],
        categories: []
    }
    componentDidMount() {
        fetch('/api/get-categories')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    categories: data
                })
            })
            .catch(err => console.error(err))


    }

    handleClick = (event) => {
        const myUser = this.context
        const name = event.target.value;

        fetch(`/api/get-np-by-category/category/${name}/`+ myUser.id)
            .then(res => res.json())
            .then((data) => {
                this.props.setnonprofits(data);
            })
            .catch(err => console.error(err))
    }

    render() {

        return (

            <div className="jumbotron">
                <h3 className="display-5">Please choose a category of interest</h3>
                { this.state.categories.map(item => {
                    return <button key={item.name} value={item.name} name={item.name} onClick={this.handleClick}>{item.name}</button>
                })

                }               
            </div>
        )
    }
}

export default Buttons;
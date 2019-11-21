import React from "react";

class Buttons extends React.Component {

    state = {
        nonprofits: [],
        categories: []
    }
    componentDidMount() {
        fetch('/api/get-categories')

        //.then(res => res.text())          // convert to plain text
        //.then(text => console.log(text))  // then log it out

             .then(res => res.json())
             .then((data) => {
                 this.setState({
                     categories: data
                 })

                 console.log("categories data: ", data);
             })
             .catch(err => console.error(err))


    }

    handleClick = (event) => {
        console.log(event.target.value);
        const name = event.target.value;
        console.log("handleClick: ", name);
        fetch(`/api/get-np-by-category/category/${name}`)
        .then(res => res.json())
            .then((data) => {
                this.props.setnonprofits(data);
                console.log("data: ", data);
            })
            .catch(err => console.error(err))
    }

    render() {

        return (

            <div className="jumbotron">
                <h3 className="display-4">Please choose a category of interest</h3>
                { this.state.categories.map(item => {
                    return <button key={item.name} value={item.name} name={item.name} onClick={this.handleClick}>{item.name}</button>
                })

                }               
            </div>
        )
    }
}

export default Buttons;
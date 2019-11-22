import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import userContext from "./userContext";

function App() {
  const [userDetails, setUserDetails] = React.useState({});

  // React.useEffect(() =>  {
  //   axios.get("/api/login", {
  //     withCredentials: true
  //   })
  //   .then((res) => {
  //     console.log("app.js data: ", res.data.id);

  //     if (res.data.id) {
  //       setUser(true);
  //       //setUserDetails(res.data.id);
  //       setUserDetails({...userDetails , UserId:res.data.id})
  //       this.props.router.push('/home')
  //     }
  //     else {
  //       //this.props.router.push('/login')
  //     }
  //     //this.props.router.push('/home')
  //     //props.history.push('/home')
  //   }).catch(error => {
  //     //console.log("error.response: ", error.response)
  //     //console.log(error.response.data)
  //     if (error && error.response && error.response.data === "Unauthorized") {
  //       console.log("Username or Password Incorrect!");
  //       //alert("Login Error: Username or Password incorrect!")
  //     }
  //   });
  // }, [setUser]);
  function setUserDetailsfn(data){
    setUserDetails(data)
  }
  return (
    <Router>
      <div>
        {/* <button onClick={setUserDetailsfn}>Set user</button> */}
        <userContext.Provider value={userDetails}>
        <Nav updateValue={setUserDetailsfn}/>
        <Switch>
          {/* {user ? ( */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/saved" component={Saved} />
          {/* ) :  */}
           {/* null} */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={() => <Login updateValue={setUserDetailsfn} /> } />
        </Switch>
        </userContext.Provider>
      </div>
    </Router>

  )
}

export default App;
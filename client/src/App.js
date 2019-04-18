import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ResourceList from "./components/ResourceList";
import Resource from "./components/Resource";
import NavBar from "./components/NavBar"
import CreateAccount from "./components/CreateAccount"
import ShowUsers from './components/ShowUsers'
import MapComponent from './components/MapComponent'
import "./App.css";
import AddComment from "./components/AddComment";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar></NavBar>
                    <Switch>
                      <Route exact path="/" component={ResourceList}/>
                      <Route exact path="/map" component={MapComponent}/>
                      <Route exact path="/createAccount" component={CreateAccount}/>
                      <Route path="/resources/:id" component={Resource}/>
                      <Route path="/users" component={ShowUsers}/>
                      <Route path="/addComment" component={AddComment}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

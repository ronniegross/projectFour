import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ResourceList from "./components/ResourceList";
import Resource from "./components/Resource";
import NavBar from "./components/NavBar"
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Atlanta Shelter Resource</h1>
                    </div>
                    <NavBar></NavBar>
                    <Switch>
                      <Route exact path="/" component={ResourceList}/>
                      <Route path="/resources/:id" component={Resource}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

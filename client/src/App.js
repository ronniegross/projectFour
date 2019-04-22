import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ResourceList from "./components/ResourceList";
import Resource from "./components/Resource";
import NavBar from "./components/NavBar"
import CreateAccount from "./components/CreateAccount"
import Users from './components/Users'
import MapComponent from './components/MapComponent'
import SingleUser from './components/SingleUser'
import "./App.css";
import SingleComment from './components/SingleComment'
import NumberIndex from './components/NumberIndex'
import Mission from './components/Mission'
import Links from './components/Links'
// import Comment from "./components/Comment";

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
                      {/* <Route path="/users" component={ShowUsers}/> */}
                      <Route path="/useraccounts" component={Users}/>
                      <Route path="/user/:userId" component={SingleUser}/>
                      <Route path="/comment/:commentId" component={SingleComment}/>
                      <Route path="/numberindex" component={NumberIndex}/>
                      <Route path="/mission" component={Mission}/>
                      <Route path="/links" component={Links}/>
                      {/* <Route path="/addComment" component={Comment}/> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

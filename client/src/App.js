import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
import LoginNav from './components/LoginNav';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm'
// import Comment from "./components/Comment";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({ username: json.username });
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.user.username
                });
            });
    };

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <SignUpForm handle_signup={this.handle_signup} />;
                break;
            default:
                form = null;
        }
        return (
            <Router>
                <div className="App">
                    <LoginNav
                        logged_in={this.state.logged_in}
                        display_form={this.display_form}
                        handle_logout={this.handle_logout}
                    />
                    {form}
                    <h3>
                        {this.state.logged_in
                            ? `Hello, ${this.state.username}`
                            : 'Please Log In'}
                    </h3>
                    <NavBar></NavBar>
                    <Switch>
                        <Route exact path="/" component={ResourceList} />
                        <Route exact path="/map" component={MapComponent} />
                        <Route exact path="/createAccount" component={CreateAccount} />
                        <Route path="/resources/:id" component={Resource} />
                        {/* <Route path="/users" component={ShowUsers}/> */}
                        <Route path="/useraccounts" component={Users} />
                        <Route path="/user/:userId" component={SingleUser} />
                        <Route path="/comment/:commentId" component={SingleComment} />
                        <Route path="/numberindex" component={NumberIndex} />
                        {/* <Route path="/addComment" component={Comment}/> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

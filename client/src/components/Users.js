import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleUser from './SingleUser'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    button {
        background-color: white;
    }
    h2 {
        color: tomato;
    }
    a {
        text-decoration: none;
        color: #052C49;
    }
    a:hover {
        color: tomato;
    }
    .btn {
        width: 200px;
        height: 40px;
        border: 2px solid #53B1F8;
        background-color: none;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: tomato;
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }
    .btn:hover {
        box-shadow: 3px 3px tomato;
    }
    .create-user-form {
        border: 2px solid #53B1F8;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        /* width: 400px; */
        margin: 50px;
        padding: 20px;
        label {
            /* color: #282828; */
            color: #052C49;
            font-family: Arial, Helvetica, sans-serif;
        }
        input {
            /* color: #282828; */
            color: tomato;
            font-family: Arial, Helvetica, sans-serif;
            height: 20px;
            /* border-radius: 5px; */
            border: none;
            border-bottom: 2px solid #53B1F8;
        }
        input[type="text"] {
            font-size:16px;
        }
        h3 {
            margin: 0;
            color: tomato;
        }
        button {
            width: 200px;
            height: 40px;
            border: 2px solid #53B1F8;
            background-color: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            color: tomato;
            border-radius: 5px;
            cursor: pointer;
            
        }
        button:hover {
        box-shadow: 3px 3px tomato;
    }
    }
    .resource-component {
        margin: 10px;
    }
    .userList {
        margin-bottom: 10px;
        font-size: 18px;
    }
    .create-user-form label {
        /* color: tomato; */
        color: #052C49;
    }
    .create-user-form input {
        /* color: #052C49; */
        color: tomato;
    }
    @media (max-width: 800px) {
        .create-user-form {
            width: 170px;
        }
        .create-user-form button {
            max-width: 150px;
        }
    }
`

class Users extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            age: '',
            gender: ''
        },
        createdUser: {},
        redirectToHome: false,
        users: [],
        isUserFormDisplayed: false
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users/');
            this.setState({ users: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
    }

    deleteUser = async (event) => {
        try {
            event.preventDefault()
            this.state.users.map(user => (
                // axios.delete(`/api/users/${user.id}/`)
                console.log(user.id, user.name)
                // console.log(user.key)
            ))
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    createUser = () => {
        axios.post('/api/users/', this.state.createdUser)
        // .then(res => {
        // this.setState({ redirectToHome: true, createdUser: res.data })
        // })
    }

    handleSignUp = (event) => {
        event.preventDefault()
        this.createUser()
    }

    handleChange = (event) => {
        const clonedCreatedUser = { ...this.state.createdUser }
        clonedCreatedUser[event.target.name] = event.target.value
        this.setState({ createdUser: clonedCreatedUser })
    }


    toggleUserForm = () => {
        this.setState((state, props) => {
            return ({ isUserFormDisplayed: !state.isUserFormDisplayed })
        })
    }

    render() {
        // console.log(this.state.users.id)
        // if (this.state.error) {
        //     return <div>{this.state.error}</div>
        // }
        // if (this.state.redirectToHome === true && this.state.createdUser.id !== null) {
        //     return (<Redirect to={'/'} />)
        // }
        return (
            <div>
                <Wrapper>
                    <h2>All Users</h2>
                    {this.state.users.map(user => (
                        <div key={user.id}>
                            {/* <Link to={`/users/${user.id}`} >{user.name}: {user.id}</Link> */}
                            <div className="userList"><Link to={`/user/${user.id}`} >{user.name}</Link></div>
                            {/* <h2>{user.name}</h2> */}
                            {/* <button onClick={this.deleteUser}>delete user</button> */}
                        </div>
                    ))}
                    <button onClick={this.toggleUserForm} className="btn">Create User</button>
                    {
                        this.state.isUserFormDisplayed ?
                            <div>
                                <form className="create-user-form" onSubmit={this.handleSignUp}>
                                    <div className="resource-component">
                                        <h3>Create User</h3>
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="name">Full Name: </label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            onChange={this.handleChange}
                                            value={this.state.createdUser.name}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="email">Email: </label>
                                        <input
                                            id="email"
                                            type="text"
                                            name="email"
                                            onChange={this.handleChange}
                                            value={this.state.createdUser.email}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="password">Password: </label>
                                        <input
                                            id="password"
                                            type="text"
                                            name="password"
                                            onChange={this.handleChange}
                                            value={this.state.createdUser.password}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="age">Age: </label>
                                        <input
                                            id="age"
                                            type="text"
                                            name="age"
                                            onChange={this.handleChange}
                                            value={this.state.createdUser.age}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="gender">Gender: </label>
                                        <input
                                            id="gender"
                                            type="text"
                                            name="gender"
                                            onChange={this.handleChange}
                                            value={this.state.createdUser.gender}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <button type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                            : null
                    }
                </Wrapper>
            </div>
        );
    }
}

export default Users;
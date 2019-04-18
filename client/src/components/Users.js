import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleUser from './SingleUser'
import { Redirect } from 'react-router-dom'

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
        users: []
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
                <h1>All Users</h1>
                {this.state.users.map(user => (

                    <div key={user.id}>
                        {/* <Link to={`/users/${user.id}`} >{user.name}: {user.id}</Link> */}
                        <Link to={`/user/${user.id}`} >{user.name}: {user.id}</Link>
                        {/* <h2>{user.name}</h2> */}
                        {/* <button onClick={this.deleteUser}>delete user</button> */}
                    </div>
                ))}
                <h2>Create User</h2>
                <form onSubmit={this.handleSignUp}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.createdUser.name}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.createdUser.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="text"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.createdUser.password}
                    />
                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        type="text"
                        name="age"
                        onChange={this.handleChange}
                        value={this.state.createdUser.age}
                    />
                    <label htmlFor="gender">Gender</label>
                    <input
                        id="gender"
                        type="text"
                        name="gender"
                        onChange={this.handleChange}
                        value={this.state.createdUser.gender}
                    />
                    <button type="submit">Create Account</button>
                </form>
            </div>
        );
    }
}

export default Users;
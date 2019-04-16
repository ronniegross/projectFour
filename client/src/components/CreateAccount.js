import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

export default class CreateAccount extends Component {
    state = {
        user: {
            name: '',
            email: '',
            password: '',
            age: '',
            gender: ''
        },
        createdUser: {},
        redirectToHome: false
    }

    // componentDidMount = () => {
    //     axios.get('/api/users/').then(res => {
    //         this.setState({ user: res.data })
    //     })
    // }

    createUser = () => {
        axios.post('/api/users/', this.state.createdUser)
            .then(res => {
                this.setState({ redirectToHome: true, createdUser: res.data })
            })
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
        if (this.state.redirectToHome === true && this.state.createdUser.id !== null) {
            return (<Redirect to={'/'} />)
        }
        return (
            <div>
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
        )
    }
}

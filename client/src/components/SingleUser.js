import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'

const Wrapper = styled.div`
    h2 {
        color: tomato;
    }
    h3 {
        color: #052C49;
    }
    button {
            width: 200px;
            height: 40px;
            border: none;
            background-color: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            /* color: tomato; */
            border-radius: 5px;
            color: #052C49;
            text-decoration: underline;
            cursor: pointer;
            background-color: white;
        }
    button:hover {
        color: tomato;
    }
    p {
        color: #052C49
    }
`

export default class SingleUser extends Component {
    state = {
        redirectToUserList: false,
        user: {},
        comments: [],
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.fetchUser(userId);
    }


    fetchUser = async (userId) => {
        try {
            const userResponse = await axios.get(`/api/users/${userId}/`)
            this.setState({
                user: userResponse.data,
                // comments: userResponse.data.comments

            })
            // console.log(this.state.user.id)
            console.log(userId)
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteUser = async (userId) => {
        try {
            // console.log(userId)
            const userId = this.props.match.params.userId;
            axios.delete(`/api/users/${userId}/`).then(res => {
                this.setState({ redirectToUserList: true })
            })

        }
        catch (error) {
            console.log(error)
        }
    }

    // deleteuser = (event) => {
    //     event.preventDefault()
    //     axios.delete(`/api/users/${user.id}/`).then(res => {
    //         this.setState({ redirectToUserList: true })
    //     })
    // }

    render() {
        if (this.state.redirectToUserList === true) {
            return (<Redirect to={'/useraccounts'} />)
        }
        // console.log(this.state.user)
        return (
            <div>
                <Wrapper>
                    <h2>{this.state.user.name}</h2>
                    <p>Email: {this.state.user.email}</p>
                    <p>Password: {this.state.user.password}</p>
                    <p>Age: {this.state.user.age}</p>
                    <p>Gender: {this.state.user.gender}</p>
                    <button onClick={this.deleteUser}>Delete User</button>
                </Wrapper>
            </div>
        )
    }
}

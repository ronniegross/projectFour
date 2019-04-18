import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

export default class Comment extends Component {
    state = {
        // resource: {
        //     resource_name: '',
        //     photo_url: '',
        //     address: '',
        //     contact_number: ''
        // },
        resource: {},
        resources: [],
        comments: [],
        isCommentFormDisplayed: false,
        createdComment: {},
        redirectToResourceList: false,
        isUpdateResourceFormDisplayed: false,
        users: [],
        selectedUser: {}
    }

    componentDidMount() {
        this.fetchUsers()
        this.fetchResources()
    }

    fetchResources = async () => {
        try {
            const res = await axios.get('/api/resources/');
            this.setState({ resources: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
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

    toggleCommentForm = () => {
        this.setState((state, props) => {
            return ({ isCommentFormDisplayed: !state.isCommentFormDisplayed })
        })
    }

    createComment = () => {
        axios.post('/api/comments/', this.state.createdComment) // might need to make a duplicate state here...
            .then(res => {
                this.setState({ createdComment: res.data })
                this.state.comments.push(this.state.createdComment)
            })
    }

    handleCommentChange = (event) => {
        const clonedCreatedComment = { ...this.state.createdComment }
        clonedCreatedComment[event.target.name] = event.target.value
        this.setState({ createdComment: clonedCreatedComment })
    }

    render() {
        console.log(this.state.resources)
        return (
            <div>
                <form onSubmit={this.createComment}>
                    {/* <option value={this.state.users}>Select User: </option> */}
                    {/* const dropdownOptions = this.props.options.map((option) =>
                                    <option value={option} key={option} >{option}</option>,
                                                    ); */}
                    {/* <a className='dropdown-trigger btn' data-target='dropdown1'>Select a User:</a> */}
                    {/* <a class='dropdown-trigger btn' href='#' data-target='dropdown1' onClick={this.triggerDropDown}>Drop Me!</a> */}
                    {/* <ul id='dropdown1'className='dropdown-content'> */}
                    <ul>
                        {
                            this.state.users.map(user => (
                                // <div key={user.id}>
                                // <h2>{user.name}</h2>
                                // </div>
                                // <option key={user.id} value={user.name}>{user.name}</option>
                                // <li><a>{user.name}</a></li>
                                <div key={user.id} value={user.name}>{user.name}: {user.id}</div>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            this.state.resources.map(resource => (
                                // <div key={user.id}>
                                // <h2>{user.name}</h2>
                                // </div>
                                // <option key={user.id} value={user.name}>{user.name}</option>
                                // <li><a>{user.name}</a></li>
                                <div key={resource.id} value={resource.resource_name}>{resource.resource_name}: {resource.id}</div>
                            ))
                        }
                    </ul>
                    {/* <ul>
                                    {
                                        this.state.users.map(user => (
                                            // <div key={user.id}>
                                            // <h2>{user.name}</h2>
                                            // </div>
                                            // <option key={user.id} value={user.name}>{user.name}</option>
                                            <p>{user.name}</p>
                                        ))
                                    }
                                </ul> */}
                    <label htmlFor="comment">write your comment here: </label>
                    {/* map first --> add option based on item of map */}
                    {/* <option value={this.state.users} selected={this.state.selectedUser == this.state.user.value}>select user</option> */}
                    <input
                        id="comment"
                        type="text"
                        name="comment"
                        onChange={this.handleCommentChange}
                        value={this.state.createdComments}
                    />
                    <label htmlFor="user">user id</label>
                    <input
                        id="user"
                        type="text"
                        name="user"
                        onChange={this.handleCommentChange}
                        value={this.state.createdComments}
                    />
                    <label htmlFor="resource">resourceId</label>
                    <input
                        id="resource"
                        type="text"
                        name="resource"
                        onChange={this.handleCommentChange}
                        value={this.state.createdComments}
                    />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

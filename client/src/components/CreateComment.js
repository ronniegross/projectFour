import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

export default class CreateComment extends Component {
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
                    <ul>
                        {
                            this.state.users.map(user => (
                                <div key={user.id} value={user.name}>{user.name}: {user.id}</div>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                            this.state.resources.map(resource => (
                                <div key={resource.id} value={resource.resource_name}>{resource.resource_name}: {resource.id}</div>
                            ))
                        }
                    </ul>
                    <label htmlFor="comment">write your comment here: </label>
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

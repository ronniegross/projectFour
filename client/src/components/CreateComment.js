import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const Wrapper = styled.div`
    .comment-form {
        border: 2px solid #53B1F8;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        width: 400px;
        margin: 50px;
        padding: 20px;
        label {
            color: #282828;
            font-family: Arial, Helvetica, sans-serif;
        }
        input {
            color: #282828;
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
        }
        button:hover {
        box-shadow: 3px 3px tomato;
    }
    }
    .resource-component {
        margin: 10px;
    }
    ul {
        list-style: none
    }
`

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
        // console.log(this.state.resources)
        return (
            <div>
                <Wrapper>
                    <div className="comment-form">
                        <form onSubmit={this.createComment}>
                            <div className="resource-component">
                                <button>Show All Users</button>
                                <ul>
                                    {
                                        this.state.users.map(user => (
                                            // <button key={user.id} value={user.id}>{user.name}: {user.id}</button>
                                            <div key={user.id} value={user.name}>{user.name}: {user.id}</div>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="resource-component">
                            {/* bring this in from this.props.match.params.id */}
                                {/* <button>Show All Users</button> */}
                                <ul>
                                    {
                                        this.state.resources.map(resource => (
                                            <div key={resource.id} value={resource.resource_name}>{resource.resource_name}: {resource.id}</div>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="resource-component">
                                <h3>Add Comment: </h3>
                            </div>
                            {/* <div className="resource-component">
                                
                            </div> */}
                            <div className="resource-component">
                                <label htmlFor="comment">Write Your Comment Here: </label>
                                <input
                                    id="comment"
                                    type="text"
                                    name="comment"
                                    onChange={this.handleCommentChange}
                                    value={this.state.createdComments}
                                />
                            </div>
                            <div className="resource-component">
                                <label htmlFor="user">User ID: </label>
                                <input
                                    id="user"
                                    type="text"
                                    name="user"
                                    onChange={this.handleCommentChange}
                                    value={this.state.createdComments}
                                />
                            </div>
                            <div className="resource-component">
                                <label htmlFor="resource">Resource ID: </label>
                                <input
                                    id="resource"
                                    type="text"
                                    name="resource"
                                    onChange={this.handleCommentChange}
                                    value={this.state.createdComments}
                                />
                            </div>
                            <div className="resource-component">
                                <button>Submit Comment</button>
                            </div>
                        </form>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .comment-form {
        border: 2px solid #53B1F8;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        /* width: 400px; */
        margin: 50px;
        padding: 20px;
        label {
            color: #052C49;
            /* color: tomato; */
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
        }
        button:hover {
        box-shadow: 3px 3px tomato;
        }
    }
    .resource-component {
        margin: 10px;
        /* display: flex; */
        /* flex-direction: column; */
        /* align-content: center; */
    }
    ul {
        list-style: none;
        padding: 0;
    }
    .dropdownTrigger {
        border: 2px solid #53B1F8;
        padding: 5px;
        width: 150px;
        align-self: center;
        border-radius: 5px;
        color: #052C49;
    }
    .dropdownTrigger:Hover {
        /* color: #53B1F8; */
        box-shadow: 3px 3px tomato;
    }
    .dropdown {
        display: flex;
        flex-direction: column;
    }
    li {
        /* margin: 0 auto;
        padding: 0 auto; */
        color: #052C49;
    }
    /* .userBlock {
        margin: 0 auto;
    } */
    .userId {
        cursor: pointer;
    }
    .userId:hover {
        color: tomato;
    }
    .userId:target {
        color: red;
    }
    /* @media (max-width: 800px) {
        .comment-form {
            width: 200px;
        }
    } */
    @media (max-width: 800px) {
        form.create-user-form {
            width: 200px;
        }
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
        selectedUser: {},
        isShowUsersDisplayed: false,
        isShowResourcesDisplayed: false,
        userId: '',
        resourceId: ''
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
        axios.post('/api/comments/', {
            resource: parseInt(this.props.resourceId),
            user: parseInt(this.state.userId),
            comment: this.state.createdComment.comment
        }) // might need to make a duplicate state here...
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

    toggleShowUsers = () => {
        this.setState((state, props) => {
            return ({ isShowUsersDisplayed: !state.isShowUsersDisplayed })
        })
    }

    toggleShowResources = () => {
        this.setState((state, props) => {
            return ({ isShowResourcesDisplayed: !state.isShowResourcesDisplayed })
        })
    }

    saveUserId = (event) => {
        const clonedUserId = { ...this.state.userId }
        clonedUserId[event.target.name] = event.target.value
        this.setState({ userId: event.target.value })
        console.log(event.target.value)
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <div className="comment-form">
                        <form onSubmit={this.createComment}>
                            <div className="resource-component dropdown">
                                {/* <button onClick={this.toggleShowUsers}>Select A User</button> */}
                                <h3>Select A User</h3>
                                <div>
                                    <ul>
                                        {
                                            this.state.users.map(user => (
                                                // <button key={user.id} value={user.id}>{user.name}: {user.id}</button>
                                                // <div className="userBlock">
                                                <li onClick={this.saveUserId} className="userId" key={user.id} value={user.id}>{user.name}</li>
                                                // </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="resource-component">
                                    <h3>Add Comment</h3>
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
                                    <button>Submit Comment</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Wrapper>
            </div>
                )
            }
        }

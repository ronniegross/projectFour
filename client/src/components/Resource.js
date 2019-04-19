import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import CreateComment from './CreateComment';

const Pic = styled.img`
    width: 200px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 100px;
    h1 {
        color: #052C49;
    }
    h3 {
        color: #052C49;
    }
    button {
        width: 150px;
        height: 40px;
        border: 2px solid #53B1F8;
        background-color: none;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: tomato;
        border-radius: 5px;
        margin: 10px;
    }
    button:hover {
        box-shadow: 3px 3px tomato;
    }
    .delete {
        /* border: 2px solid tomato; */
        border: none;
        color: #052C49;
    }
    .delete:hover {
        /* box-shadow: 3px 3px #53B1F8; */
        box-shadow: none;
        color: tomato;
    }
    .update-resource-form {
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
`


class Resource extends Component {
    state = {
        resource: {},
        comments: [],
        isCommentFormDisplayed: false,
        createdComment: {},
        redirectToResourceList: false,
        isUpdateResourceFormDisplayed: false,
        users: [],
        selectedUser: {}
    }

    componentDidMount() {
        const resourceId = this.props.match.params.id;
        this.fetchResource(resourceId);
        this.fetchUsers();
    }

    fetchResource = async (resourceId) => {
        try {
            const resourceResponse = await axios.get(`/api/resources/${resourceId}/`)
            this.setState({
                resource: resourceResponse.data,
                comments: resourceResponse.data.comments

            })
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
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

    fetchComments = async () => {
        try {
            const res = await axios.get('/api/comments/');
            this.setState({ comments: res.data });
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
        axios.post('/api/comments/', this.state.createdComment)
            .then(res => {
                this.setState({ createdComment: res.data })
                this.state.comments.push(this.state.createdComment)
            })
    }

    deleteComment = async (event) => {
        try {
            event.preventDefault()
            this.state.comments.map(comment => (
                axios.delete(`/api/comments/${comment.id}/`)
            ))
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }


    handleCommentChange = (event) => {
        const clonedCreatedComment = { ...this.state.createdComment }
        clonedCreatedComment[event.target.name] = event.target.value
        this.setState({ createdComment: clonedCreatedComment })
    }


    updateResource = (event) => {
        event.preventDefault()
        axios.put(`/api/resources/${this.props.match.params.id}/`, this.state.resource)
    }

    deleteResource = (event) => {
        event.preventDefault()
        axios.delete(`/api/resources/${this.props.match.params.id}/`).then(res => {
            this.setState({ redirectToResourceList: true })
        })
    }

    toggleUpdateResource = () => {
        this.setState((state, props) => {
            return ({ isUpdateResourceFormDisplayed: !state.isUpdateResourceFormDisplayed })
        })
    }

    handleUpdateChange = (event) => {
        const clonedResource = { ...this.state.resource }
        clonedResource[event.target.name] = event.target.value
        this.setState({ resource: clonedResource })
    }


    render() {
        if (this.state.redirectToResourceList === true) {
            return (<Redirect to={'/'} />)
        }
        return (
            <div>
                <Wrapper>
                    <h1>{this.state.resource.resource_name}</h1>
                    <Pic src={this.state.resource.photo_url} alt="" />
                    <h3>Address: {this.state.resource.address}</h3>
                    <h3>Contact Number: {this.state.resource.contact_number}</h3>
                    {this.state.comments.map(comment => (
                        <h3><Link key={comment.id} to={`/comment/${comment.id}`} >{comment.comment}</Link></h3>
                        // <div key={comment.id}>
                        //     <p>{comment.user}: {comment.comment}</p>
                        //     <button className="delete" onClick={this.deleteComment}>Delete Comment</button>
                        // </div>
                    ))}
                    <button onClick={this.toggleCommentForm}>Add Comment</button>
                    {
                        this.state.isCommentFormDisplayed ?
                            <CreateComment />
                            : null
                    }
                    <button onClick={this.toggleUpdateResource}>Update Resource</button>
                    {
                        this.state.isUpdateResourceFormDisplayed ?
                            <div>
                                <form class="update-resource-form" onSubmit={this.updateResource}>
                                    <div className="resource-component">
                                        <h3>Update resource:</h3>
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="resource_name">Resource Name: </label>
                                        <input
                                            id="resource_name"
                                            type="text"
                                            name="resource_name"
                                            onChange={this.handleUpdateChange}
                                            value={this.state.resource.resource_name}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="photo_url">Photo URL: </label>
                                        <input
                                            id="photo_url"
                                            type="text"
                                            name="photo_url"
                                            onChange={this.handleUpdateChange}
                                            value={this.state.resource.photo_url}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="address">Address: </label>
                                        <input
                                            id="address"
                                            type="text"
                                            name="address"
                                            onChange={this.handleUpdateChange}
                                            value={this.state.resource.address}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="contact_number">Contact Number: </label>
                                        <input
                                            id="contact_number"
                                            type="text"
                                            name="contact_number"
                                            onChange={this.handleUpdateChange}
                                            value={this.state.resource.contact_number}
                                        />
                                    </div>

                                    <div className="resource-component">
                                        <button>Update</button>
                                    </div>
                                </form>
                            </div>
                            : null
                    }
                    <button className="delete" onClick={this.deleteResource}>Delete Resource</button>
                </Wrapper>
            </div>
        );
    }
}

export default Resource;
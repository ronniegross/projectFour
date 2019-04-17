import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const Pic = styled.img`
    width: 200px;
`


class Resource extends Component {
    state = {
        // resource: {
        //     resource_name: '',
        //     photo_url: '',
        //     address: '',
        //     contact_number: ''
        // },
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
        this.fetchResource(resourceId)
        this.fetchUsers();
    }

    fetchResource = async (resourceId) => {
        try {
            const resourceResponse = await axios.get(`/api/resources/${resourceId}`)
            this.setState({
                resource: resourceResponse.data,
                comments: resourceResponse.data.comments,
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
            this.setState({users: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
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
        // console.log(this.state.comments)
        // console.log(this.state.createdComment)
        console.log(this.state.users)
        if (this.state.redirectToResourceList === true) {
            return (<Redirect to={'/'} />)
        }
        return (
            <div>
                <h1>{this.state.resource.resource_name}</h1>
                <Pic src={this.state.resource.photo_url} alt="" />
                {/* <img src={this.state.resource.photo_url} alt=""/> */}
                <h3>{this.state.resource.address}</h3>
                <h3>{this.state.resource.contact_number}</h3>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h4>Comments:</h4>
                        <p>{comment.comment}</p>
                    </div>
                ))}
                <button onClick={this.toggleCommentForm}>Add comment</button>
                {
                    this.state.isCommentFormDisplayed ?
                        <form onSubmit={this.createComment}>
                            <label htmlFor="comment">write your comment here: </label>
                            {/* map first --> add option based on item of map */}
                            <option value={this.state.users} selected={this.state.selectedUser == this.state.user.value}>select user</option>
                            <input
                                id="comment"
                                type="text"
                                name="comment"
                                onChange={this.handleCommentChange}
                                value={this.state.createdComments}
                            />
                            <button>submit</button>
                        </form>
                        : null
                }
                <button onClick={this.toggleUpdateResource}>update resource</button>
                {
                    this.state.isUpdateResourceFormDisplayed ?
                        <div>
                            <h3>Update resource:</h3>
                            <form id="resource-form" onSubmit={this.updateResource}>
                                <label htmlFor="resource_name">Resource Name</label>
                                <input
                                    id="resource_name"
                                    type="text"
                                    name="resource_name"
                                    onChange={this.handleUpdateChange}
                                    value={this.state.resource.resource_name}
                                />
                                <label htmlFor="photo_url">Photo URL</label>
                                <input
                                    id="photo_url"
                                    type="text"
                                    name="photo_url"
                                    onChange={this.handleUpdateChange}
                                    value={this.state.resource.photo_url}
                                />
                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    onChange={this.handleUpdateChange}
                                    value={this.state.resource.address}
                                />
                                <label htmlFor="contact_number">Contact Number</label>
                                <input
                                    id="contact_number"
                                    type="text"
                                    name="contact_number"
                                    onChange={this.handleUpdateChange}
                                    value={this.state.resource.contact_number}
                                />
                                <button>update resource</button>
                            </form>
                        </div>
                        : null
                }
                <button onClick={this.deleteResource}>delete resource</button>
            </div>
        );
    }
}

export default Resource;
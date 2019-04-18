import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';
import Comment from './Comment';
// import DisplayComment from './DisplayComment'

const Pic = styled.img`
    width: 200px;
`
const Wrapper = styled.div`
    margin-bottom: 100px;
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
            // console.log(resourceId)
            this.setState({
                resource: resourceResponse.data,
                comments: resourceResponse.data.comments

            })
            // if (this.state.comments != null) {
            //     this.setState({
            //         comments: resourceResponse.data.comments
            //     })
            // }
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

    deleteComment = (event) => {
        event.preventDefault()
        axios.delete(`/api/comment/${this.props.match.params.id}/`)
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
        // console.log(this.props.match.params.id)
        if (this.state.redirectToResourceList === true) {
            return (<Redirect to={'/'} />)
        }
        return (
            <div>
                <Wrapper>
                    <h1>{this.state.resource.resource_name}</h1>
                    <Pic src={this.state.resource.photo_url} alt="" />
                    <h3>{this.state.resource.address}</h3>
                    <h3>{this.state.resource.contact_number}</h3>
                    {/* <DisplayComment />  */}
                    {/* {
                        this.state.comments != null ?
                            <div>
                                {this.state.comments.map(comment => (
                                    <div key={comment.id}>
                                        <h4>Comments:</h4>
                                        <p>{comment.comment}</p>
                                        <button onClick={this.deleteComment}>delete comment</button>
                                    </div>
                                ))}
                            </div>
                            : null
                    } */}
                    {this.state.comments.map(comment => (
                        <div key={comment.id}>
                            {/* <h4>Comments:</h4> */}
                            <p>{comment.user}:</p>
                            <p>{comment.comment}</p>
                            <button onClick={this.deleteComment}>delete comment</button>
                        </div>
                    ))}
                    <button onClick={this.toggleCommentForm}>Add comment</button>
                    {
                        this.state.isCommentFormDisplayed ?
                            <Comment />
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
                </Wrapper>
            </div>
        );
    }
}

export default Resource;
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const Pic = styled.img`
    width: 200px;
`


class Resource extends Component {
    state = {
        resource: {},
        comments: [],
        isCommentFormDisplayed: false,
        createdComment: {},
        redirectToResourceList: false
    }

    componentDidMount() {
        const resourceId = this.props.match.params.id;
        this.fetchResource(resourceId)
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

    toggleCommentForm = () => {
        this.setState((state, props) => {
            return ({ isCommentFormDisplayed: !state.isCommentFormDisplayed })
        })
    }

    createComment = () => {
        axios.post('/api/comments/', this.state.createdComment) // might need to make a duplicate state here...
            .then(res => {
                this.setState({ createdComment: res.data })
            })
    }

    handleChange = (event) => {
        const clonedCreatedComment = { ...this.state.createdComment }
        clonedCreatedComment[event.target.name] = event.target.value
        this.setState({ createdComment: clonedCreatedComment })
    }

    // updateResource = (event) => {
    //     event.preventDefault()
    //     axios.put(`/api/resources/${this.props.match.params.resourceId}`, { savedCheese: this.state.savedCheese })
    // }

    deleteResource = (event) => {
        event.preventDefault()
        axios.delete(`/api/resources/${this.props.match.params.id}/`).then(res => {
            this.setState({ redirectToResourceList: true })
        })
    }

    render() {
        // console.log(this.props.match.params.id)
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
                        <form>
                            <label htmlFor="comment">write your comment here: </label>
                            <input
                                id="comment"
                                type="text"
                                name="comment"
                                onChange={this.handleChange}
                                value={this.state.createdComments}
                            />
                            <button>submit</button>
                        </form>
                        : null
                }
                <button onClick={this.deleteResource}>delete resource</button>
            </div>
        );
    }
}

export default Resource;
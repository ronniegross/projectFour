import React, { Component } from 'react'
import axios from 'axios';


export default class DisplayComment extends Component {
    state = {
        comments: []
    }

    componentDidMount() {
        const resourceId = this.props.match.params.id;
        this.fetchResource(resourceId);
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

    render() {
        return (
            <div>
                  {this.state.comments.map(comment => (
                        <div key={comment.id}>
                            <h4>Comments:</h4>
                            <p>{comment.comment}</p>
                            <button onClick={this.deleteComment}>delete comment</button>
                        </div>
                    ))}
            </div>
        )
    }
}

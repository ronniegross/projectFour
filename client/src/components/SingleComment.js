import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'

export default class SingleComment extends Component {
    state = {
        redirectToHome: false,
        comment: {},
    }

    componentDidMount() {
        const commentId = this.props.match.params.commentId;
        this.fetchComment(commentId);
    }


    fetchComment = async (commentId) => {
        try {
            const commentResponse = await axios.get(`/api/comments/${commentId}/`)
            this.setState({
                comment: commentResponse.data,
                // comments: userResponse.data.comments

            })
            // console.log(this.state.user.id)
            console.log(commentId)
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteComment = async (commentId) => {
        try {
            // console.log(userId)
            const commentId = this.props.match.params.commentId;
            axios.delete(`/api/comments/${commentId}/`).then(res => {
                this.setState({ redirectToHome: true })
            })

        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirectToHome === true) {
            return (<Redirect to={'/'} />)
        }
        return (
            <div>
                {/* <h2>{this.state.comment.id}</h2> */}
                <h2>{this.state.comment.comment}</h2>
                <button onClick={this.deleteComment}>Delete Comment</button>
            </div>
        )
    }
}

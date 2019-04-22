import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'

const Wrapper = styled.div`
    h2 {
        /* color: #052C49; */
        color: tomato;
    }
    button {
        border: none;
        color: #052C49;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        text-decoration: underline;
        cursor: pointer;
    }
    button:hover {
        color: tomato;
    }
`

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
                <Wrapper>
                    {/* <h2>{this.state.comment.id}</h2> */}
                    <h2>"{this.state.comment.comment}"</h2>
                    <button onClick={this.deleteComment}>Delete Comment</button>
                </Wrapper>
            </div>
        )
    }
}

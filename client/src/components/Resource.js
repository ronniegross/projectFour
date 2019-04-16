import React, {Component} from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Pic = styled.img`
    width: 200px;
`


class Resource extends Component {
    state = {
            resource: {},
            comments: [],
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
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                <h2>Resource</h2>
                <Pic src={this.state.resource.photo_url} alt="" />
                {/* <img src={this.state.resource.photo_url} alt=""/> */}
                <h1>{this.state.resource.resource_name}</h1>
                <h3>{this.state.resource.address}</h3>
                <h3>{this.state.resource.contact_number}</h3>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h4>Comments:</h4>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Resource;
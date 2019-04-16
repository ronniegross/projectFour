import React, {Component} from 'react';
import axios from 'axios';

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
                <img src={this.state.resource.photo_url} alt=""/>
                <h1>{this.state.resource.resource_name}</h1>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h4>{comment.comment}</h4>
                    </div>
                ))}
            </div>
        );
    }
}

export default Resource;
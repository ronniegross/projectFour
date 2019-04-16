import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ResourceList extends Component {
    state = {
        error: '',
        resources: []
    }

    componentDidMount(){
        this.fetchResources();
    }

    fetchResources = async () => {
        try {
            const res = await axios.get('/api/resources/');
            this.setState({resources: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Resources</h1>
                {this.state.resources.map(resource => (
                    <div key={resource.id}>
                        <Link to={`/resource/${resource.id}`} >{resource.resource_name}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default ResourceList;
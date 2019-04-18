import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Pic = styled.img`
    width: 200px;
`

const Wrapper = styled.div`
    .resourceDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 30px;
    }
    margin-bottom: 100px;
`

class ResourceList extends Component {
    state = {
        error: '',
        resources: [],
        resource: {
            resource_name: '',
            photo_url: '',
            address: '',
            contact_number: ''
        },
        createdResource: {},
        isAddNewResourceFormDisplayed: false
    }

    componentDidMount() {
        this.fetchResources();
    }

    fetchResources = async () => {
        try {
            const res = await axios.get('/api/resources/');
            this.setState({ resources: res.data });
        }
        catch (err) {
            console.log(err)
            this.setState({ error: err.message })
        }
    }

    createResource = () => {
        axios.post('/api/resources/', this.state.createdResource)
            .then(res => {
                this.setState({ createdResource: res.data })
                // document.getElementById("resource-form").reset()
            })
    }

    handleCreateResource = (event) => {
        event.preventDefault()
        this.createResource()
    }

    handleChange = (event) => {
        const clonedCreatedResource = { ...this.state.createdResource }
        clonedCreatedResource[event.target.name] = event.target.value
        this.setState({ createdResource: clonedCreatedResource })
    }

    toggleAddNewResourceForm = () => {
        this.setState((state, props) => {
            return ({ isAddNewResourceFormDisplayed: !state.isAddNewResourceFormDisplayed })
        })
    }

    render() {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <Wrapper>
                    <h1>All Resources</h1>
                    {this.state.resources.map(resource => (
                        <div className="resourceDiv" key={resource.id}>
                            <Link to={`/resources/${resource.id}`} >{resource.resource_name}</Link>
                            <Pic src={resource.photo_url} alt="resourcePic"></Pic>
                        </div>
                    ))}
                    <button onClick={this.toggleAddNewResourceForm}>Add a new resource</button>
                    {
                        this.state.isAddNewResourceFormDisplayed ?
                            <div>
                                <h3>Add a new resource:</h3>
                                <form id="resource-form" onSubmit={this.handleCreateResource}>
                                    <label htmlFor="resource_name">Resource Name</label>
                                    <input
                                        id="resource_name"
                                        type="text"
                                        name="resource_name"
                                        onChange={this.handleChange}
                                        value={this.state.createdResource.resource_name}
                                    />
                                    <label htmlFor="photo_url">Photo URL</label>
                                    <input
                                        id="photo_url"
                                        type="text"
                                        name="photo_url"
                                        onChange={this.handleChange}
                                        value={this.state.createdResource.photo_url}
                                    />
                                    <label htmlFor="address">Address</label>
                                    <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        onChange={this.handleChange}
                                        value={this.state.createdResource.address}
                                    />
                                    <label htmlFor="contact_number">Contact Number</label>
                                    <input
                                        id="contact_number"
                                        type="text"
                                        name="contact_number"
                                        onChange={this.handleChange}
                                        value={this.state.createdResource.contact_number}
                                    />
                                    <button>Submit new resource</button>
                                </form>
                            </div>
                            : null
                    }
                </Wrapper>
            </div>
        );
    }
}

export default ResourceList;
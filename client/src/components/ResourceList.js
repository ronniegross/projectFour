import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Pic = styled.img`
    width: 200px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .resourceDiv {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        /* align-items: center; */
        margin: 30px;
    }
    margin-bottom: 100px;
    font-family: Arial, Helvetica, sans-serif;

    a {
        text-decoration: none;
        color: tomato;
        margin-top: 10px;
    }

    .btn {
        width: 200px;
        height: 40px;
        border: 2px solid #53B1F8;
        background-color: none;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: tomato;
        border-radius: 5px;
    }

    .btn:hover {
        box-shadow: 3px 3px tomato;
    }

    .resource-form {
        border: 2px solid #53B1F8;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        width: 400px;
        margin: 50px;
        padding: 20px;
        label {
            color: #282828;
            font-family: Arial, Helvetica, sans-serif;
        }
        input {
            color: #282828;
            font-family: Arial, Helvetica, sans-serif;
            height: 20px;
            /* border-radius: 5px; */
            border: none;
            border-bottom: 2px solid #53B1F8;
        }
        input[type="text"] {
            font-size:16px;
        }
        h3 {
            margin: 0;
            color: tomato;
        }
        button {
            width: 200px;
            height: 40px;
            border: 2px solid #53B1F8;
            background-color: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            color: tomato;
            border-radius: 5px;
        }
        button:hover {
        box-shadow: 3px 3px tomato;
    }
    }
    .resource-component {
        margin: 10px;
    }
`

const TileWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
                    <TileWrapper>
                        {/* <h1>All Resources</h1> */}
                        {this.state.resources.map(resource => (
                            <div className="resourceDiv" key={resource.id}>
                                <Pic src={resource.photo_url} alt="resourcePic"></Pic>
                                <Link to={`/resources/${resource.id}`} >{resource.resource_name}</Link>
                            </div>
                        ))}
                    </TileWrapper>
                    <button className="btn" onClick={this.toggleAddNewResourceForm}>Add a New Resource</button>
                    {
                        this.state.isAddNewResourceFormDisplayed ?
                            <div>
                                <form className="resource-form" onSubmit={this.handleCreateResource}>
                                    <div className="resource-component">
                                        <h3>Add a New Resource:</h3>
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="resource_name">Resource Name: </label>
                                        <input
                                            id="resource_name"
                                            type="text"
                                            name="resource_name"
                                            onChange={this.handleChange}
                                            value={this.state.createdResource.resource_name}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="photo_url">Photo URL: </label>
                                        <input
                                            id="photo_url"
                                            type="text"
                                            name="photo_url"
                                            onChange={this.handleChange}
                                            value={this.state.createdResource.photo_url}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <label htmlFor="address">Address: </label>
                                        <input
                                            id="address"
                                            type="text"
                                            name="address"
                                            onChange={this.handleChange}
                                            value={this.state.createdResource.address}
                                        />
                                    </div>

                                    <div className="resource-component">
                                        <label htmlFor="contact_number">Contact Number: </label>
                                        <input
                                            id="contact_number"
                                            type="text"
                                            name="contact_number"
                                            onChange={this.handleChange}
                                            value={this.state.createdResource.contact_number}
                                        />
                                    </div>
                                    <div className="resource-component">
                                        <button className="resource-component">Submit new resource</button>
                                    </div>
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
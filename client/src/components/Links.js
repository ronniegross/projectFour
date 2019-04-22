import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-top: 40px;
    a {
        /* color: #052C49; */
        color: #282828;
        /* color: tomato; */
        text-decoration: none;
    }
    a:hover {
        /* color: #052C49; */
        color: tomato;
    }
    .resourceDiv {
        margin: 10px;
    }
    h2 {
        color: tomato;
    }
    h4 {
        color: #052C49;
        /* color: tomato; */
        margin: 20px 0 5px 0;
    }
`

export default class Links extends Component {
    state = {
        resources: [],
        alphabeticalResources: []
    }

    componentDidMount() {
        this.fetchResources().then(() => {
            this.sortResources()
        })

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

    sortResources = () => {
        let alphabeticalResourcesSorted = this.state.resources.sort(function (a, b) {
            if (a.resource_name < b.resource_name) { return -1; }
            if (a.resource_name > b.resource_name) { return 1; }
            return 0;
        })
        this.setState({ alphabeticalResources: alphabeticalResourcesSorted })
    }


    render() {
        return (
            <div>
                <Wrapper>
                    <h2>Links</h2>
                    {this.state.resources.map(resource => (
                        <div className="resourceDiv" key={resource.id}>
                            {/* <Link to={`/resources/${resource.id}`}><Pic src={resource.photo_url} alt="resourcePic"></Pic></Link> */}
                            <h4>{resource.resource_name}:</h4>
                            <a href={resource.url}>{resource.url}</a>
                            {/* <Link to={`${resource.url}`} >{resource.resource_name}: {resource.url}</Link> */}
                        </div>
                    ))}
                </Wrapper>
            </div>
        )
    }
}

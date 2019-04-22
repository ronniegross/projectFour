import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    .mission-container {
        padding-top: 50px;
        width: 80%;
        margin: 0 auto;
        font-size: 16px;
        color: #052C49;
    }
    h2 {
        margin: 40px 0 -20px 0;
        color: tomato;
    }
`

export default class Mission extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <h2>Mission</h2>
                    <div className="mission-container">
                        The goal of the Atlanta Shelter Resource is to create a compiled list of resources for the Atlanta homeless community. Users are able to view a quick list of resources and the comments, reviews other folks have left on those resources, and are able to add their own resources and comments. Resources include shelters and homeless friendly businesses within the Atlanta community. Our mission is to make finding shelter and comfort easier than ever for those in need.
                    </div>
                </Wrapper>
            </div>
        )
    }
}

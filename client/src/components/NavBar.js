import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    li {
        display: inline;
    }
    a {
        text-decoration: none;
        padding: 0 10px 0 10px;
        color: tomato;
    }
`

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <nav>
                        <div>
                            <ul>
                                <li><Link to={'/'}> List of Resources </Link></li>
                                <li><Link to={'/map'}> Map </Link></li>
                                <li><Link to={'/links'}> Link </Link></li>
                                <li><Link to={'/numberindex'}> Number Index </Link></li>
                                <li><Link to={'/mission'}> Mission </Link></li>
                                <li><Link to={`/${this.props.userId}`}> Account Info </Link></li>
                            </ul>
                        </div>
                    </nav>
                </Wrapper>
            </div>
        )
    }
}

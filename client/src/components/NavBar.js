import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center; 
    }
    li {
        list-style-type: none;
    }
    a {
        text-decoration: none;
        padding: 0 30px 0 30px;
        color: tomato;
    }
    img {
        width: 150px;
        margin-top: -15px;
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
                                <li><Link to={'/links'}> Links </Link></li>
                                <li><img src="https://i.imgur.com/tFS2b17.png" alt="aslLogo"/></li>
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

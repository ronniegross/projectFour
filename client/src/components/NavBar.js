import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center; 
        /* text-align: center; */
    }
    li {
        list-style-type: none;
        border: 2px solid #53B1F8;
        padding: 10px;
        /* margin: 0 10px 0 10px; */
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center; 
        /* text-align: center; */
    }
    li:hover {
        /* shadow: blue; */
        box-shadow: 3px 3px tomato;
        /* box-shadow: 3px 3px #286694;     */
    }
    a {
        text-decoration: none;
        padding: 0 20px 0 20px;
        /* margin: 0 10px 0 10px; */
        color: tomato;
        /* color: #53B1F8; */
        /* text-align: center; */
    }
    img {
        width: 150px;
        margin-top: -15px;
    }
    .logo {
        border: none;
    }
    .logo:hover {
        box-shadow: none;
    }
    .nav {
        text-align: center;
    }
    @media (max-width: 1100px) {
        a {
            padding: 0 10px 0 10px;
        }
    }
    @media (max-width: 920px) {
        li {
            padding: 10px 3px 10px 3px;
            font-size: 14px;
            margin: 0 5px 0 5px;
        }
        img {
            width: 100px;
        }
        a {
            text-align: center;
        }
    }
    @media (max-width: 800px) {
        /* fully responsive */
        ul {
            flex-direction: column;
        }
        li {
            border: none;
            padding: 0;
            margin: 0;
        }
        a {
            padding: 0;
            margin: 5px;
        }
        img {
            width: 75px;
            order: 1;
        }
    }
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
                                <li className="logo"><img src="https://i.imgur.com/tFS2b17.png" alt="aslLogo" /></li>
                                <li><Link to={'/numberindex'}> Number Index </Link></li>
                                <li><Link to={'/mission'}> Mission </Link></li>
                                {/* <li><Link to={`/${this.props.userId}`}> Account Info </Link></li> */}
                                <li><Link to={'/useraccounts'}> User Accounts </Link></li>
                            </ul>
                        </div>
                    </nav>
                </Wrapper>
            </div>
        )
    }
}

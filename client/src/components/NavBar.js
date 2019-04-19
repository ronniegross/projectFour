import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    .regular-menu ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center; 
        /* text-align: center; */
    }
    .regular-menu li {
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
    .regular-menu li:hover {
        /* shadow: blue; */
        box-shadow: 3px 3px tomato;
        /* box-shadow: 3px 3px #286694;     */
    }
    .regular-menu a {
        text-decoration: none;
        padding: 0 20px 0 20px;
        /* margin: 0 10px 0 10px; */
        color: tomato;
        /* color: #53B1F8; */
        /* text-align: center; */
    }
    .regular-menu img {
        width: 150px;
        margin-top: -15px;
    }
    .regular-menu .logo {
        border: none;
    }
    .regular-menu .logo:hover {
        box-shadow: none;
    }
    .nav {
        text-align: center;
    }
    .navbar-toggle {
        display: none;
    }
    .responsive-logo {
        display: none;
    }
    .mobile-menu {
        display: none;
        /* z-index: 1; */
    }
    .mobile-menu ul {
        display: flex;
        flex-direction: column;
        /* justify-content: space-around; */
        align-items: flex-start; 
        /* background-color: tomato; */
        margin: 0 0 0 10px;
        padding: 0;
        /* list-style-type: none; */
        /* text-align: center; */
    }
    .mobile-menu li {
        list-style-type: none;
        padding: 10px;
        /* margin: 0; */
        /* width: 100%; */
        /* margin: 0 10px 0 10px; */
        font-family: Arial, Helvetica, sans-serif;
        /* width: 100%; */
        /* background-color: white; */
        /* display: flex; */
        /* flex-direction: column; */
        /* align-items: flex-start;  */
        /* justify-content: flex-start; */
        /* align-content: flex-start; */
        /* text-align: center; */
    }
    .mobile-menu li:hover {
        /* shadow: blue; */
        /* box-shadow: 3px 3px tomato; */
        /* box-shadow: 3px 3px #286694;     */
        /* background-color: #53B1F8; */
        /* border: 2px solid #53B1F8;
        border-radius: 5px; */
    }
    .mobile-menu a {
        text-decoration: none;
        /* padding: 0 20px 0 20px; */
        /* margin: 0 10px 0 10px; */
        /* color: #282828; */
        color: #052C49;
        margin: 0;
        padding: 0;
        font-size: 16px;
        /* color: #53B1F8; */
        /* text-align: center; */
    }
    .mobile-menu a:hover {
        color: tomato;
    }
    .navbar-toggle {
        width: 30px;
    }
    @media (max-width: 1100px) {
        a {
            padding: 0 10px 0 10px;
        }
    }
    @media (max-width: 940px) {
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
        .mobile-menu {
            display: inline;
        }
        nav {
            /* background-color: tomato; */
            /* border: 2px solid #53B1F8; */
        }
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
            /* order: 1; */
            margin: 8px 0 5px 0;
        }
        .regular-menu {
            display: none;
        }
        .navbar-toggle {
            display: inline;
            position: absolute;
            top: 21px;
            left: 10px;
        }
        .responsive-logo {
            display: inline;
        }
    }
`

export default class NavBar extends Component {
    state = {
        isMobileDropDownTriggered: false,
    }

    toggleMobileDropDown = () => {
        this.setState((state, props) => {
            return ({ isMobileDropDownTriggered: !state.isMobileDropDownTriggered })
        })
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <nav>
                        <div className="navbar-toggle" onClick={this.toggleMobileDropDown}><img className="navbar-toggle" src="https://i.imgur.com/I34tvzm.png" alt="mobilemenutrigger" /></div>
                        {/* <div className="navbar-toggle" onClick={this.toggleMobileDropDown}>Menu</div> */}
                        <Link to={'/'}><div className="responsive-logo"><img src="https://i.imgur.com/tFS2b17.png" alt="aslLogo"/></div></Link>
                        <div className="mobile-menu">
                            {
                                this.state.isMobileDropDownTriggered ?
                                    <div>
                                        <ul>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/'}> List of Resources </Link></li>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/map'}> Map </Link></li>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/links'}> Links </Link></li>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/numberindex'}> Number Index </Link></li>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/mission'}> Mission </Link></li>
                                            <li onClick={this.toggleMobileDropDown}><Link to={'/useraccounts'}> User Accounts </Link></li>
                                        </ul>
                                    </div>
                                    : null
                            }

                        </div>
                        <div className="regular-menu">
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

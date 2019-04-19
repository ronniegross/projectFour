import React, { Component } from 'react'

export default class Dropdown extends Component {
    state = {
        nameOfDropdown: '',
    }

    render() {
        return (
            <div>
                <button>{this.state.nameOfDropdown}</button>
                
            </div>
        )
    }
}

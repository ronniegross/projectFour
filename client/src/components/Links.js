import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    h2 {
        color: tomato;
    }
`

export default class Links extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <h2>Links</h2>
                </Wrapper>
            </div>
        )
    }
}

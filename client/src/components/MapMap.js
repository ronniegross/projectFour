import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components'


const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY

// const Wrapper = styled.div`
//     .mapContainer {
//         width: 500px;
//         height: 500px;
//     }
// `

const mapStyles = {
    width: '85%',
    height: '85%',
    margin: '0 auto',

};

class MapMap extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        this.props.onMapLoad(map)
    }


    componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}/`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            // Below is important. 
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            // <Wrapper>
                <div style={{ width: 700, height: 700, margin: '0 auto' }} id={this.props.id} />
                // <div className="mapContainer" />
            // </Wrapper>
        );
    }
}

export default MapMap



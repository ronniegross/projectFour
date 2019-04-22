import React, { Component } from 'react';
import { render } from 'react-dom';
import MapMap from './MapMap'
import MapInfoWindow from './MapInfoWindow'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-bottom: 100px;
`


class MapComponent extends Component {
    constructor() {
        super();
        this.createInfoWindow = this.createInfoWindow.bind(this)
    }

    createInfoWindow(e, map) {
        const infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
        })
        infoWindow.addListener('domready', e => {
            render(<MapInfoWindow />, document.getElementById('infoWindow'))
        })
        infoWindow.open(map)
    }

    render() {
        return (
            <Wrapper>
                <MapMap
                    id="myMap"
                    options={{
                        center: { lat: 33.7679188, lng: -84.3880 },
                        zoom: 13
                    }}
                    onMapLoad={map => {
                        let salvationArmy = new window.google.maps.Marker({
                            position: { lat: 33.7653988, lng: -84.3986624 },
                            map: map,
                            title: 'Salvation Army',
                            label: {
                                color: 'black',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                text: 'Salvation Army',
                            },
                        });
                        let theShepherdsInn = new window.google.maps.Marker({
                            position: { lat: 33.764893, lng: -84.392581 },
                            map: map,
                            title: 'The Shepherds Inn',
                            label: {
                                color: 'black',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                text: 'The Shepherds Inn',
                            },
                        });
                    }}
                />
            </Wrapper>
        );
    }
}

export default MapComponent

// render(<App />, document.getElementById('root'));

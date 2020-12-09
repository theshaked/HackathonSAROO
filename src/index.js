import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
const token = "pk.eyJ1Ijoib21yaWFsc3RlciIsImEiOiJja2loaHJtNW4xc2RnMnByc3g1aDJuMGZmIn0.YOhYwQXW_lGuvrDUslF_GQ";
mapboxgl.accessToken = token;


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 35,
            lat: 33,
            zoom: 6
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        var url = 'https://wanderdrone.appspot.com/';
        map.on('load', function () {
            var request = new XMLHttpRequest();
            window.setInterval(function () {
// make a GET request to parse the GeoJSON at the url
                request.open('GET', url, true);
                request.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
// retrieve the JSON from the response
                        var json = JSON.parse(this.response);

// update the drone symbol's location on the map
                        map.getSource('drone').setData(json);

// fly the map to the drone's current location
                        map.flyTo({
                            center: json.geometry.coordinates,
                            speed: 0.5
                        });
                    }
                };
                request.send();
            }, 2000);

            map.addSource('drone', { type: 'geojson', data: url });
            map.addLayer({
                'id': 'drone',
                'type': 'symbol',
                'source': 'drone',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
        });
    }

    render() {
        return (
        <div>
        <div className='sidebarStyle'>
        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
        )
    }
  }
  
  ReactDOM.render(<Application></Application>, document.getElementById('app'));
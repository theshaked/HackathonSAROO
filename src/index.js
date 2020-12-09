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

        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
        });
        var plane;
        map.on('load', function () {
            // Add an image to use as a custom marker
            map.loadImage(
            'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-plane-512.png',
            function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image ,10);
            // Add a GeoJSON source with 2 points
            plane = map.addSource('points', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': [
            {
            // feature for Mapbox DC
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [35,33]
            },
            'properties': {
            'title': 'ראשנ סוטמ'
            }
            }
            ]
            }
            });
             
            // Add a symbol layer
            map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
            'icon-image': 'custom-marker',
            'icon-size': 0.07,
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
            }
            });
            }
            );
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
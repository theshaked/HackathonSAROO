import React from 'react';
import mapboxgl from 'mapbox-gl';
import styles from '../map/map.module.css';

const token = "pk.eyJ1Ijoib21yaWFsc3RlciIsImEiOiJja2loaHJtNW4xc2RnMnByc3g1aDJuMGZmIn0.YOhYwQXW_lGuvrDUslF_GQ";
mapboxgl.accessToken = token;

var airplanes = [{id: 'drone1', scale: 1}, {id: 'drone2', scale: 1.2}, {id: 'drone3', scale: 1.03}, { id: 'drone4', scale: 1.5}, {id: 'drone5', scale: 1.09}, {id: 'drone6', scale: 1.4},
    {id: 'drone7', scale: 1.3}, {id: 'drone8', scale: 1.6}, {id: 'drone9', scale: 1.65}, {id: 'drone10', scale: 1.7}];
var url = 'https://wanderdrone.appspot.com/';


export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 35,
            lat: 33,
            zoom: 6
        };
    }

    componentDidMount() {
        // function addPlane() {
        //     var planeId = 'drone' + airplanes.length + 1;
        //     airplanes.push({id: planeId, scale: (Math.random() * (1.000001 - 1.99999) + 0.0200).toFixed(4)});
        //
        //     if (map) {
        //         map.addSource(planeId, {type: 'geojson', data: url});
        //         map.addLayer({
        //             'id': planeId,
        //             'type': 'symbol',
        //             'source': planeId,
        //             'layout': {
        //                 'icon-image': 'airport-15'
        //             }
        //         });
        //     }
        // }
        //
        // function removePlane() {
        //     var planeId = airplanes[airplanes.length - 1];
        //     airplanes.splice(airplanes.length - 1);
        //
        //     if (map) {
        //         map.removeSource(planeId);
        //         map.removeLayer({
        //             'id': planeId,
        //             'type': 'symbol',
        //             'source': planeId,
        //             'layout': {
        //                 'icon-image': 'airport-15'
        //             }
        //         });
        //     }
        // }

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('load', function () {
            var request = new XMLHttpRequest();
            window.setInterval(function () {
                request.open('GET', url, true);
                request.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
                        var json = JSON.parse(this.response);

                        airplanes.forEach((x) => {
                            json.geometry.coordinates = [json.geometry.coordinates[0] * x.scale, json.geometry.coordinates[1] * x.scale];
                            map.getSource(x.id).setData(json);
                        });

//                         map.flyTo({
//                             center: json.geometry.coordinates,
//                             speed: 0.5
//                         });
                    }
                };
                request.send();
            }, 2000);

            map.addSource('drone1', {type: 'geojson', data: url});
            map.addSource('drone2', {type: 'geojson', data: url});
            map.addSource('drone3', {type: 'geojson', data: url});
            map.addSource('drone4', {type: 'geojson', data: url});
            map.addSource('drone5', {type: 'geojson', data: url});
            map.addSource('drone6', {type: 'geojson', data: url});
            map.addSource('drone7', {type: 'geojson', data: url});
            map.addSource('drone8', {type: 'geojson', data: url});
            map.addSource('drone9', {type: 'geojson', data: url});
            map.addSource('drone10', {type: 'geojson', data: url});
            // map.removeSource()
            map.addLayer({
                'id': 'drone1',
                'type': 'symbol',
                'source': 'drone1',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone2',
                'type': 'symbol',
                'source': 'drone2',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone3',
                'type': 'symbol',
                'source': 'drone3',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone4',
                'type': 'symbol',
                'source': 'drone4',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone5',
                'type': 'symbol',
                'source': 'drone5',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone6',
                'type': 'symbol',
                'source': 'drone6',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone7',
                'type': 'symbol',
                'source': 'drone7',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone8',
                'type': 'symbol',
                'source': 'drone8',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone9',
                'type': 'symbol',
                'source': 'drone9',
                'layout': {
                    'icon-image': 'airport-15'
                }
            });
            map.addLayer({
                'id': 'drone10',
                'type': 'symbol',
                'source': 'drone10',
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
                    <div>AirPlanes Count: {airplanes.length}
                        <button>+</button>
                        <button>-</button>
                    </div>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div className={styles.flex} ref={el => this.mapContainer = el} className='mapContainer'/>
            </div>
        )
    }
}

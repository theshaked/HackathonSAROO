import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import {AppContainer} from "./components/appContainer/appContainer";

const token = "pk.eyJ1Ijoib21yaWFsc3RlciIsImEiOiJja2loaHJtNW4xc2RnMnByc3g1aDJuMGZmIn0.YOhYwQXW_lGuvrDUslF_GQ";
mapboxgl.accessToken = token;


class Application extends React.Component {

}

ReactDOM.render(<AppContainer/>, document.getElementById('app'));



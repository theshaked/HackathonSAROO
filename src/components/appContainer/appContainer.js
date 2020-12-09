import {Buttons} from '../button/button';
import {Map} from '../map/map'
import * as React from "react";
import styles from './appContainer.module.css';

export class AppContainer extends React.Component {
    render() {
        return (
            <div className={styles.rowC}>
                <Buttons/>
                <Map/>
            </div>
        );
    }
}

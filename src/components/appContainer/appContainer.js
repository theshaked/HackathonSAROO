import {Map} from '../map/map'
import * as React from "react";
import styles from './appContainer.module.css';
import {ButtonsRow} from "../button/buttonsRow"

export class AppContainer extends React.Component {
    render() {
        return (
            <div className={styles.rowC}>
                <ButtonsRow/>
                <Map/>
            </div>
        );
    }
}

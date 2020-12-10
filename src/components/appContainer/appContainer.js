import {Buttons} from '../button/button';
import {Map} from '../map/map'
import * as React from "react";
import styles from './appContainer.module.css';
import {ButtonContainer} from "../buttonContainer/buttonContainer";
import {Map} from "../map/map";
import {ButtonsRow} from "../button/buttonsRow"

export class AppContainer extends React.Component {
    render() {
        return (
            <div className={styles.rowC}>
                <ButtonContainer/>
                <ButtonsRow/>
                <Map/>
            </div>
        );
    }
}

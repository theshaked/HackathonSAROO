import * as React from "react";
import styles from './button.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Buttons extends React.Component {

    render() {

    render(props) {
        return (
            <div>
                <div className={styles.toggle}>
                    <input type="checkbox" />
                        <span className={styles.button}></span>
                        <span className={styles.label} ><span>&#9992;</span></span>
                <div className={styles.container}>
                    <div className={styles.toggle}>
                        <input type="button"/>
                            <span className={styles.button}></span>
                            <span className={styles.label}><FontAwesomeIcon icon={this.props.class} /></span>
                    </div>
                </div>
            </div>
        );
    }
}

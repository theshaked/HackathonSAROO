import * as React from "react";
import styles from './button.module.css';

export class Buttons extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container}>
                    <div className={styles.toggle}>
                        <input type="checkbox"/>
                            <span className={styles.button}></span>
                            <span className={styles.label}>+</span>
                    </div>
                </div>
            </div>
        );
    }
}

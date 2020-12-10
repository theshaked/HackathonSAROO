import * as React from "react";
import {Buttons} from "./button"
import styles from './button.module.css';

export class ButtonsRow extends React.Component {
    
    getButtonsUsingForLoop = (num) => {
        const array = []
        for(var i = 1; i <= num; i++){
          array.push(<Buttons></Buttons>)
        }  
        return array
      }
    
      render(){
        return(
            <div>
                <div className={styles.container}>
                    { this.getButtonsUsingForLoop(5) }
                </div>
            </div>
        )
      }
}
import React from 'react';
import styles from './input.module.css';

class Input extends React.Component {
    render() {
        return (
            <div className={styles.page_caculator_parent}>
                <div className={styles.page_caculator_cal_content}>
                    <input className={styles.page_caculator_input}></input>
                </div>
            </div>
        );
    }
}

export default Input;
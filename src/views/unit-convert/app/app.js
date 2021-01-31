import React from 'react';
import styles from './app.module.css';
const { remote } = window.require('electron');


class Input extends React.Component {
    render() {
        return (
            <div className={styles.input_parent}>
                <div className={styles.input_unit_parent}>
                    <p className={styles.input_unit_text}>mm</p>
                </div>
                <div className={styles.input_content_parent}>
                    <input className={styles.input_content}></input>
                </div>
            </div>
        );
    }
}

class RowItem extends React.Component {
    render() {
        return (
            <div className={styles.rowItem}>
                <p className={styles.rowText}></p>
                <Input></Input>
            </div>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <button className={(this.props.stress)?styles.buttonStress:styles.button} onClick={()=>{this.props.onClick()}}>{this.props.text}</button>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div className={styles.contentView}>
                <div className={styles.contentHeader}>
                    <p className={styles.content_header_text}>单位转换</p>
                </div>
                <div className={styles.contentBody}>
                    <RowItem></RowItem>
                </div>
                <div className={styles.contentFooter}>
                    <Button text="转换" stress={true} onClick={()=>{}}></Button>
                    <Button text="关闭" stress={false} onClick={()=>{remote.getCurrentWindow().close()}}></Button>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className={styles.mainView}>
                <Content></Content>
            </div>
        );
    }
}

export default App;

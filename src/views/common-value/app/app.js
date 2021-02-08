import React from 'react';
import styles from './app.module.css';
// const { remote } = window.require('electron');

class Content extends React.Component {

    render() {
        return (
            <div className={styles.contentView}>
                <div className={styles.contentHeader}>
                    <p className={styles.content_header_text}>常用值查询</p>
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

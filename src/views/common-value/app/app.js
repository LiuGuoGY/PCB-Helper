import React from 'react';
import styles from './app.module.css';
const { remote } = window.require('electron');

class Menu extends React.Component {
    render() {
        let elements = []
        for(let i = 0; i < this.props.menus.length; i++) {
            elements.push(<button className={(this.props.index === i)?styles.menuElement:styles.menuElementUnselected}
                                onClick={()=>{this.props.onClick(i)}}>{this.props.menus[i]}</button>)
            if(i < this.props.menus.length - 1) {
                elements.push(<div className={styles.separator} hidden={(this.props.index === i || this.props.index === (i+1))}></div>)
            }
        }
        return (
        <div className={styles.menu}>
            {elements}
        </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        let menus = ["电阻", "电容", "电感"]
        this.state = {
            menuIndex: 0,
            menus: menus
        }
    }

    handleClick(index) {
        this.setState({
            menuIndex: index
        })
    }

    render() {
        return (
            <div className={styles.contentView}>
                <div className={styles.contentHeader}>
                    <div className={styles.dividing_line}></div>
                    <div className={styles.contentTitleContent}>
                        <p className={styles.content_header_text}>常用值查询</p>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.content}>
                        
                    </div>
                    <Menu menus={this.state.menus} index={this.state.menuIndex} onClick={(index)=>{this.handleClick(index)}}></Menu>
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

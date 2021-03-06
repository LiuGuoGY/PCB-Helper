import React from 'react';
import styles from './app.module.css';

//---class---
import PageStart from "../pages/start/start"
import PageAccess from "../pages/access/access"

//---icon---
import iconPCBCheck from "../assets/icon-basic.png"  //#6F6B6D
import iconRuleSet from "../assets/icon-xiezi.png"
import iconBasic from "../assets/icon-chizi.png"
import iconFlash from "../assets/icon-shandian.png"


// const Electron = require("electron");

class MenuTitle extends React.Component {
    render() {
        return (
            <p className={styles.menuTitle}>{this.props.value}</p>
        );
    }
}

class MenuButton extends React.Component {
    render() {
        return (
            <button className={(this.props.focus)?styles.menuButtonFocus:styles.menuButtonUnfocus} onClick={()=>this.props.onClick(this.props.index)}>
                <div className={styles.menuButtonContent}>
                    <img src={this.props.value.img} alt="icon" className={styles.menuButtonIcon}></img>
                    <p className={styles.menuButtonText}>{this.props.value.text}</p>
                </div>
            </button>
        );
    }
}

class Menu extends React.Component {
    render() {
        let elements = []
        let data = this.props.value;
        let id = 0;
        for(let i = 0; i < data.length; i++) {
            if(data[i].title) {
                elements.push(<MenuTitle value={data[i].title} key={data[i].title}></MenuTitle>)
            }
            for(let j = 0; j < data[i].items.length; j++) {
                elements.push(<MenuButton focus={(this.props.index === id)} value={data[i].items[j]} index={id} key={data[i].items[j].text} onClick={(x)=>this.props.onClick(x)}></MenuButton>)
                id++;
            }
        }
        return (
            <div className={styles.menuParent}>
                <div style={{width: "100%", height:"50px"}}></div>
                {elements}
            </div>
        );
    }
}

class Content extends React.Component {

    renderElement(element, index) {
        return (
            <div style={{display:(this.props.index === index)?"block":"none"}} className={styles.contentElement}>
                {element}
            </div>
        );
    }

    render() {
        return (
            <div className={styles.contentParent}>
                {this.renderElement(<PageStart ></PageStart>, 0)}
                {this.renderElement(<PageAccess ></PageAccess>, 1)}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let menus = [{
            items: [{
                img: iconFlash,
                text: "快速开始"
            }]
        },{
            title: "基础",
            items: [{
                img: iconBasic,
                text: "辅助功能"
            }]
        },{
            title: "PCB",
            items: [{
                img: iconRuleSet,
                text: "规则设置"
            },{
                img: iconPCBCheck,
                text: "检查清单"
            }]
        }]
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
            <div className={styles.mainView}>
                <div className={styles.menuView}>
                    <Menu value={this.state.menus} index={this.state.menuIndex} onClick={(index)=>this.handleClick(index)}></Menu>
                </div>
                <div className={styles.contentView}>
                    <Content index={this.state.menuIndex}/>
                </div>
            </div>
        );
    }
}

export default App;
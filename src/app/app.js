import React from 'react';
import "./app.css"
import iconPCBCheck from "../assets/icon-basic.png"  //#6F6B6D
import iconRuleSet from "../assets/icon-xiezi.png"
import iconBasic from "../assets/icon-chizi.png"
import iconFlash from "../assets/icon-shandian.png"


// const Electron = require("electron");

class MenuTitle extends React.Component {
    render() {
        return (
            <p className="menuTitle">{this.props.value}</p>
        );
    }
}

class MenuButton extends React.Component {
    render() {
        return (
            <button className="menuButton" onClick={()=>this.props.onClick()}>
                <div className="menuButtonContent">
                    <img src={this.props.value.img} alt="icon" className="menuButtonIcon"></img>
                    <p className="menuButtonText">{this.props.value.text}</p>
                </div>
            </button>
        );
    }
}

class Menu extends React.Component {
    render() {
        let elements = []
        let data = this.props.value;
        for(let i = 0; i < data.length; i++) {
            if(data[i].title) {
                elements.push(<MenuTitle value={data[i].title}></MenuTitle>)
            }
            for(let j = 0; j < data[i].items.length; j++) {
                elements.push(<MenuButton value={data[i].items[j]} onClick={()=>this.props.onClick()}></MenuButton>)
            }
        }
        return (
            <div className="menuParent">
                <div style={{width: "100%", height:"50px"}}></div>
                {elements}
            </div>
        );
    }
}

// class TextA extends React.Component {
//     render() {
//         return (
//             <div></div>
//         );
//     }
// }

class Content extends React.Component {
    render() {
        return (
            <div></div>
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
            title: "Basic",
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

    handleClick() {
        // alert("点了");
    }

    render() {
        return (
            <div className="mainView">
                <div className="menuView">
                    <Menu value={this.state.menus} onClick={()=>this.handleClick()}></Menu>
                </div>
                <div className="contentView">
                    <Content />
                </div>
            </div>
        );
    }
}

export default App;
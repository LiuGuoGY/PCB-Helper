import React from 'react';
import "./app.css"
import iconBasic from "../assets/icon-basic.png"  //#6F6B6D

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
            <button className="menuButton">
                <div className="menuButtonContent">
                    <img src={iconBasic} alt="icon" className="menuButtonIcon"></img>
                    <p className="menuButtonText">基础功能</p>
                </div>
            </button>
        );
    }
}

class Menu extends React.Component {
    render() {
        return (
            <div className="menuParent">
                <div style={{width: "100%", height:"50px"}}></div>
                <MenuTitle value="功能"></MenuTitle>
                <MenuButton></MenuButton>
                <MenuButton></MenuButton>
                <MenuTitle value="帮助"></MenuTitle>
                <MenuButton></MenuButton>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="mainView">
                <div className="menuView">
                    <Menu />
                </div>
                <div className="contentView">
                    <Content />
                </div>
            </div>
        );
    }
}

export default App;
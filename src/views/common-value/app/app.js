import React from 'react';
import styles from './app.module.css';
import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"
import iconSearch from "../../../assets/icon/search.svg"
import iconDelete from "../../../assets/icon/delete.svg"
const { remote } = window.require('electron');

class Menu extends React.Component {
    render() {
        let elements = []
        for(let i = 0; i < this.props.menus.length; i++) {
            elements.push(<button className={(this.props.index === i)?styles.menuElement:styles.menuElementUnselected}
                onClick={()=>{this.props.onClick(i)}} key={this.props.menus[i]}>{this.props.menus[i]}</button>)
            if(i < this.props.menus.length - 1) {
                elements.push(<div className={styles.separator} 
                    style={{visibility:(this.props.index === i || this.props.index === (i+1))?"hidden":"visible"}}
                    key={"separator" + i}></div>)
            }
        }
        return (
        <div className={styles.menu}>
            {elements}
        </div>
        );
    }
}



class PageRes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    handleSearchChange(event) {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className={styles.pageContentParent}>
                <div className={styles.pageContentLeft}>
                    <div className={styles.searchFieldParent}>
                        <div className={styles.searchField}>
                            <input value={this.state.text} style={{backgroundImage: `url(${iconSearch})`}} placeholder="搜索" onChange={(event)=>this.handleSearchChange(event)}/>
                            {this.state.text !== '' && 
                            <button onClick={()=>{this.setState({text: ""})}}>
                                <img src={iconDelete} alt="delete"></img>
                            </button>}
                        </div>
                    </div>
                </div>
                <div className={styles.pageContentRight}></div>
            </div>
        );
    }
}

class Content extends React.Component {
    renderElement(element, index) {
        return (
            <div style={{display:(this.props.index === index)?"flex":"none"}} className={styles.contentElement}>
                {element}
            </div>
        );
    }

    render() {
        return (
            <div className={styles.content}>
                {this.renderElement(<PageRes ></PageRes>, 0)}
            </div>
        );
    }
}

class Main extends React.Component {
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
                    <Content index={this.state.menuIndex}></Content>
                    <Menu menus={this.state.menus} index={this.state.menuIndex} onClick={(index)=>{this.handleClick(index)}}></Menu>
                </div>
            </div>
        );
    }
}

class TitleButton extends React.Component {
    render() {
        return (
            <button className={styles.titleElementButton} onClick={()=>this.props.onClick()}>
                <img src={this.props.src} alt="icon" className={styles.titleElement}></img>
            </button>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className={styles.mainView}>
                <Main></Main>
                <div className={styles.titleView} style={{display:(remote.process.platform === "darwin")?"none":"flex"}}>
                    <TitleButton src={iconMinimize} onClick={()=>{remote.getCurrentWindow().minimize()}}></TitleButton>
                    <TitleButton src={iconClose} onClick={()=>{remote.getCurrentWindow().close()}}></TitleButton>
                </div>
            </div>
        );
    }
}

export default App;

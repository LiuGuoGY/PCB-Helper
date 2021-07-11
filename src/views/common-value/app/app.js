import React from 'react';
import styles from './app.module.css';
import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"
import iconSearch from "../../../assets/icon/search.svg"
import iconDelete from "../../../assets/icon/delete.svg"
import iconChoiceYes from "../../../assets/icon/choice_yes.svg"
import iconChoiceNo from "../../../assets/icon/choice_no.svg"
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

class SearchBar extends React.Component {
    render() {
        return (
            <div className={styles.searchField}>
                <input value={this.props.text} style={{backgroundImage: `url(${iconSearch})`}} placeholder={this.props.placeholder} onChange={(event)=>this.props.onClick(event.target.value)}/>
                {this.props.text !== '' && 
                <button onClick={()=>{this.props.onClear()}}>
                    <img src={iconDelete} alt="delete"></img>
                </button>}
            </div>
        );
    }
}

class RadioGroup extends React.Component {
    render() {
        let optionElements = []
        for(let i = 0; i < this.props.options.length; i++) {
            optionElements.push(
                <button key={this.props.options[i]} onClick={()=>{this.props.onClick(i)}}>
                    <img src={(this.props.index === i)?iconChoiceYes:iconChoiceNo} alt="option"></img>
                    <p>{this.props.options[i]}</p>
                </button>
            );
        }
        return (
            <div className={styles.radioField}>
                {optionElements}
            </div>
        );
    }
}

class PageRes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            unitSelectsText: ["全部", "Ω", "kΩ", "MΩ"],
            unitSelectIndex: 0,
            accuracySelectsText: ["全部", "1%", "5%"],
            accuracySelectsIndex: 0
        }
    }

    handleSearchChange(text) {
        this.setState({text: text});
    }

    handleSearchClear() {
        this.setState({text: ""});
    }

    handleUnitClick(index) {
        this.setState({unitSelectIndex: index});
    }

    handleAccuracyClick(index) {
        this.setState({accuracySelectsIndex: index});
    }

    render() {
        return (
            <div className={styles.pageContentParent}>
                <div className={styles.pageContentLeft}>
                    <div className={styles.searchFieldParent}>
                        <SearchBar text={this.state.text} 
                            placeholder="搜索" 
                            onClick={(text)=>{this.handleSearchChange(text)}} 
                            onClear={()=>{this.handleSearchClear()}}></SearchBar>
                    </div>
                    <div className={styles.radioFieldParent}>
                        <p >单位：</p>
                        <div ></div>
                        <RadioGroup options={this.state.unitSelectsText} index={this.state.unitSelectIndex} onClick={(i)=>{this.handleUnitClick(i)}}></RadioGroup>
                    </div>
                    <div style={{height: "20px", width: "80%"}}>
                        <div className={styles.dividing_line}></div>
                    </div>
                    <div className={styles.radioFieldParent}>
                        <p >精度：</p>
                        <div ></div>
                        <RadioGroup options={this.state.accuracySelectsText} index={this.state.accuracySelectsIndex} onClick={(i)=>{this.handleAccuracyClick(i)}}></RadioGroup>
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

import React from 'react';
import SVG from 'react-inlinesvg';

import styles from './app.module.css';
import '../../../components/styles/common.css';

import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"
import iconSearch from "../../../assets/icon/search.svg"
import iconDelete from "../../../assets/icon/delete.svg"
import iconChoiceYes from "../../../assets/icon/choice_yes.svg"
import iconChoiceNo from "../../../assets/icon/choice_no.svg"
import dataJson from "../../../data/common-values.json"
const remote = window.require('@electron/remote');

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
                <input value={this.props.text} style={{backgroundImage: `url(${iconSearch})`}} placeholder={this.props.placeholder} onChange={(event)=>this.props.onChange(event.target.value)}/>
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

class ValueList extends React.Component {
    render() { 
        let listElements = []
        let data050 = dataJson.res.R050;
        let data010 = dataJson.res.R010;
        let searchText = this.props.searchText.toLowerCase();
        let searchNum = 0;
        if(searchText && searchText.length > 0 && searchText !== "") {
            let indexK = searchText.indexOf("k");
            let indexM = searchText.indexOf("m");
            if(indexK >= 0) {
                searchNum = (parseFloat(searchText.slice(0, indexK)) + parseFloat("0." + searchText.slice(indexK + 1, searchText.length))) * 1000;
            } else if(indexM >= 0) {
                searchNum = (parseFloat(searchText.slice(0, indexM)) + parseFloat("0." + searchText.slice(indexM + 1, searchText.length))) * 1000000;
            } else {
                searchNum = parseFloat(searchText);
            }
        }
        for(let j = 0; j < 2; j++) {
            let array = [];
            let accuracyText = "";
            if(this.props.accuracySelectsIndex === 0) {
                if(j === 0) {
                    array = data050;
                    accuracyText = "5%";
                } else if(j === 1) {
                    array = data010;
                    accuracyText = "1%";
                }
            } else if(this.props.accuracySelectsIndex === 1) {
                array = data010;
                accuracyText = "1%";
                if(j > 0) break;
            } else if(this.props.accuracySelectsIndex === 2) {
                array = data050;
                accuracyText = "5%";
                if(j > 0) break;
            }
            
            for(let i = 0; i < array.length; i++) {
                if(this.props.unitSelectIndex === 1) {
                    if(array[i] >= 1000) {
                        continue;
                    }
                } else if(this.props.unitSelectIndex === 2) {
                    if(array[i] < 1000 || array[i] >= 1000000) {
                        continue;
                    }
                } else if(this.props.unitSelectIndex === 3) {
                    if(array[i] < 1000000) {
                        continue;
                    }
                }
                let text = "" + array[i];
                if(array[i] >= 1000000) {
                    text = (array[i] / 1000000) + "M";
                } else if(array[i] >= 1000) {
                    text = (array[i] / 1000) + "k";
                }
                listElements.push(
                    <div key={accuracyText + array[i]} className={(i%2)?styles.valueListItemLight:styles.valueListItemGray}>
                        <p className={styles.valueListItemText}>{text}</p>
                        <div className={styles.dividing_line_column_dark}></div>
                        <p className={styles.valueListItemText}>{accuracyText}</p>
                    </div>
                );
            }
        }
        return (
            <div className={styles.valueList}>
                {listElements}
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
        if(text != "") {
            
        }
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

    scrollToOffset(offset) {
        document.querySelector("#resList").scroll({
            top: offset,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div className={styles.pageContentParent}>
                <div className={styles.pageContentLeft}>
                    <div className={styles.searchFieldParent}>
                        <SearchBar text={this.state.text} 
                            placeholder="搜索" 
                            onChange={(text)=>{this.handleSearchChange(text)}} 
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
                <div className={styles.pageContentRight}>
                    <div className={styles.resultListParent}>
                        <div className={styles.resultListHeaderParent}>
                            <p >值</p>
                            <div style={{height: "60%", width: "1px"}}>
                                <div className={styles.dividing_line_column}></div>
                            </div>
                            <p >精度</p>
                            <div style={{height: "60%", width: "1px"}}>
                                <div className={styles.dividing_line_column}></div>
                            </div>
                        </div>
                        <div className={styles.resultListContentParent} id="resList">
                            <ValueList unitSelectIndex={this.state.unitSelectIndex} 
                                accuracySelectsIndex={this.state.accuracySelectsIndex} 
                                searchText={this.state.text}></ValueList>
                        </div>
                    </div>
                </div>
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

class App extends React.Component {
    render() {
        return (
            <div className={styles.mainView}>
                <Main></Main>
                <div className={styles.titleView} style={{display:(remote.process.platform === "darwin")?"none":"flex"}}>
                    <button className={styles.titleElementButton} onClick={()=>{remote.getCurrentWindow().minimize()}}>
                        <SVG src={iconMinimize} alt="icon" className={styles.titleElement}></SVG>
                    </button>
                    <button className={styles.titleElementCloseButton} onClick={()=>{remote.getCurrentWindow().close()}}>
                        <SVG src={iconClose} alt="icon" className={styles.titleCloseElement}></SVG>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;

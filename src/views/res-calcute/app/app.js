import React from 'react';
import SVG from 'react-inlinesvg';

import styles from './app.module.css';
import '../../../components/styles/common.css';
import {useTextField} from 'react-aria';
import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"
import iconWenHao from "../../../assets/icon/wenhao.svg"
import imageCircute from "../assets/circuit.png"
import imageUpDown from "../../../assets/icon/updown.svg"

const remote = window.require('@electron/remote');

function TextField(props) {
    let {label, ...restProps} = props;
    let ref = React.useRef();
    let {labelProps, inputProps} = useTextField(props, ref);
  
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: 200}}>
        <label {...labelProps}>{label}</label>
        <input {...inputProps} {...restProps} ref={ref} />
      </div>
    );
  }

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    onKeyUp(e) {
        if(e.keyCode === 13) {
            this.props.enter();
        }
    }

    render() {
        return (
            <div className={styles.input_parent}>
                <TextField className={styles.input} 
                        aria-label="Input"
                        type="number" 
                        placeholder="请输入数字"
                        value={this.props.value} 
                        onChange={this.handleChange} 
                        onKeyUp={this.onKeyUp}></TextField>
            </div>
        );
    }
}

class PopUpButton extends React.Component {
    render() {
        return (
            <button className={styles.popUpButtonView}>
                <div className={styles.popUpButtonRightContent}>
                    <SVG className={styles.popUpButtonRightIcon} src={imageUpDown}></SVG>
                </div>
                <div className={styles.popUpButtonLeftContent}>
                    <p>{this.props.text}</p>
                </div>
            </button>
        );
    }
}

class InputItem extends React.Component {
    render() {
        return (
            <div className={styles.input_item_parent}>
                <Input value={this.props.value} onChange={(value)=>{this.props.onChange(value)}} enter={()=>this.props.enter()}></Input>
            </div>
        );
    }
}

class HelpButton extends React.Component {
    render() {
        return (
            <button className={styles.howButton} onClick={()=>{this.props.onClick()}}>
                <img src={iconWenHao} alt="help"></img>
            </button>
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

class ValueList extends React.Component {
    render() { 
        let listElements = []
        let array = this.props.array;
        for(let i = 0; i < array.length; i++) {
            listElements.push(
                <div key={"" + array[i]} className={(i%2)?styles.valueListItemLight:styles.valueListItemGray}>
                    {/* <p className={styles.valueListItemText}>{text}</p>
                    <div className={styles.dividing_line_column_dark}></div>
                    <p className={styles.valueListItemText}>{array[i]}</p> */}
                </div>
            );
        }
        return (
            <div className={styles.valueList}>
                {listElements}
            </div>
        );
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            r1DividedByR2: 0,
            magnitudeTexts: ["1K", "10K", "100K", "1M"],
            magnitudeIndex: 0,
            knowVoltageTexts: ["V1", "V2"],
            knowVoltageIndex: 0
        }
    }

    render() {
        return (
            <div className={styles.contentView}>
                <div className={styles.contentHeader}>
                    <div className={styles.dividing_line}></div>
                    <div className={styles.contentTitleContent}>
                        <p className={styles.content_header_text}>电阻配比</p>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.focusContent}>
                        <div className={styles.imgContent}>
                            <img alt="circuit" src={imageCircute}></img>
                        </div>
                        <div className={styles.calContent}>
                            {/* <div className={styles.calContentTitle}>
                                <p>已知参数：</p>
                            </div> */}
                            <div className={styles.calContentRows}>
                                <p className={styles.calContentRowsLeftTitle}>R1 / R2：</p>
                                <InputItem onChange={(text)=>{this.setState({r1DividedByR2: parseFloat(text)})}} enter={()=>{}}> </InputItem>
                            </div>
                            <div className={styles.calContentRows}>
                                <p className={styles.calContentRowsLeftTitle}>R1、R2 数量级：</p>
                                <PopUpButton text={this.state.magnitudeTexts[this.state.magnitudeIndex]}></PopUpButton>
                            </div>
                            <div className={styles.calContentRows}>
                                <p className={styles.calContentRowsLeftTitle}>已知参数：</p>
                                <PopUpButton text={this.state.knowVoltageTexts[this.state.knowVoltageIndex]}></PopUpButton>
                            </div>
                            <div className={styles.calContentRows}>
                                <p className={styles.calContentRowsLeftTitle}>已知电压：</p>
                                <InputItem onChange={(text)=>{this.setState({r1DividedByR2: parseFloat(text)})}} enter={()=>{}}> </InputItem>
                                <p className={styles.calContentRowsRightText}>V</p>
                            </div>
                            {/* <div className={styles.calContentTitle}>
                                <p>计算结果：</p>
                            </div> */}
                            <div className={styles.resultListParent}>
                                <div className={styles.resultListHeaderParent}>
                                    <p >R1</p>
                                    <div style={{height: "60%", width: "1px"}}>
                                        <div className={styles.dividing_line_column}></div>
                                    </div>
                                    <p >R2</p>
                                    <div style={{height: "60%", width: "1px"}}>
                                        <div className={styles.dividing_line_column}></div>
                                    </div>
                                    <p >V1</p>
                                    <div style={{height: "60%", width: "1px"}}>
                                        <div className={styles.dividing_line_column}></div>
                                    </div>
                                    <p >V2</p>
                                    <div style={{height: "60%", width: "1px"}}>
                                        <div className={styles.dividing_line_column}></div>
                                    </div>
                                </div>
                                <div className={styles.resultListContentParent}>
                                    <ValueList array={[]}></ValueList>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentFooter}>
                        <Button text="计算" stress={true} onClick={()=>{}}></Button>
                        <Button text="关闭" stress={false} onClick={()=>{remote.getCurrentWindow().close()}}></Button>
                        <div>
                            <HelpButton onClick={()=>{alert("1mm ≈ 39.37mil")}}></HelpButton>
                        </div>
                    </div>
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

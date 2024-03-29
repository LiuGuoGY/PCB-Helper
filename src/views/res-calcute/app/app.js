import React from 'react';
import SVG from 'react-inlinesvg';

import styles from './app.module.css';
import '../../../components/styles/common.css';
import { useTextField } from 'react-aria';
import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"
import iconWenHao from "../../../assets/icon/wenhao.svg"
import imageCircute from "../assets/circuit_1.svg"
import imageUpDown from "../../../assets/icon/updown.svg"
import imageYes from "../../../assets/icon/yes.svg"
import dataJson from "../../../data/common-values.json"

const remote = window.require('@electron/remote');

function TextField(props) {
    let { label, ...restProps } = props;
    let ref = React.useRef();
    let { labelProps, inputProps } = useTextField(props, ref);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
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
        if (e.keyCode === 13) {
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
    constructor(props) {
        super(props);
        this.state = {
            isShowList: false
        }
    }
    render() {
        let textList = this.props.textList;
        let viewArray = [];
        for (let i = 0; i < textList.length; i++) {
            viewArray.push(
                <div className={styles.popUpButtonPopListItem} key={textList[i]} onClick={() => { this.props.onItemChange(i); this.setState({ isShowList: false }) }}>
                    <SVG className={styles.popUpButtonPopListItemIcon} alt="icon" src={imageYes} style={{ visibility: (this.props.choiceIndex === i) ? "visible" : "hidden" }}></SVG>
                    <p>{textList[i]}</p>
                </div>
            )
        }
        return (
            <div className={styles.popUpButtonViewParent}>
                <button className={styles.popUpButtonView} onClick={() => { this.setState({ isShowList: true }) }}>
                    <div className={styles.popUpButtonRightContent}>
                        <SVG className={styles.popUpButtonRightIcon} src={imageUpDown} ></SVG>
                    </div>
                    <div className={styles.popUpButtonLeftContent}>
                        <p>{this.props.textList[this.props.choiceIndex]}</p>
                    </div>
                </button>
                <div className={styles.popUpButtonPopListBackgroud} style={{ display: (this.state.isShowList) ? "block" : "none" }} onMouseDown={() => { this.setState({ isShowList: false }) }}></div>
                <div className={styles.popUpButtonPopList} style={{ display: (this.state.isShowList) ? "flex" : "none", height: (this.props.textList.length * 22 + 10 + "px") }}>
                    {viewArray}
                </div>
            </div>
        );
    }
}

class InputItem extends React.Component {
    render() {
        return (
            <div className={styles.input_item_parent}>
                <Input value={this.props.value} onChange={(value) => { this.props.onChange(value) }} enter={() => this.props.enter()}></Input>
            </div>
        );
    }
}

class HelpButton extends React.Component {
    render() {
        return (
            <button className={styles.howButton} onClick={() => { this.props.onClick() }}>
                <img src={iconWenHao} alt="help"></img>
            </button>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <button className={(this.props.stress) ? styles.buttonStress : styles.button} onClick={() => { this.props.onClick() }}>{this.props.text}</button>
        );
    }
}

class ValueList extends React.Component {
    render() {
        let listElements = []
        let array = this.props.array;
        for (let i = 0; i < array.length; i++) {
            let className = styles.valueListItemLight;
            if(i === this.props.stressIndex) {
                className = styles.valueListItemStress;
            } else if(i%2 === 0) {
                className = styles.valueListItemLight;
            } else {
                className = styles.valueListItemGray;
            }
            listElements.push(
                <div key={"" + array[i]} className={className} onClick={()=>{this.props.onSelect(i)}}>
                    <p className={styles.valueListItemText}>{array[i].R1}</p>
                    <div className={styles.dividing_line_column_dark}></div>
                    <p className={styles.valueListItemText}>{array[i].R2}</p>
                    <div className={styles.dividing_line_column_dark}></div>
                    <p className={styles.valueListItemText}>{array[i].V1}</p>
                    <div className={styles.dividing_line_column_dark}></div>
                    <p className={styles.valueListItemText}>{array[i].V2}</p>
                    <div className={styles.dividing_line_column_dark}></div>
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
            //参数
            knowScaleTexts: ["R1 / R2", "V1 / V2"],
            knowScaleIndex: 0,
            knowScaleValue: "",
            magnitudeTexts: ["1K", "10K", "100K", "1M"],
            magnitudeIndex: 0,
            knowVoltageTexts: ["V1", "V2"],
            knowVoltageIndex: 0,
            knowVoltageValue: "",
            resultArray: [],

            //电路图
            text_V1: "V1",
            text_V2: "V2",
            text_R1: "R1",
            text_R2: "R2",

            //结果列表
            showIndex: 0,
        }
    }

    numToUnitString(num) {
        let text = "" + num;
        if (num >= 1000000) {
            text = (num / 1000000) + " M";
        } else if (num >= 1000) {
            text = (num / 1000) + " K";
        }
        return text;
    }

    calCulateResult() {
        let data010 = dataJson.res.R010;
        let sumMin, sumMax = 0;
        let resultArray = [];
        let scale = (this.state.knowScaleIndex === 0) ? (this.state.knowScaleValue) : (this.state.knowScaleValue - 1);
        
        if(this.state.knowScaleValue === "" || this.state.knowVoltageValue === "") {
            return ;
        }

        switch (this.state.magnitudeIndex) {
            case 0: sumMin = 1000; sumMax = 10000; break;
            case 1: sumMin = 10000; sumMax = 100000; break;
            case 2: sumMin = 100000; sumMax = 1000000; break;
            case 3: sumMin = 1000000; sumMax = 10000000; break;
            default: break;
        }

        //挑出符合要求的配比
        for (let i = 0; i < data010.length; i++) {
            for (let j = 0; j < data010.length; j++) {
                if ((data010[i] + data010[j] < sumMin) || (data010[i] + data010[j] > sumMax)) {
                    continue;
                }
                let divisor = data010[i] / data010[j];

                if (divisor < scale * 1.1 && divisor > scale * 0.9) { //R1:R2 
                    resultArray.push({
                        R1: this.numToUnitString(data010[i]),
                        R2: this.numToUnitString(data010[j]),
                        V1: (this.state.knowVoltageIndex === 0) ? ("" + this.state.knowVoltageValue) : (this.state.knowVoltageValue / data010[j] * (data010[i] + data010[j])).toFixed(2), //
                        V2: (this.state.knowVoltageIndex === 1) ? ("" + this.state.knowVoltageValue) : (this.state.knowVoltageValue * data010[j] / (data010[i] + data010[j])).toFixed(2), //
                        accuracy: Math.abs(divisor - scale),
                    })

                }
            }
        }

        //按照准确度排序
        resultArray.sort(function (a, b) { return a.accuracy - b.accuracy });

        if(resultArray.length > 0) {
            this.setState({
                resultArray: resultArray,
                showIndex: 0,
                text_V1: resultArray[0].V1 + " V",
                text_V2: resultArray[0].V2 + " V",
                text_R1: resultArray[0].R1,
                text_R2: resultArray[0].R2,
            })
        }
    }

    selectResult(index) {
        if(this.state.resultArray.length > 0 && index >= 0) {
            this.setState({
                showIndex: index,
                text_V1: this.state.resultArray[index].V1 + " V",
                text_V2: this.state.resultArray[index].V2 + " V",
                text_R1: this.state.resultArray[index].R1,
                text_R2: this.state.resultArray[index].R2,
            })
        }
    }

    clearAll() {
        this.setState({
            //参数
            knowScaleIndex: 0,
            knowScaleValue: "",
            magnitudeIndex: 0,
            knowVoltageIndex: 0,
            knowVoltageValue: "",
            resultArray: [],

            //电路图
            text_V1: "V1",
            text_V2: "V2",
            text_R1: "R1",
            text_R2: "R2",

            //结果列表
            showIndex: 0,
        })
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
                    <div className={styles.focusContentParent}>
                        <div className={styles.imgContent}>
                            <SVG className={styles.imageCircute} alt="circuit" src={imageCircute}></SVG>
                            <p className={styles.textV1}>{this.state.text_V1}</p>
                            <p className={styles.textV2}>{this.state.text_V2}</p>
                            <p className={styles.textR1}>{this.state.text_R1}</p>
                            <p className={styles.textR2}>{this.state.text_R2}</p>
                        </div>
                        <div className={styles.focusContent}>
                            <div className={styles.calContent}>
                                <div className={styles.calContentRowsBlank}></div>
                                <div className={styles.calContentRows}>
                                    <p className={styles.calContentRowsLeftTitle}>已知：</p>
                                    <PopUpButton textList={this.state.knowScaleTexts} choiceIndex={this.state.knowScaleIndex} onItemChange={(i) => { this.setState({ knowScaleIndex: i }) }}></PopUpButton>
                                </div>
                                <div className={styles.calContentRows}>
                                    <p className={styles.calContentRowsLeftTitle}>值：</p>
                                    <InputItem value={this.state.knowScaleValue} onChange={(text) => { this.setState({ knowScaleValue: parseFloat(text) }) }}> </InputItem>
                                </div>
                                <div className={styles.calContentRows}>
                                    <p className={styles.calContentRowsLeftTitle}>R1+R2 数量级：</p>
                                    <PopUpButton textList={this.state.magnitudeTexts} choiceIndex={this.state.magnitudeIndex} onItemChange={(i) => { this.setState({ magnitudeIndex: i }) }}></PopUpButton>
                                </div>
                                <div className={styles.calContentRows}>
                                    <p className={styles.calContentRowsLeftTitle}>已知电压：</p>
                                    <PopUpButton textList={this.state.knowVoltageTexts} choiceIndex={this.state.knowVoltageIndex} onItemChange={(i) => { this.setState({ knowVoltageIndex: i }) }}></PopUpButton>
                                </div>
                                <div className={styles.calContentRows}>
                                    <p className={styles.calContentRowsLeftTitle}>值：</p>
                                    <InputItem value={this.state.knowVoltageValue} onChange={(text) => { this.setState({ knowVoltageValue: parseFloat(text) }) }}> </InputItem>
                                    <p className={styles.calContentRowsRightText}>V</p>
                                </div>
                                <div className={styles.calContentRowsBlank}></div>
                                <div className={styles.resultListParent}>
                                    <div className={styles.resultListHeaderParent}>
                                        <p >R1</p>
                                        <div style={{ height: "60%", width: "1px" }}>
                                            <div className={styles.dividing_line_column}></div>
                                        </div>
                                        <p >R2</p>
                                        <div style={{ height: "60%", width: "1px" }}>
                                            <div className={styles.dividing_line_column}></div>
                                        </div>
                                        <p >V1</p>
                                        <div style={{ height: "60%", width: "1px" }}>
                                            <div className={styles.dividing_line_column}></div>
                                        </div>
                                        <p >V2</p>
                                        <div style={{ height: "60%", width: "1px" }}>
                                            <div className={styles.dividing_line_column}></div>
                                        </div>
                                    </div>
                                    <div className={styles.resultListContentParent}>
                                        <ValueList array={this.state.resultArray} stressIndex={this.state.showIndex} 
                                            onSelect={(i)=>{this.selectResult(i)}}></ValueList>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentFooter}>
                        <Button text="计算" stress={true} onClick={() => { this.calCulateResult() }}></Button>
                        <Button text="清空" stress={false} onClick={() => { this.clearAll() }}></Button>
                        <div>
                            <HelpButton onClick={() => { alert("根据已知参数，自动计算匹配的电阻。\n结果按照准确度从高到低排序。") }}></HelpButton>
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
                <div className={styles.titleView} style={{ display: (remote.process.platform === "darwin") ? "none" : "flex" }}>
                    <button className={styles.titleElementButton} onClick={() => { remote.getCurrentWindow().minimize() }}>
                        <SVG src={iconMinimize} alt="icon" className={styles.titleElement}></SVG>
                    </button>
                    <button className={styles.titleElementCloseButton} onClick={() => { remote.getCurrentWindow().close() }}>
                        <SVG src={iconClose} alt="icon" className={styles.titleCloseElement}></SVG>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;

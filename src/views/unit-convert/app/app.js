import React from 'react';
import styles from './app.module.css';
import {useTextField} from 'react-aria';
import iconMinimize from "../../../assets/icon/minimize.svg"
import iconClose from "../../../assets/icon/shut.svg"

const { remote } = window.require('electron');

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
                <div className={styles.input_parent_middle}>
                    {/* <input  className={styles.input} 
                            type="number" 
                            placeholder="请输入数字" 
                            value={this.props.value} 
                            onChange={this.handleChange} 
                            onKeyUp={this.onKeyUp}>
                    </input> */}
                    <TextField className={styles.input} 
                            type="number" 
                            placeholder="请输入数字"
                            value={this.props.value} 
                            onChange={this.handleChange} 
                            onKeyUp={this.onKeyUp}></TextField>
                </div>
            </div>
        );
    }
}

class InputItem extends React.Component {
    render() {
        return (
            <div className={styles.input_item_parent}>
                <p className={styles.input_item_text}>{this.props.text}</p>
                <Input value={this.props.value} onChange={(value)=>{this.props.onChange(value)}} enter={()=>this.props.enter()}></Input>
                <p className={styles.input_unit_text}>{this.props.unit}</p>
            </div>
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

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: Array(4).fill("")
        }
    }

    clearOthers(index, value) {
        let values = this.state.values.slice();
        for(let i = 0; i < this.state.values.length; i++) {
            if(i !== index) {
                values[i] = "";
            } else {
                values[i] = value;
            }
        }
        this.setState({
            values: values
        })
    }

    calculateAll() {
        let values = this.state.values.slice();
        let value = 0;
        for(let i = 0; i < this.state.values.length; i++) {
            if(values[i] !== "") {
                switch(i) {
                    case 0: value = parseFloat(values[0]);break;
                    case 1: value = parseFloat(values[1]) * 10;break;
                    case 2: value = parseFloat(values[2]) * 0.0254;break;
                    case 3: value = parseFloat(values[3]) * 25.4;break;
                    default: break;
                }
                break;
            }
        }

        values[0] = value;
        values[1] = value * 0.1;
        values[2] = value / 0.0254;
        values[3] = value / 25.4;
        for(let i = 0; i < this.state.values.length; i++) {
            values[i] = Number(values[i].toFixed(5).toString()).toString();
        }
        this.setState({
            values: values
        })
    }

    render() {
        return (
            <div className={styles.contentView}>
                <div className={styles.contentHeader}>
                    <div className={styles.dividing_line}></div>
                    <div className={styles.contentTitleContent}>
                        <p className={styles.content_header_text}>单位转换</p>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.calculateContent}>
                        <InputItem text="长度1：" unit="mm" value={this.state.values[0]} onChange={(value)=>{this.clearOthers(0, value)}} enter={()=>{this.calculateAll()}}></InputItem>
                        <InputItem text="长度2：" unit="cm" value={this.state.values[1]} onChange={(value)=>{this.clearOthers(1, value)}} enter={()=>{this.calculateAll()}}></InputItem>
                        <InputItem text="长度3：" unit="mil" value={this.state.values[2]} onChange={(value)=>{this.clearOthers(2, value)}} enter={()=>{this.calculateAll()}}></InputItem>
                        <InputItem text="长度4：" unit="inch" value={this.state.values[3]} onChange={(value)=>{this.clearOthers(3, value)}} enter={()=>{this.calculateAll()}}></InputItem>
                    </div>
                    <div className={styles.contentFooter}>
                        <Button text="转换" stress={true} onClick={()=>{this.calculateAll()}}></Button>
                        <Button text="关闭" stress={false} onClick={()=>{remote.getCurrentWindow().close()}}></Button>
                    </div>
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
                <Content></Content>
                <div className={styles.titleView} hidden={(remote.process.platform === "darwin")}>
                    <TitleButton src={iconMinimize} onClick={()=>{remote.getCurrentWindow().minimize()}}></TitleButton>
                    <TitleButton src={iconClose} onClick={()=>{remote.getCurrentWindow().close()}}></TitleButton>
                </div>
            </div>
        );
    }
}

export default App;

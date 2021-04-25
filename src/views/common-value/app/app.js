import React from 'react';
import styles from './app.module.css';
const { remote } = window.require('electron');


// class Input extends React.Component {
//     render() {
//         return (
//             <div className={styles.input_parent}>
//                 <div className={styles.input_unit_parent}>
//                     <p className={styles.input_unit_text}>mm</p>
//                 </div>
//                 <div className={styles.input_content_parent}>
//                     <input className={styles.input_content}></input>
//                 </div>
//             </div>
//         );
//     }
// }


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
                    <input  className={styles.input} 
                            type="number" 
                            placeholder="请输入数字" 
                            value={this.props.value} 
                            onChange={this.handleChange} 
                            onKeyUp={this.onKeyUp}></input>
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
                        <p className={styles.content_header_text}>常用值查询</p>
                    </div>
                </div>
                <div className={styles.contentBody}>
                    <div className={styles.content}>
                        
                    </div>
                    <div className={styles.menuParent}></div>
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

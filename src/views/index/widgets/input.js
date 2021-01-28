import React from 'react';
import "./input.css"

class Input extends React.Component {
    render() {
        return (
            <div className="page_caculator_parent">
                <div className="page_caculator_cal_content">
                    <input className="page_caculator_input"></input>
                </div>
            </div>
        );
    }
}
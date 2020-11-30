import React from 'react';
import "../common.css"
import "./page.css"

class PageAccess extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%", position:"absolute"}}>
                <div className="page_title">辅助功能</div>
                <div className="page_caculator_parent">
                    <div className="page_caculator_cal_content">
                        <input className="page_caculator_input"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageAccess;


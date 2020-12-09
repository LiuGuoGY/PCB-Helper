import React from 'react';
import "../common.css"
import "./page.css"

//---icon---
import iconTurn from "../../assets/icon-zhuanhuan.png"

// class CalculatorElement extends React.Component {
//     render() {
//         return (
//             <div className="element_caculator_parent">
//                 <p className="element_caculator_title">inch</p>
//                 <input className="element_caculator_descript"></input>
//             </div>
//         );
//     }
// }

class MenuElement extends React.Component {
    render() {
        return (
            <div className="menu_element_parent" onClick={()=>{alert("点击了")}}>
                <img src={iconTurn} alt="none" className="menu_element_icon"></img>
                <p className="menu_element_title">单位转换</p>
                <p className="menu_element_subtitle">绘制 PCB 时常用的长度单位转换。</p>
            </div>
        );
    }
}

class PageAccess extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div className="page_title">辅助功能</div>
                <div className="page_access_menus_parent">
                    <MenuElement></MenuElement>
                    <MenuElement></MenuElement>
                    <MenuElement></MenuElement>
                    <MenuElement></MenuElement>
                    <MenuElement></MenuElement>
                </div>
            </div>
        );
    }
}

export default PageAccess;


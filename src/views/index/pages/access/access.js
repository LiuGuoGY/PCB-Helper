import React from 'react';
import createWindow from "./window-unit-convert"
import commonStyles from "../common.module.css";
import styles from "./access.module.css";

//---icon---
import iconTurn from "../../assets/icon-zhuanhuan.png"

class MenuElement extends React.Component {
    render() {
        return (
            <div className={styles.menu_element_parent} onClick={()=>this.props.onClick()}>
                <img src={this.props.icon} alt="none" className={styles.menu_element_icon}></img>
                <p className={styles.menu_element_title}>{this.props.title}</p>
                <p className={styles.menu_element_subtitle}>{this.props.subtitle}</p>
            </div>
        );
    }
}

class DividingLine extends React.Component {
    render() {
        return (
            <div className={styles.dividing_line}></div>
        );
    }
}

class PageAccess extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%", position:"absolute"}}>
                <div className={commonStyles.page_title}>辅助功能</div>
                <div className={styles.page_access_menus_parent}>
                    <MenuElement icon={iconTurn} title="单位转换" subtitle="绘制 PCB 时常用的长度单位转换。" onClick={()=>{createWindow()}}></MenuElement>
                    <DividingLine></DividingLine>
                </div>
            </div>
        );
    }
}

export default PageAccess;


import React from 'react';
import commonStyles from "../common.module.css";
import { Checkbox, Col, Row } from 'antd';
import styles from "./index.module.css";

class PageRuleSet extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%", position:"absolute"}}>
                <div className={commonStyles.page_title}>规则设置</div>
                <div className={styles.checkboxParent}>
                    <Checkbox.Group>
                        <Row>
                            <Col span={24}>
                                <Checkbox value="1">设置线宽</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value="2">设置线间距</Checkbox>
                            </Col>
                        </Row>
                        
                    </Checkbox.Group>
                </div>
            </div>
        );
    }
}

export default PageRuleSet;


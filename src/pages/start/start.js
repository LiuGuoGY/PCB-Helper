import React from 'react';
import "./page.css"

class PageStart extends React.Component {
    render() {
        return (
            <div style={{visibility:(this.props.show)?"visible":"hidden"}} className="start_main">233</div>
        );
    }
}

export default PageStart;


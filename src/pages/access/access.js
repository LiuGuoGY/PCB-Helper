import React from 'react';
import "./page.css"

class PageAccess extends React.Component {
    render() {
        return (
            <div style={{visibility:(this.props.show)?"visible":"hidden"}} className="access_main">344</div>
        );
    }
}

export default PageAccess;


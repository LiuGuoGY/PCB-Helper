import React from 'react';

class PageAccess extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: "yellow", visibility:(this.props.show)?"visible":"hidden"}}>344</div>
        );
    }
}

export default PageAccess;


import React from 'react';

class PageStart extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: "red", visibility:(this.props.show)?"visible":"hidden"}}>233</div>
        );
    }
}

export default PageStart;


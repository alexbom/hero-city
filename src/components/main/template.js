import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoadingBar from 'react-redux-loading-bar';
import Menu from './menu';

export default class Template extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LoadingBar />
                <MuiThemeProvider>
                    <div className="container">
                        <Menu />
                        <h1 className="title">Город героев</h1>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

}
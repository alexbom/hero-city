import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from '../components/main/menu';
import { user, statuses, categories, cities } from '../components/main/data';

export default class Set extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Menu />
                    <h1 className="text-center">Город героев</h1>
                </div>
            </MuiThemeProvider>
        );
    }

}
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './main/menu';
import { user, statuses, categories, cities } from './main/data';

export default class Fav extends React.Component {

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
import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import CityDropdown from './city-dropdown';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Toolbar className="toolbar">
                <ToolbarGroup>
                    <Link to="/" activeClassName="active">Все задания</Link>
                    <Link to="/my" activeClassName="active">Мои</Link>
                    <Link to="/fav" activeClassName="active">Избранные</Link>
                </ToolbarGroup>
                <CityDropdown />
                <ToolbarGroup>
                    <Link to="/top" activeClassName="active">Рейтинг</Link>
                    <Link to="/set" activeClassName="active">Настройки</Link>
                    <a href="#">Выход</a>
                </ToolbarGroup>
            </Toolbar>
        );
    }
    
}
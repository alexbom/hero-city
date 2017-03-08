import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityId: this.props.cityId || 1
        };
    }

    cityChange(event, index, cityId) {
        this.setState({ cityId });
    }

    render() {
        return (
            <Toolbar className="toolbar">
                <ToolbarGroup>
                    <Link to="/" activeClassName="active">Все задания</Link>
                    <Link to="/fav" activeClassName="active">Избранные</Link>
                    <Link to="/cab" activeClassName="active">Мои</Link>
                </ToolbarGroup>
                <DropDownMenu
                    className="dropdown-menu"
                    value={this.state.cityId}
                    id="select-city"
                    onChange={this.cityChange.bind(this)}
                >
                    <MenuItem value={1} primaryText="Санкт-Петербург" />
                    <MenuItem value={2} primaryText="Москва" />
                    <MenuItem value={3} primaryText="Геленджик" />
                    <MenuItem value={4} primaryText="Мурманск" />
                </DropDownMenu>
                <ToolbarGroup>
                    <Link to="/top" activeClassName="active">Рейтинг</Link>
                    <Link to="/set" activeClassName="active">Настройки</Link>
                    <a href="#">Выход</a>
                </ToolbarGroup>
            </Toolbar>
        );
    }
    
}
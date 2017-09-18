import React from 'react';
import { Link } from 'react-router';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import CityDropdown from './city-dropdown';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconPerson from 'material-ui/svg-icons/social/person';
import $ from 'jquery';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        let win = $(window);
        win.resize(() => {
            if (win.width() >= 992) {
                $('#app .toolbar-menu a').show();
            } else {
                $('#app .toolbar-menu a').hide();
            }
        });
    }

    toolbarBurger(pos) {
        let menu   = $('#app .toolbar-' + pos + ' a'),
            top    = 60,
            height = 55,
            speed  = 200,
            shown  = menu.first().hasClass('shown');

        $('#app .toolbar-menu a').removeClass('shown').hide().css({ opacity: 1, top: 0 });

        if (shown) return;

        menu.addClass('shown').each(function(i) {
            let item = $(this);
            item.css({ display: 'block', opacity: 0 }).stop().animate({ top: top + i + i * height, opacity: 1 }, speed);
        });
    }

    render() {
        const style = {
            color: '#fff'
        };

        return (
            <Toolbar className="toolbar">
                <ToolbarGroup className="toolbar-menu toolbar-left">
                    <IconButton className="toolbar-burger" iconStyle={style} onClick={this.toolbarBurger.bind(this, 'left')}>
                        <IconMenu />
                    </IconButton>
                    <Link to="/" activeClassName="active">Все задания</Link>
                    <Link to="/my" activeClassName="active">Мои</Link>
                    <Link to="/fav" activeClassName="active">Избранные</Link>
                </ToolbarGroup>
                <CityDropdown />
                <ToolbarGroup className="toolbar-menu toolbar-right">
                    <IconButton className="toolbar-burger" iconStyle={style} onClick={this.toolbarBurger.bind(this, 'right')}>
                        <IconPerson />
                    </IconButton>
                    <Link to="/top" activeClassName="active">Рейтинг</Link>
                    <Link to="/set" activeClassName="active">Настройки</Link>
                    <a href="#">Выход</a>
                </ToolbarGroup>
            </Toolbar>
        );
    }
    
}
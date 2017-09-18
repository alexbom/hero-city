import React from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class CityDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    cityChange(event, index, cityId) {
        let body = $('body'),
            bg   = $('<div class="city-bg"></div>'),
            url  = 'url("/img/city/' + cityId + '.jpg")';

        body.append(bg);
        bg.css({ backgroundImage: url, opacity: 0 });
        bg.animate({ opacity: 1 }, function() {
            $('body').css({ backgroundImage: url });
            bg.remove();
        });

        this.props.onCityChange(cityId);
    }

    render() {
        return (
            <DropDownMenu
                className="dropdown-menu"
                value={this.props.city.id}
                id="select-city"
                onChange={this.cityChange.bind(this)}
            >
                <MenuItem value={1} primaryText="Санкт-Петербург" />
                <MenuItem value={2} primaryText="Москва" />
                <MenuItem value={3} primaryText="Геленджик" />
                <MenuItem value={4} primaryText="Мурманск" />
            </DropDownMenu>
        );
    }
    
}

export default connect(
    state => state,
    dispatch => ({
        onCityChange: (payload) => {
            dispatch({ type: 'CITY_CHANGE', payload });
        }
    })
)(CityDropdown);
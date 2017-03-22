import React from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class CityDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    cityChange(event, index, cityId) {
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
        onCityChange: (cityId) => {
            dispatch({ type: 'CITY_CHANGE', payload: cityId });
        }
    })
)(CityDropdown);
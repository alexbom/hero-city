import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { categories } from '../main/data';

export default class CategoryDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(event, index, categoryId) {
        if (this.props.selectCategory) {
            this.props.selectCategory(categoryId);
        }
    }

    render() {
        const menuItems = _.map(categories, (category, index) =>
            (
                <MenuItem
                    key={index}
                    value={category.id}
                    primaryText={category.translate}
                />
            )
        );

        const value = this.props.multiSelect ? 0 : this.props.categoryId;

        const firstText = this.props.multiSelect ? 'Тип задания...' : 'Все типы заданий...';

        return (
            <DropDownMenu value={value} onChange={this.handleChange.bind(this)} className={this.props.className}>
                <MenuItem value={0} primaryText={firstText} />
                {menuItems}
            </DropDownMenu>
        );
    }

}
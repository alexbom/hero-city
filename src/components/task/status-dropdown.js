import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { statuses } from '../main/data';

export default class StatusDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(event, index, status) {
        if (this.props.selectStatus) {
            this.props.selectStatus(status);
        }
    }

    render() {
        const menuItems = _.map(statuses, (status, index) =>
            (
                <MenuItem
                    key={index}
                    value={status.name}
                    primaryText={status.translate}
                />
            )
        );

        const value = this.props.multiSelect ? 0 : this.props.status;

        const firstText = this.props.multiSelect ? 'Состояние...' : 'Все состояния...';

        return (
            <DropDownMenu value={value} onChange={this.handleChange.bind(this)} className={this.props.className}>
                <MenuItem value={0} primaryText={firstText} />
                {menuItems}
            </DropDownMenu>
        );
    }

}
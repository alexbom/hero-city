import React from 'react';
import { connect } from 'react-redux';
import ResourceEdit from './resource-edit';

class ResourcesEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    renderItems() {
        return _.map(this.props.taskEdit.items, (props, index) => {
            return (
                <ResourceEdit
                    key={index}
                    {...props}
                    handleItemSave={this.props.handleItemSave.bind(this)}
                />
            )}
        );
    }

    render() {
        return (
            <div className="task-items">
                {this.renderItems()}
                <ResourceEdit
                    handleItemSave={this.props.handleItemSave.bind(this)}
                />
            </div>
        );
    }

}

export default connect(
    state => state
)(ResourcesEdit);
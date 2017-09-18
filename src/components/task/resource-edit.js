import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';
import Clear from 'material-ui/svg-icons/content/clear';

export default class ResourceEdit extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = this.defaultProps();

        for (let k in this.state) {
            if ( ! this.props[k]) continue;
            this.state[k] = this.props[k];
        }
    }

    defaultProps() {
        return {
            id: 0,
            name: '',
            isOpen: false
        };
    }

    handleOpen() {
        this.setState({ isOpen: true });
        //this.refs.itemName.getInputNode().value = '';
    }

    handleClose() {
        let props = { isOpen: false };

        if ( ! this.state.id) {
            props = this.defaultProps();
        }

        this.setState(props);
    }

    handleChange(event, value) {
        this.state[event.target.name] = value;
        this.setState(this.state);
    }

    handleKeyDown(event) {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        this.handleSave(event);
    }

    handleSave(event) {
        event.preventDefault();

        this.props.handleItemSave('resources', this.state);
        this.handleClose();
    }

    render() {
        const popup = ! this.state.isOpen ? '' :
            <div className="item-popup" onClick={e=>e.stopPropagation()}>
                <TextField
                    placeholder="Название"
                    name="name"
                    value={this.state.name}
                    fullWidth={true}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    autoFocus
                />
                <IconButton ref="itemSubmit" tooltip="Сохранить" onClick={this.handleSave}>
                    <Save ref="itemSubmit" />
                </IconButton>
                <IconButton tooltip="Закрыть">
                    <Clear onClick={this.handleClose} />
                </IconButton>
            </div>;

        return (
            <div className="resource-edit" onClick={this.handleOpen.bind(this)}>
                {this.state.name || '+'}
                {popup}
            </div>
        );
    }

}
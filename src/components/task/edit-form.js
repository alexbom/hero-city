import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Utils from '../main/utils';
import CategoryDropdown from './category-dropdown';
import { user, categories } from '../main/data';

export default class TaskForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = Utils.defaultProps();
    }

    handleSave(event) {
        event.preventDefault();

        const validateInput = this.validateInput(this.state.title);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        let task;
        if (this.props.taskEdit) {
            task = this.props.taskEdit;
        } else {
            task = Utils.defaultProps();
            task.id = this.props.taskInsertId();
            task.city = user.city;
            task.published_by = user.id;
            task.published_on = new Date().getTime();
        }

        task.title = this.state.title;
        task.text = this.state.text;
        task.resources = [];
        task.recruits = [];
        task.categories = this.state.categories;
        task.tags = [];

        if (this.props.taskEdit) {
            this.props.saveTask(task);
        } else {
            this.props.createTask(task);
        }

        this.setState(Utils.defaultProps());

        //const taskTitle = this.refs.taskTitle.getValue();
        //this.refs.taskTitle.getInputNode().value = '';
    }

    validateInput(task) {
        if ( ! task) {
            this.refs.taskTitle.getInputNode().focus();
            return 'Введите заголовок задания';
        } else {
            return null;
        }
    }

    selectCategory(category) {
        let categories = this.state.categories;

        if (categories.indexOf(category) === -1) {
            categories.push(category);
        }

        this.setState({ categories });
    }

    deleteCategory(category) {
        let categories = this.state.categories;

        const index = categories.indexOf(category);

        if (index === -1) return;

        categories.splice(index, 1);
        this.setState({ categories });
    }

    renderCategories() {
        return _.map(this.state.categories, (value, index) => {
            const name = _.find(categories, category => category.id === value).translate;

            return (
                <Chip key={index} className="chip" onRequestDelete={() => this.deleteCategory(value)}>
                    {name}
                </Chip>
            );
        }, this);
    }

    handleChange(event, value) {
        this.state[event.target.name] = value;
        this.setState(this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskEdit) {
            this.setState(nextProps.taskEdit);
        } else {
            this.setState(Utils.defaultProps());
        }
    }

    renderButtons() {
        if (this.props.taskEdit) {
            return (
                <div>
                    <RaisedButton type="submit" label="Сохранить" primary={true} />
                    <RaisedButton type="button" label="Отмена" secondary={true} onClick={this.props.cancelEditTask.bind(this)} />
                </div>
            );
        } else {
            return (
                <RaisedButton type="submit" label="Добавить задание" primary={true} />
            );
        }
    }

    renderError() {
        if ( ! this.state.error) return null;

        return <div className="form-error">{this.state.error}</div>;
    }

    render() {
        const formLegend = this.props.taskEdit ? 'Редактор задания #' + this.state.id : 'Добавьте задание для героев Вашего города';

        return (
            <form onSubmit={this.handleSave.bind(this)} className="form-top">
                <legend>{formLegend}</legend>
                <TextField
                    placeholder="Заголовок"
                    name="title"
                    ref="taskTitle"
                    value={this.state.title}
                    onChange={this.handleChange}
                    fullWidth={true}
                />
                <br />
                <TextField
                    placeholder="Подробное описание"
                    name="text"
                    ref="taskText"
                    value={this.state.text}
                    onChange={this.handleChange}
                    fullWidth={true}
                    multiLine={true}
                />
                <br />
                <CategoryDropdown
                    multiSelect={true}
                    selectCategory={this.selectCategory.bind(this)}
                    deleteCategory={this.deleteCategory.bind(this)}
                />
                <br />
                {this.renderCategories()}
                <div className="form-buttons">
                    {this.renderButtons()}
                </div>
                {this.renderError()}
            </form>
        );
    }
    
}
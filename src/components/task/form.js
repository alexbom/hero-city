import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { taskProps } from '../main/utils';
import CategoryDropdown from './category-dropdown';
import { user, categories } from '../main/data';
//import ResourcesEdit from './resources-edit';

class TaskForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: false
        };
    }

    handleSave(event) {
        event.preventDefault();

        const taskEdit      = this.props.taskEdit;
        const validateInput = this.validateInput(taskEdit.title);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        if (taskEdit.id) {
            this.props.saveTask(taskEdit);
        } else {
            this.props.createTask(taskEdit);
        }
        this.props.cancelEditTask();

        //const taskTitle = this.refs.taskTitle.getValue();
        //this.refs.taskTitle.getInputNode().value = '';
    }

    validateInput(title) {
        if ( ! title) {
            this.refs.taskTitle.getInputNode().focus();
            return 'Введите заголовок задания';
        } else {
            return null;
        }
    }

    selectCategory(category) {
        let categories = this.props.taskEdit.categories;

        if (categories.indexOf(category) === -1) {
            categories.push(category);
        }

        this.setState({ categories });
    }

    deleteCategory(category) {
        let categories = this.props.taskEdit.categories;

        const index = categories.indexOf(category);

        if (index === -1) return;

        categories.splice(index, 1);
        this.setState({ categories });
    }

    renderCategories() {
        return _.map(this.props.taskEdit.categories, (value, index) => {
            const name = _.find(categories, category => category.id === value).translate;

            return (
                <Chip key={index} className="chip" onRequestDelete={() => this.deleteCategory(value)}>
                    {name}
                </Chip>
            );
        }, this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskEdit) {
            this.setState(nextProps.taskEdit);
        } else {
            this.setState(taskProps());
        }
    }

    renderButtons() {
        if (this.props.taskEdit.id) {
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
        const taskEdit   = this.props.taskEdit;
        const formLegend = taskEdit.id ? 'Редактор задания #' + taskEdit.id : 'Добавьте задание для героев Вашего города';

        return (
            <div>
                <form onSubmit={this.handleSave.bind(this)} className="form-top">
                    <legend>{formLegend}</legend>
                    <TextField
                        placeholder="Заголовок"
                        name="title"
                        ref="taskTitle"
                        value={taskEdit.title}
                        onChange={this.props.handleChange}
                        fullWidth={true}
                    />
                    <br />
                    <TextField
                        placeholder="Подробное описание"
                        name="text"
                        ref="taskText"
                        value={taskEdit.text}
                        onChange={this.props.handleChange}
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
                    {/* <ResourcesEdit
                        handleItemSave={this.props.handleItemSave.bind(this)}
                    /> */}
                    <div className="form-buttons">
                        {this.renderButtons()}
                    </div>
                    {this.renderError()}
                </form>
            </div>
        );
    }
    
}

export default connect(
    state => state
)(TaskForm);
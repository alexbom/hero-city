import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskList from './task/list';
import TaskForm from './task/edit-form';
import Menu from './main/menu';
import { user } from './main/data';

class Cab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            taskEdit: 0,
            cityId: 0
        };
    }

    createTask(task) {
        this.props.onCreateTask(task);
    }

    editTask(taskEdit) {
        this.setState({ taskEdit });
    }

    cancelEditTask() {
        this.setState({ taskEdit: 0 });
    }

    saveTask(task) {
        this.props.onSaveTask(task);

        this.setState({ taskEdit: 0 });
    }

    toggleTask(taskId) {
        this.props.onToggleTask(taskId);
    }

    deleteTask(taskId) {
        this.props.onDeleteTask(taskId);
    }

    taskInsertId() {
        return Math.max.apply(Math, _.map(this.props.tasks, task => task.id)) + 1;
    }

    statusTask(taskId, status) {
        this.props.onStatusTask({ taskId, status });
    }

    render() {
        //console.log('ownProps',this.props.ownProps);
        return (
            <MuiThemeProvider>
                <div>
                    <Menu cityId={this.state.cityId} />
                    <h1 className="text-center">Город героев</h1>
                    <TaskForm
                        taskEdit={this.state.taskEdit}
                        cityId={this.state.cityId}
                        createTask={this.createTask.bind(this)}
                        taskInsertId={this.taskInsertId.bind(this)}
                        saveTask={this.saveTask.bind(this)}
                        cancelEditTask={this.cancelEditTask.bind(this)}
                    />
                    <TaskList
                        tasks={this.props.tasks}
                        cityId={this.state.cityId}
                        location={this.props.location}
                        editTask={this.editTask.bind(this)}
                        toggleTask={this.toggleTask.bind(this)}
                        deleteTask={this.deleteTask.bind(this)}
                        statusTask={this.statusTask.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }

}

export default connect(
    (state, ownProps) => ({
        tasks: _.filter(state.tasks, task => task.published_by === user.id),
        ownProps
    }),
    dispatch => ({
        onCreateTask: (payload) => {
            dispatch({ type: 'TASK_CREATE', payload });
        },
        onDeleteTask: (payload) => {
            dispatch({ type: 'TASK_DELETE', payload });
        },
        onSaveTask: (payload) => {
            dispatch({ type: 'TASK_SAVE', payload });
        },
        onToggleTask: (payload) => {
            dispatch({ type: 'TASK_TOGGLE', payload });
        },
        onStatusTask: (payload) => {
            dispatch({ type: 'TASK_STATUS', payload });
        }
    })
)(Cab);
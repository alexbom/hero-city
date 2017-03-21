import React from 'react';
import { connect } from 'react-redux';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import TaskForm from '../components/task/edit-form';
import { getMyTasks } from '../actions/tasks';

class My extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            taskEdit: 0,
            cityId: 0
        };

        this.props.onTaskGet();
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
        return (
            <Template>
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
            </Template>
        );
    }

}

export default connect(
    /*(state, ownProps) => ({
        tasks: _.filter(state.tasks, task => task.published_by === user.id),
        ownProps
    }),*/
    state => state,
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
        },
        onTaskGet: () => {
            dispatch(getMyTasks(dispatch));
        }
    })
)(My);
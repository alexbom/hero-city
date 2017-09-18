import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import TaskForm from '../components/task/form';
import { getMyTasks } from '../actions/tasks';
import { num2word } from '../components/main/utils';
import { user } from '../components/main/data';

class My extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageSize: 10,
            current: 1,
            total: 2
        };

        this.props.onTaskGet(this.state.pageSize, this.state.current);
    }

    createTask(task) {
        task.id           = this.taskInsertId();
        task.published_on = new Date().getTime();
        task.published_by = user.id;
        task.city         = user.city;

        this.props.onCreateTask(task);
        this.props.onCancelTask(task);
    }

    cancelEditTask() {
        this.props.onCancelTask();
    }

    saveTask(task) {
        this.props.onSaveTask(task);
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

    handleChange(event, value) {
        let   state    = {};
        const taskEdit = this.props.taskEdit;

        for (let k in taskEdit) {
            state[k] = taskEdit[k];
        }

        state[event.target.name] = value;

        this.props.onChangeTask(state);
    }

    handleItemSave(type, data) {
        const taskEdit = this.props.taskEdit;
        let items = [];

        for (let k in taskEdit[type]) {
            items.push(taskEdit[type][k]);
        }

        if (data.name) {
            if (data.id) {
                let found = _.filter(items, item => item.id == data.id);

                for (let k in data) {
                    found[k] = data[k];
                }
            } else {
                data.id = new Date().getTime();
                items.push(data);
            }
        } else if (data.id) {
            const index = _.findIndex(items, { id: data.id });
            items.splice(index, 1);
        }

        this.props.onSaveTaskItem({ taskEdit: { [type]: items } });
    }

    render() {
        const total = this.state.total;

        const pages = ! total ? <div className="rc-pagination">Заданий не найдено</div> :
            <div></div>;
        /*
            <Pagination
                showTotal={total => 'Найдено ' + total + ' ' + num2word(total, ['задание','задания','заданий']) }
                total={total}
            />;
         */

        return (
            <Template>
                <TaskForm
                    handleChange={this.handleChange.bind(this)}
                    handleItemSave={this.handleItemSave.bind(this)}
                    createTask={this.createTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    cancelEditTask={this.cancelEditTask.bind(this)}
                />
                <TaskList
                    deleteTask={this.deleteTask.bind(this)}
                    statusTask={this.statusTask.bind(this)}
                    myTasks={true}
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
        onChangeTask: payload => {
            dispatch({ type: 'TASK_CHANGE', payload });
        },
        onCancelTask: () => {
            dispatch({ type: 'TASK_EDIT_CANCEL' });
        },
        onCreateTask: payload => {
            dispatch({ type: 'TASK_CREATE', payload });
        },
        onDeleteTask: payload => {
            dispatch({ type: 'TASK_DELETE', payload });
        },
        onSaveTask: payload => {
            dispatch({ type: 'TASK_SAVE', payload });
        },
        onStatusTask: payload => {
            dispatch({ type: 'TASK_STATUS', payload });
        },
        onSaveTaskItem: payload => {
            dispatch({ type: 'TASK_ITEM_SAVE', payload });
        },
        onTaskGet: (pageSize, current) => {
            dispatch(getMyTasks(dispatch, pageSize, current));
        }
    })
)(My);
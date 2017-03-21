import React from 'react';
import { connect } from 'react-redux';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import SearchForm from '../components/task/search-form';
import { getAllTasks } from '../actions/tasks';

class All extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityId: 0
        };

        this.props.onTaskGet();
    }

    findTask(props) {
        this.props.onTaskFind(props);
    }

    render() {
        return (
            <Template>
                <SearchForm
                    cityId={this.state.cityId}
                    findTask={this.findTask.bind(this)}
                />
                <TaskList
                    tasks={this.props.tasks}
                    cityId={this.state.cityId}
                    location={this.props.location}
                />
            </Template>
        );
    }

}

function filterTasks(state) {
    if ( ! state.taskFilters) {
        return _.filter(state.tasks, task => ! task.isHidden);
    }

    return _.filter(state.tasks, task => {
        let ok = ! task.isHidden;

        if (state.taskFilters.categoryId) {
            ok &= task.categories.indexOf(state.taskFilters.categoryId) !== -1;
        }

        if (state.taskFilters.status) {
            ok &= task.status === state.taskFilters.status;
        }

        if (state.taskFilters.title) {
            const lowerCase = state.taskFilters.title.toLowerCase();

            ok &= (task.title.toLowerCase().indexOf(lowerCase) !== -1 || task.text.toLowerCase().indexOf(lowerCase) !== -1);
        }

        if (state.taskFilters.minDate) {
            ok &= task.published_on > state.taskFilters.minDate.getTime();
        }

        if (state.taskFilters.maxDate) {
            ok &= task.published_on < state.taskFilters.maxDate.getTime();
        }

        return ok;
    });
}

export default connect(
    (state, ownProps) => ({
        tasks: filterTasks(state),
        ownProps
    }),
    dispatch => ({
        onTaskFind: (payload) => {
            dispatch({ type: 'TASK_FIND', payload });
        },
        onTaskGet: () => {
            dispatch(getAllTasks(dispatch));
        }
    })
)(All);
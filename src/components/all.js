import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskList from './task/list';
import SearchForm from './task/search-form';
import Menu from './main/menu';

class All extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityId: 0
        };
    }

    findTask(props) {
        this.props.onTaskFind(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Menu />
                    <h1 className="text-center">Город героев</h1>
                    <SearchForm
                        cityId={this.state.cityId}
                        findTask={this.findTask.bind(this)}
                    />
                    <TaskList
                        tasks={this.props.tasks}
                        cityId={this.state.cityId}
                        location={this.props.location}
                    />
                </div>
            </MuiThemeProvider>
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
    state => ({
        tasks: filterTasks(state)
    }),
    dispatch => ({
        onTaskFind: (payload) => {
            dispatch({ type: 'TASK_FIND', payload });
        }
    })
)(All);
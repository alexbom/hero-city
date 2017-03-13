import React from 'react';
import { connect } from 'react-redux';
import { CALL_API } from 'redux-api-middleware';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskList from '../components/task/list';
import SearchForm from '../components/task/search-form';
import Menu from '../components/main/menu';

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
        onTaskFind: payload => {
            dispatch({ type: 'TASK_FIND', payload });
        },
        onTaskGet: () => {
            dispatch({ type: 'TASK_LOAD' });

            dispatch({
                [CALL_API]: {
                    endpoint: '/api/tasks/get_all.json',
                    method: 'GET',
                    types: [
                        'REQUEST',
                        {
                            type: 'SUCCESS',
                            payload: (action, state, data) => {
                                data.json().then(payload => {
                                    dispatch({ type: 'TASK_GET', payload });
                                });
                            }
                        },
                        'FAILURE'
                    ]
                }
            })
        }
    })
)(All);
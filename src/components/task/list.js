import React from 'react';
import { connect } from 'react-redux';
import TaskListHeader from './list-header';
import TaskListItem from './list-item';
import { Table, TableHeader, TableBody } from 'material-ui/Table';

class TaskList extends React.Component {

    renderItems() {
        const props = _.omit(this.props, 'tasks');

        return _.map(this.props.tasks, (task, index) => <TaskListItem key={index} {...task} {...props} />);
    }

    findTask(props = {}) {
        this.props.onTaskFind(props);
    }

    render() {
        return (
            <Table className="table-tasks">
                <TableHeader>
                    <TaskListHeader />
                </TableHeader>
                <TableBody>
                    {this.renderItems()}
                </TableBody>
            </Table>
        );
    }

}

function filterTasks(state, ownProps) {
    if (ownProps.myTasks) {
        return state.tasks;
    }

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
        tasks: filterTasks(state, ownProps),
        ownProps
    }),
)(TaskList);
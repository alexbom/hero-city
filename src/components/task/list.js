import React from 'react';
import TaskListHeader from './list-header';
import TaskListItem from './list-item';
import { Table, TableHeader, TableBody } from 'material-ui/Table';

export default class TaskList extends React.Component {
    renderItems() {
        const props = _.omit(this.props, 'tasks');

        return _.map(this.props.tasks, (task, index) => <TaskListItem key={index} {...task} {...props} />);
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
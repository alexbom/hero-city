import React from 'react';
import { connect } from 'react-redux';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import { getFavTasks } from '../actions/tasks';

class Fav extends React.Component {

    constructor(props) {
        super(props);

        this.props.onTaskGet();
    }

    render() {
        return (
            <Template>
                <TaskList
                    tasks={this.props.tasks}
                />
            </Template>
        );
    }

}

export default connect(
    state => state,
    dispatch => ({
        onTaskGet: () => {
            dispatch(getFavTasks(dispatch));
        }
    })
)(Fav);
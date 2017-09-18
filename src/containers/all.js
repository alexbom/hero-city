import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import SearchForm from '../components/task/search-form';
import { getAllTasks } from '../actions/tasks';
import { num2word } from '../components/main/utils';
import _ from 'lodash';

class All extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageSize: 10,
            current: 1,
            total: 3
        };

        this.props.onTaskGet(this.state.pageSize, this.state.current);
    }

    findTask(props = {}) {
        this.props.onTaskFind(props);
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
                <SearchForm
                    findTask={this.findTask.bind(this)}
                />
                <TaskList
                    tasks={this.props.tasks}
                />
                {pages}
            </Template>
        );
    }

}

export default connect(
    state => state,
    dispatch => ({
        onTaskFind: (payload) => {
            dispatch({ type: 'TASK_FIND', payload });
        },
        onTaskGet: (pageSize, current) => {
            dispatch(getAllTasks(dispatch, pageSize, current));
        }
    })
)(All);
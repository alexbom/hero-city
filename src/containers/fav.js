import React from 'react';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Template from '../components/main/template';
import TaskList from '../components/task/list';
import { getFavTasks } from '../actions/tasks';
import { num2word } from '../components/main/utils';

class Fav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            taskEdit: 0,
            pageSize: 10,
            current: 1,
            total: 2
        };

        this.props.onTaskGet(this.state.pageSize, this.state.current);
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
        onTaskGet: (pageSize, current) => {
            dispatch(getFavTasks(dispatch, pageSize, current));
        }
    })
)(Fav);
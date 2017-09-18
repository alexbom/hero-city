import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import CategoryDropdown from './category-dropdown';
import StatusDropdown from './status-dropdown';
import { dateFormat } from '../main/utils';

class SearchForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = this.defaultProps();
    }

    defaultProps() {
        const d1 = new Date();
        d1.setMonth(d1.getMonth() - 1);

        const d2 = new Date();

        return {
            categoryId: 0,
            status: 'open',
            title: '',
            minDate: d1,
            maxDate: d2,
            isSearching: false
        };
    }

    handleChange(event, value) {
        this.state[event.target.name] = value;

        this.setState(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.findTask(this.state);
        //this.props.onFindTask(this.state);

        this.setState({ isSearching: true });
    }

    cancelSearchTask() {
        this.state = this.defaultProps();

        this.setState(this.state);

        this.props.findTask();
    }

    selectCategory(categoryId) {
        this.setState({ categoryId });
    }

    selectStatus(status) {
        this.setState({ status });
    }

    handleChangeMinDate(event, minDate) {
        this.setState({ minDate });
    }

    handleChangeMaxDate(event, maxDate) {
        this.setState({ maxDate });
    }

    render() {
        const cancel = this.state.isSearching ? <RaisedButton type="button" label="Отмена" secondary={true} onClick={this.cancelSearchTask.bind(this)} /> : '';

        //const dateTimeFormat = new Intl.DateTimeFormat('ru-RU');

        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="form-top">
                <legend>Задания для героев Вашего города</legend>
                <TextField
                    placeholder="Поиск по заголовку и описанию"
                    name="title"
                    ref="taskTitle"
                    value={this.state.title}
                    onChange={this.handleChange}
                    fullWidth={true}
                />
                <br />
                <CategoryDropdown
                    categoryId={this.state.categoryId}
                    selectCategory={this.selectCategory.bind(this)}
                    className="search-form-input"
                />
                <StatusDropdown
                    status={this.state.status}
                    selectStatus={this.selectStatus.bind(this)}
                    className="search-form-input"
                />
                <br />
                <DatePicker
                    onChange={this.handleChangeMinDate.bind(this)}
                    autoOk={true}
                    formatDate={dateFormat}
                    /*DateTimeFormat={()=>dateTimeFormat}
                    locale="ru-RU"*/
                    floatingLabelText="От"
                    className="search-form-input search-form-date"
                    name="minDate"
                />
                <DatePicker
                    onChange={this.handleChangeMaxDate.bind(this)}
                    autoOk={true}
                    formatDate={dateFormat}
                    /*DateTimeFormat={()=>dateTimeFormat}
                    locale="ru-RU"*/
                    floatingLabelText="До"
                    className="search-form-input search-form-date"
                    name="maxDate"
                />
                <br /><br />
                <input type="hidden" name="cityId" value={this.props.city.id} />
                <RaisedButton type="submit" label="Найти задания" primary={true} />
                {cancel}
            </form>
        );
    }
    
}

/*export default connect(
    (state, ownProps) => ({
        state,
        ownProps
    }),
)(SearchForm);*/

export default connect(
    state => state
)(SearchForm);

import React from 'react';
import { connect } from 'react-redux';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import PanTool from 'material-ui/svg-icons/action/pan-tool';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import $ from 'jquery';
import Utils from '../main/utils';
import { user, statuses, categories } from '../main/data';
import ReactTooltip from 'react-tooltip';

class TaskListItem extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    onEditClick(event) {
        event.stopPropagation();

        let props = Utils.defaultProps();

        for (let k in props) {
            props[k] = _.find(this.props, (prop, index) => { return index === k; });
        }

        this.props.editTask(props);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    onDeleteClick(event) {
        event.stopPropagation();

        this.props.deleteTask(this.props.id);
    }

    statusChange(event, value) {
        const status = _.find(statuses, (status, index) => index === value).name;

        this.props.statusTask(this.props.id, status);

        this.setState({ status });
    }

    openTask(event) {
        this.setState({ isOpen: ! this.state.isOpen });

        $('html, body').animate({ scrollTop: $(event.target).closest('tr').offset().top }, 'fast');
    }

    renderMyActions() {
        const menuItems = _.map(statuses, (status, index) =>
            (
                <MenuItem
                    key={index}
                    value={status.name}
                    primaryText={status.translate}
                />
            )
        );

        const style = {
            fontSize: 10,
            lineHeight: '22px',
            padding: '0px 8px'
        };

        return (
            <TableRowColumn className="table-actions table-actions-my">
                <IconButton
                    className="toggle"
                    tooltipPosition="bottom-center"
                    tooltipStyles={style}
                    tooltip="Скрыть / Открыть"
                    touch={true}
                    onClick={e=>{e.stopPropagation()}}
                >
                    <Toggle
                        defaultToggled={!this.props.isHidden}
                        onToggle={this.props.toggleTask.bind(this, this.props.id)}
                    />
                </IconButton>
                <IconButton tooltip="Изменить" onClick={this.onEditClick.bind(this)}>
                    <EditorModeEdit />
                </IconButton>
                <IconButton tooltip="Удалить" onClick={this.onDeleteClick.bind(this)}>
                    <ActionDelete />
                </IconButton>
                <br />
                <DropDownMenu
                    value={this.props.status}
                    className="status dropdown-menu"
                    onChange={this.statusChange.bind(this)}
                    onClick={e=>e.stopPropagation()}
                >
                    {menuItems}
                </DropDownMenu>
            </TableRowColumn>
        );
    }

    renderAllActions() {
        const found = _.find(statuses, status => status.name === this.props.status);
        const status = found ? found.translate : '';

        return (
            <TableRowColumn className="table-actions table-actions-all">
                <p>{status}</p>
                <RaisedButton
                    type="button"
                    label="Задать вопрос"
                    primary={true}
                    onClick={e=>e.stopPropagation()}
                />
                <RaisedButton
                    type="button"
                    label="Пожаловаться"
                    onClick={e=>e.stopPropagation()}
                />
            </TableRowColumn>
        );
    }

    renderTaskSection() {
        const props = this.props;

        let taskCategories = _.filter(categories, category => props.categories.indexOf(category.id) !== -1);

        taskCategories = _.map(taskCategories, category => category.translate).join(', ');

        let likes = props.likes ? props.likes.length : 0;
        let likesClass = 'likes';

        if (props.likes.indexOf(user.id) !== -1) {
            likes = <div>{likes} <Clear className="action-cancel" /></div>;
            likesClass += ' active';
        }

        let applicants = props.applicants ? props.applicants.length : 0;
        let applicantsClass = 'applicants';

        if (props.applicants.indexOf(user.id) !== -1) {
            applicants = <div>{applicants} <Clear className="action-cancel" /></div>;
            applicantsClass += ' active';
        }

        const published_on = Utils.dateFormat(props.published_on);

        const published_ava = '/img/ava/' + props.published_by + '.gif';

        let text = Utils.nl2br(this.props.text);

        text = this.state.isOpen ? <p dangerouslySetInnerHTML={{__html: text}} /> : '';

        const styleFavorite = {
            width: 20,
            height: 20,
            margin: '14px 8px 0'
        };

        const styleDone = {
            width: 30,
            height: 30,
            margin: '4px 8px'
        };

        let finished = '';

        if (props.finished_by) {
            const finished_on = Utils.dateFormat(props.finished_on);

            const finished_ava = '/img/ava/' + props.finished_by + '.gif';

            finished =
                <ListItem
                    data-tip="Задание выполнено"
                    data-effect="solid"
                    data-insecure="true"
                    leftAvatar={<Avatar src={finished_ava} size={30} />}
                    rightIcon={<Done style={styleDone} />}
                    className="finished-btn finished"
                    onClick={e=>{e.stopPropagation()}}
                >
                    {finished_on}
                </ListItem>
        }

        return (
            <TableRowColumn>
                <strong>#{props.id} {props.title}</strong>
                <p className="categories">{taskCategories}</p>
                {text}
                <List className="task-footer">
                    <ListItem
                        data-tip="Задание добавлено"
                        data-effect="solid"
                        data-insecure="true"
                        leftAvatar={<Avatar src={published_ava} size={30} />}
                        onClick={e=>{e.stopPropagation()}}
                    >
                        {published_on}
                    </ListItem>
                    <ListItem
                        data-tip="Поддержать задание"
                        data-effect="solid"
                        data-insecure="true"
                        leftIcon={<Favorite style={styleFavorite} />}
                        className={likesClass}
                        onClick={e=>{e.stopPropagation();this.props.onLikeTask({ taskId: props.id, userId: user.id });}}
                    >
                        <div>{likes}</div>
                    </ListItem>
                    <ListItem
                        data-tip="Предложить помощь"
                        data-effect="solid"
                        data-insecure="true"
                        leftIcon={<PanTool />}
                        className={applicantsClass}
                        onClick={e=>{e.stopPropagation();this.props.onApplicantTask({ taskId: props.id, userId: user.id });}}
                    >
                        {applicants}
                    </ListItem>
                    {finished}
                </List>
                <ReactTooltip />
            </TableRowColumn>
        );
    }

    render() {
        const className = this.props.isHidden ? 'selected' : '';

        const path = this.props.state.routing.locationBeforeTransitions.pathname;

        const actions = (path === '/my') ? this.renderMyActions() : this.renderAllActions();

        return (
            <TableRow onClick={this.openTask.bind(this)} className={className}>
                {this.renderTaskSection()}
                {actions}
            </TableRow>
        );
    }
    
}

export default connect(
    (state, ownProps) => ({
        state,
        ownProps
    }),
    dispatch => ({
        onLikeTask: (payload) => {
            dispatch({ type: 'TASK_LIKE', payload });
        },
        onApplicantTask: (payload) => {
            dispatch({ type: 'TASK_APPLICANT', payload });
        }
    })
)(TaskListItem);
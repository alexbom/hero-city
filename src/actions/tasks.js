import $ from 'jquery';

export const getTasks = () => dispatch => {
    $.getJSON('/api/tasks/get-json/index.json', payload => {
        dispatch({ type: 'TASK_GET', payload });
    });
};
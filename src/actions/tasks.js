import { CALL_API } from 'redux-api-middleware';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const getAllTasks = (dispatch, limit, page) => callApiTask(dispatch, 'all', limit, page);

export const getMyTasks = (dispatch, limit, page) => callApiTask(dispatch, 'my', limit, page);

export const getFavTasks = (dispatch, limit, page) => callApiTask(dispatch, 'fav', limit, page);

function callApiTask(dispatch, container, limit = 10, page = 1) {
    dispatch(showLoading());
    return {
        [CALL_API]: {
            endpoint: '/api/tasks/get_' + container + '.json',
            method: 'GET',
            types: [
                'REQUEST',
                {
                    type: 'SUCCESS',
                    payload: (action, state, data) => {
                        data.json().then(payload => {
                            dispatch(hideLoading());
                            dispatch({ type: 'TASK_GET', payload });
                        });
                    }
                },
                'FAILURE'
            ]
        }
    }
}
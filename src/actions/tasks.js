import { CALL_API } from 'redux-api-middleware';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const getAllTasks = (dispatch) => callApiTask(dispatch, 'all');

export const getMyTasks = (dispatch) => callApiTask(dispatch, 'my');

export const getFavTasks = (dispatch) => callApiTask(dispatch, 'fav');

function callApiTask(dispatch, page) {
    dispatch(showLoading());
    return {
        [CALL_API]: {
            endpoint: '/api/tasks/get_' + page + '.json',
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
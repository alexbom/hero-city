import { CALL_API } from 'redux-api-middleware';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const getAllTasks = (dispatch) => {
    dispatch(showLoading());
    return {
        [CALL_API]: {
            endpoint: '/api/tasks/get_all.json',
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
};

export const getMyTasks = (dispatch) => {
    dispatch(showLoading());
    return {
        [CALL_API]: {
            endpoint: '/api/tasks/get_my.json',
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
};
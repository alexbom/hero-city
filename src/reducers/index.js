import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'

import tasks from './tasks';
import taskFilters from './taskFilters';

export default combineReducers({
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    tasks,
    taskFilters
})
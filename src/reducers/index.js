import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tasks from './tasks';
import taskFilters from './taskFilters';

export default combineReducers({
    routing: routerReducer,
    tasks,
    taskFilters
})
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import _ from 'lodash';
import reducer from './reducers';

// Needed for onTouchTap http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import All from './components/all';
import Cab from './components/cab';
import Fav from './components/fav';
import Set from './components/set';
import Top from './components/top';

//import getTasks from './actions/tasks';
//getTasks();

require('../css/main.less');

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={All} />
            <Route path="/cab" component={Cab} />
            <Route path="/fav" component={Fav} />
            <Route path="/set" component={Set} />
            <Route path="/top" component={Top} />
        </Router>
    </Provider>,
    document.getElementById('app')
);

store.dispatch({ type: 'TASK_GET_ALL' });
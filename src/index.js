import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
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

require('../css/main.less');

const store = createStore(reducer, composeWithDevTools(applyMiddleware(apiMiddleware, thunk)));
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

import { CALL_API } from 'redux-api-middleware';

store.dispatch({
    [CALL_API]: {
        //headers: { 'Content-Type': 'application/json' },
        endpoint: '/api/tasks/get-json/index.json',
        method: 'GET',
        types: [
            'REQUEST',
            {
                type: 'SUCCESS',
                payload: (action, state, data) => {
                    data.json().then(json => {
                        store.dispatch({ type: 'TASK_GET', payload: json });
                    });
                }
            },
            'FAILURE'
        ]
    }
});
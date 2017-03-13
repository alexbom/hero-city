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

import All from './containers/all';
import My  from './containers/my';
import Fav from './containers/fav';
import Set from './containers/set';
import Top from './containers/top';

require('../css/main.less');

const store = createStore(reducer, composeWithDevTools(applyMiddleware(apiMiddleware, thunk)));
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={All} />
            <Route path="/my" component={My} />
            <Route path="/fav" component={Fav} />
            <Route path="/set" component={Set} />
            <Route path="/top" component={Top} />
        </Router>
    </Provider>,
    document.getElementById('app')
);
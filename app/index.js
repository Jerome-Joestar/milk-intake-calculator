import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import App from './components/app';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('.react-container'));

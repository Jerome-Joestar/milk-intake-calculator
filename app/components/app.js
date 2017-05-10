import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import IntakeForm from './IntakeForm';
import reducers from '../reducers';

class App extends Component {
    render() {
        const store = createStore(reducers);
        return (

            <Provider store={store}>
                <IntakeForm/>
            </Provider>
        );
    }
}

export default App;

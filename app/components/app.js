import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IntakeForm from './IntakeForm';
import reducers from '../reducers';

class App extends Component {
    render() {
        const store = createStore(reducers);
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <IntakeForm/>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;

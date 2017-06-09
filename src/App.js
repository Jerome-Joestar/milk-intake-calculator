import React, { Component } from 'react';

import IntakeForm from './components/IntakeForm';
import Header from './components/Header';
import InstructionalTextA from './components/InstructionalTextA';
import Disclaimer from './components/Disclaimer';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <IntakeForm/>
                <InstructionalTextA/>
                <Disclaimer/>
            </div>
        );
    }
}

export default App;

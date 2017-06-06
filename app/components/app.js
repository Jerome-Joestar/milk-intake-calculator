import React, { Component } from 'react';

import IntakeForm from './IntakeForm';
import Header from './Header';
import InstructionalTextA from './InstructionalTextA';
import Disclaimer from './Disclaimer';

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

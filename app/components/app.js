import React, { Component } from 'react';
import IntakeForm from './intake_form';
import Header from './header';
import InstructionalA from './instructional_a';
import Disclaimer from './disclaimer';

export default class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <InstructionalA/>
                <IntakeForm />
                <Disclaimer />
            </div>
        );
    }
}

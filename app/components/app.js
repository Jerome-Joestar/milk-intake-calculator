import React, { Component } from 'react';
import IntakeForm from './intake_form';
import Results from './results';

export default class App extends Component {

    render() {
        return (
            <div>
                <IntakeForm />
                { this.props.children }
            </div>
        );
    }
}
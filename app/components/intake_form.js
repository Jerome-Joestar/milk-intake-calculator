import React, { Component } from 'react';
import { generateResults } from '../helper';
import InstructionalB from './instructional_b';

export default class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.setStateBatch = this.setStateBatch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);

        this.state = {
            age: '',
            avg_number_feedings: '',
            feeding_intake: '',
            weight_pounds: '',
            weight_ounces: ''
        };

        this.baseState = this.state;
    }

    setStateBatch(stateArray) {
        stateArray.forEach((el) => {
            this.setState(el);
        });
    }

    handleInputChange(e) {
        let newState = {};
        let intVal = parseInt(e.target.value)
        newState[ e.target.name ] = intVal ? intVal : e.target.value;
        this.setState(newState);
    }

    handleOnCancel(e) {
        e.preventDefault();
        this.setState(this.baseState);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.setStateBatch(generateResults(this.state.weight_pounds,
            this.state.weight_ounces, this.state.age,
            this.state.feeding_intake, this.state.avg_number_feedings));
    }

    render() {

        if (this.state && this.state.dailyRequiredOz !== undefined && this.state.dailyRequiredMl && this.state.perFeedingMin && this.state.perFeedingMax) {
            var status = <div>
                <p>Daily milk intake required (oz): {this.state.dailyRequiredOz}</p>
                <p>Daily milk intake required (ml): {this.state.dailyRequiredMl}</p>
                <p>Per feeding needs (oz): {this.state.perFeedingMin} - {this.state.perFeedingMax}</p>
                <p>8-12 feedings per day (ml): {this.state.setFeedingsPerDayMin} - {this.state.setFeedingsPerDayMax}</p>
            </div>;
        }

        if (this.state && this.state.supplementFeedingUnknown && this.state.supplementFeedingKnown) {
            var optional = <div>
                <p>Supplement Feeding (ml): {this.state.supplementFeedingUnknown}</p>
                <p>Supplement feedings (avg feeding per day known)(ml): {this.state.supplementFeedingKnown}</p>
            </div>
        }

        return (
            <div className="container form-container">
                <form name="intake_form" onSubmit={ this.handleOnSubmit }>
                    <fieldset className="form-group">
                        <label htmlFor="age">Age (months)*</label>
                        <input name="age"
                               type="number" min="0" max="6"
                               className="form-control"
                               value={this.state.age}
                               onChange={ this.handleInputChange } required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="weight_pounds">Weight (lbs)*</label>
                        <input name="weight_pounds"
                               type="number" min="6" max="30"
                               className="form-control"
                               value={this.state.weight_pounds}
                               onChange={ this.handleInputChange } required/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="weight_ounces">Weight (oz)*</label>
                        <input name="weight_ounces"
                               type="number"
                               min="0" max="15" className="form-control"
                               value={this.state.weight_ounces}
                               onChange={ this.handleInputChange } required/>
                    </fieldset>
                    <InstructionalB />
                    <fieldset className="form-group">
                        <label htmlFor="feeding_intake">Weighted Feeding Intake (g)</label>
                        <input name="feeding_intake"
                               type="number" className="form-control"
                               placeholder="Enter value here:"
                               value={this.state.feeding_intake}
                               onChange={ this.handleInputChange }/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="avg_number_feedings">Average number of feedings per day</label>
                        <input name="avg_number_feedings"
                               type="number" className="form-control"
                               placeholder="Enter value here:"
                               value={this.state.avg_number_feedings}
                               onChange={ this.handleInputChange }/>
                    </fieldset>
                    <button type="cancel" className="btn btn-cancel" onClick={this.handleOnCancel}>Reset Form
                    </button>
                    <button type="submit" className="btn btn-primary"
                            onClick={this.handleOnSubmit}>Calculate Results
                    </button>
                </form>
                {status}
                {optional}
            </div>
        );
    }
}

function validate(input) {
// add messages to error object
    var errors = {};
    if (input.target.required) {
        if (!input.target.value) {
            errors.required = 'The first three fields (Age, Weight (lbs), Weight (oz)) must be completed to calculate results.';
        }

        if (input.target.type === 'number' && !between(input.target.value, input.target.min, input.target.max)) {
            errors.value = 'Value needs to be within the defined range';
        }
    }
    return errors;
}

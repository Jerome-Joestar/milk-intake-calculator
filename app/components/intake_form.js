import React, { Component } from 'react';
import { generateResults } from '../helper';
import InstructionalB from './instructional_b';

export default class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.setStateBatch = this.setStateBatch.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnCancel = this.handleOnCancel.bind(this);

        this.state = {
            age: '',
            avg_number_feedings: '',
            feeding_intake: '',
            weight_pounds: '',
            weight_ounces: '',
            dailyRequiredOz: '',
            dailyRequiredMl: '',
            perFeedingMin: '',
            perFeedingMax: '',
            supplementFeedingUnknown: '',
            supplementFeedingKnown: '',
            formError: false,
            formNumberError: false
        };

        this.baseState = this.state;
    }

    setStateBatch(stateArray) {
        stateArray.forEach((el) => {
            this.setState(el);
        });
    }

    validate() {
        if (!this.state.age || !this.state.weight_pounds || !this.state.weight_ounces) {
            this.setState({ formError: true });
        }
        else if (parseInt(this.state.weight_pounds) < 5 || parseInt(this.state.age) > 6) {
            this.setState({ formNumberError: true });
        }
        else {
            this.setState({ formError: false });
            this.setState({ formNumberError: false });
        }
    }

    handleInputChange(e) {
        let newState = {};
        let intVal = parseInt(e.target.value)
        newState[ e.target.name ] = intVal ? intVal : e.target.value;
        this.setState(newState);
    }

    handleOnCancel(e) {
        e.preventDefault();
        if (e.key === 'Enter') {
            return;
        }
        else {
            this.setState(this.baseState);
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.validate();
        if (!this.state.formError && !this.state.formNumberError) {
            this.setStateBatch(generateResults(this.state));
        }
        else {
            this.setState({ dailyRequiredOz: '' });
            return;
        }
    }

    render() {
        if (this.state && this.state.dailyRequiredOz && this.state.dailyRequiredMl && this.state.perFeedingMin && this.state.perFeedingMax && !this.state.formError && !this.state.formNumberError) {
            var status = <div className="alert alert-success">
                <p><strong>Daily milk intake required (oz):</strong> {this.state.dailyRequiredOz}</p>
                <p><strong>Daily milk intake required (ml):</strong> {this.state.dailyRequiredMl}</p>
                <p><strong>Per feeding needs (oz):</strong> {this.state.perFeedingMin} - {this.state.perFeedingMax}</p>
                <p><strong>8-12 feedings per day (ml):</strong> {this.state.setFeedingsPerDayMin}
                    - {this.state.setFeedingsPerDayMax}</p>
            </div>;
        }

        if (this.state && this.state.supplementFeedingUnknown && this.state.supplementFeedingKnown && !this.state.formError && !this.state.formNumberError) {
            var optional = <div className="alert alert-info">
                <p><strong>Supplement Feeding (ml):</strong> {this.state.supplementFeedingUnknown}</p>
                <p><strong>Supplement feedings (avg feeding per day
                    known)(ml):</strong> {this.state.supplementFeedingKnown}</p>
            </div>
        }

        if (this.state.formError) {
            var error = <div className="alert alert-danger">
                <strong>Missing form info!</strong> The first three fields (Age, Weight (lbs), Weight (oz)) must be
                completed to calculate results.
            </div>
        }
        if (this.state.formNumberError) {
            var error = <div className="alert alert-danger">
                <strong>Incorrect Values!</strong>
                <p>Weight (lbs) field cannot be less than 5.</p>
                <p>Age must be a number between 0 to 6.</p>
            </div>
        }

        return (
            <div className="container form-container">
                {error}
                <form name="intake_form" onSubmit={ this.handleOnSubmit }>
                    <fieldset className="form-group">
                        <label htmlFor="age">Age between 0 and 6 (months)*</label>
                        <input name="age"
                               type="number" min="0"
                               className="form-control"
                               value={this.state.age}
                               onChange={ this.handleInputChange }/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="weight_pounds">Weight (lbs)*</label>
                        <input name="weight_pounds"
                               type="number" max="30"
                               className="form-control"
                               value={this.state.weight_pounds}
                               onChange={ this.handleInputChange }/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="weight_ounces">Weight (oz)*</label>
                        <input name="weight_ounces"
                               type="number"
                               min="0" max="15" className="form-control"
                               value={this.state.weight_ounces}
                               onChange={ this.handleInputChange }/>
                    </fieldset>
                    {status}
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
                    {optional}
                    <div>
                        <button type="button" className="btn btn-cancel" onClick={this.handleOnCancel}>Reset Form
                        </button>
                        <button type="submit" className="btn intake-submit">Calculate Results</button>
                    </div>
                </form>
            </div>
        );
    }
}

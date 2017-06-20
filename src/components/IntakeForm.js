import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { IntakeErrors, IntakeResults } from './common';
import InstructionalTextB from './InstructionalTextB';

const validators = {
    required: zeroApproved => value => (value || zeroApproved ? undefined : 'This field must be completed to calculate results.'),
    number: value => value && isNaN(Number(value)) ? 'This value must be a number' : undefined,
    minValue: min => value => value && value < min ? `This value must be at least ${min}` : undefined,
    maxValue: max => value => value && value > max ? `This value must be less than ${max}` : undefined,
    setMinValue: value => validators.minValue(value),
    setMaxValue: value => validators.maxValue(value)
}


class IntakeForm extends Component {
    renderField({ input, label, placeholder, type, meta: { touched, error } }) {
        return (
            <fieldset className="form-group">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} className="form-control"/>
                <IntakeErrors touched={touched} error={error}/>
            </fieldset>
        );
    }

    renderResults() {
        const { valid, age, weightPounds, weightOunces, feedingIntake, avgNumberFeedings } = this.props;
        if (valid) {
            return <IntakeResults age={age}
                                  weightPounds={weightPounds}
                                  weightOunces={weightOunces}
                                  feedingIntake={feedingIntake}
                                  avgNumberFeedings={avgNumberFeedings}/>;
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div className="container form-container">
                <p>Results are automatically calculated as values are entered in the form below.</p>
                <p>* denotes a required field.</p>
                <form name="intake_form" onSubmit={ handleSubmit }>
                    <Field
                        name="age"
                        type="number"
                        parse={(value) => parseInt(value, 10)}
                        component={this.renderField}
                        label="Age between 0 and 6 (months)*"
                        validate={[ validators.required(true),
                            validators.number,
                            validators.setMinValue(0),
                            validators.setMaxValue(6) ]}/>
                    <Field
                        name="weightPounds"
                        type="number"
                        parse={(value) => parseInt(value, 10)}
                        component={this.renderField}
                        label="Weight (lbs)*"
                        validate={[ validators.required(false),
                            validators.number,
                            validators.setMinValue(5),
                            validators.setMaxValue(30) ]}/>
                    <Field
                        name="weightOunces"
                        type="number"
                        parse={(value) => parseInt(value, 10)}
                        component={this.renderField}
                        label="Weight (oz)*"
                        validate={[ validators.required(true),
                            validators.number,
                            validators.setMinValue(0),
                            validators.setMaxValue(15) ]}/>
                    <InstructionalTextB />
                    <Field
                        name="feedingIntake"
                        type="number"
                        parse={(value) => parseInt(value, 10)}
                        component={this.renderField}
                        label="Weighted Feeding Intake (g)"
                        validate={[ validators.number ]}/>
                    <Field
                        name="avgNumberFeedings"
                        type="number"
                        parse={(value) => parseInt(value, 10)}
                        component={this.renderField}
                        label="Average number of feedings per day"
                        validate={[ validators.number ]}/>
                    <div className="intake-input-forms">
                        <button
                            className="btn btn-cancel"
                            disabled={pristine || submitting}
                            type="button"
                            onClick={reset}>
                            Reset Form
                        </button>
                    </div>
                </form>
                {this.renderResults()}
            </div>
        );
    }
}

IntakeForm = reduxForm({
    form: 'intake_form'
})(IntakeForm);

// Decorate with connect to read form values
const selector = formValueSelector('intake_form');
IntakeForm = connect(
    state => {
        const {
            age,
            weightPounds,
            weightOunces,
            feedingIntake,
            avgNumberFeedings
        } = selector(state, 'age', 'weightPounds', 'weightOunces', 'feedingIntake', 'avgNumberFeedings');

        return {
            age,
            weightPounds,
            weightOunces,
            feedingIntake,
            avgNumberFeedings
        }
    }
)(IntakeForm)

export default IntakeForm;

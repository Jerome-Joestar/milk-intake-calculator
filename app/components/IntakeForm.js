import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { generateResults } from '../helper';
import { Errors, Results } from './common';
import InstructionalB from './InstructionalTextB';

const validators = {
    required: value => (value ? undefined : 'This field must be completed to calculate results.'),
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
                <Errors touched={touched} error={error} />
            </fieldset>
        );
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div className="container form-container">
                <form name="intake_form" onSubmit={ handleSubmit }>
                    <Field
                        name="age"
                        type="number"
                        component={this.renderField}
                        label="Age between 0 and 6 (months)*"
                        validate={[ validators.required,
                                    validators.number,
                                    validators.setMinValue(0),
                                    validators.setMaxValue(6) ]}/>
                    <Field
                        name="weightPounds"
                        type="number"
                        component={this.renderField}
                        label="Weight (lbs)*"
                        validate={[ validators.required,
                                    validators.number,
                                    validators.setMinValue(5),
                                    validators.setMaxValue(30) ]}/>
                    <Field
                        name="weightOunces"
                        type="number"
                        component={this.renderField}
                        label="Weight (oz)*"
                        validate={[ validators.required,
                                    validators.number,
                                    validators.setMinValue(0),
                                    validators.setMaxValue(15) ]}/>
                    <InstructionalB />
                    <Field
                        name="feedingIntake"
                        type="number"
                        component={this.renderField}
                        label="Weighted Feeding Intake (g)"
                        validate={[ validators.number ]}/>
                    <Field
                        name="avgNumberFeedings"
                        type="number"
                        component={this.renderField}
                        label="Average number of feedings per day"
                        validate={[ validators.number ]}/>
                    <div>
                        <button
                            disabled={pristine || submitting}
                            type="button"
                            className="btn btn-cancel"
                            onClick={reset}>
                            Reset Form
                        </button>
                        <button
                            disabled={pristine || submitting}
                            type="submit"
                            className="btn intake-submit">
                            Calculate Results
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

IntakeForm = reduxForm({
    form: 'intake_form'
})(IntakeForm);

export default IntakeForm;

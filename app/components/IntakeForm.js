import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

import { IntakeContainer, IntakeTextField, IntakeResults } from './common';
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
        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;

        return (
            <IntakeContainer>
                <form name="intake_form" onSubmit={ handleSubmit }>
                    <Field
                        name="age"
                        type="number"
                        parse={(value) => parseInt(value)}
                        component={IntakeTextField}
                        fullWidth={true}
                        hintText="Age"
                        floatingLabelText="Age between 0 and 6 (months)*"
                        validate={[ validators.required,
                            validators.number,
                            validators.setMinValue(0),
                            validators.setMaxValue(6) ]}/>
                    <Field
                        name="weightPounds"
                        type="number"
                        parse={(value) => parseInt(value)}
                        component={IntakeTextField}
                        fullWidth={true}
                        label="Weight (lbs)*"
                        validate={[ validators.required,
                            validators.number,
                            validators.setMinValue(5),
                            validators.setMaxValue(30) ]}/>
                    <Field
                        name="weightOunces"
                        type="number"
                        parse={(value) => parseInt(value)}
                        component={IntakeTextField}
                        fullWidth={true}
                        label="Weight (oz)*"
                        validate={[ validators.required,
                            validators.number,
                            validators.setMinValue(0),
                            validators.setMaxValue(15) ]}/>
                    <InstructionalB />
                    <Field
                        name="feedingIntake"
                        type="number"
                        parse={(value) => parseInt(value)}
                        component={IntakeTextField}
                        fullWidth={true}
                        label="Weighted Feeding Intake (g)"
                        validate={[ validators.number ]}/>
                    <Field
                        name="avgNumberFeedings"
                        type="number"
                        parse={(value) => parseInt(value)}
                        component={IntakeTextField}
                        fullWidth={true}
                        label="Average number of feedings per day"
                        validate={[ validators.number ]}/>
                    <div className="intake-input-forms">
                        <RaisedButton
                            disabled={pristine || submitting}
                            label="Reset Form"
                            type="button"
                            onClick={reset} />
                        <RaisedButton
                            disabled={pristine || submitting || invalid}
                            label="Calculate Results"
                            type="submit"
                            primary={true} />
                    </div>
                </form>
                {this.renderResults()}
            </IntakeContainer>
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

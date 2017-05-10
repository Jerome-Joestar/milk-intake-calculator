import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { generateResults } from '../helper';

class IntakeForm extends Component {
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div className="container form-container">
                <form name="intake_form" onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="age">Age between 0 and 6 (months)*</label>
                        <Field name="age" component="input" type="number"/>
                    </div>
                    <div>
                        <label htmlFor="weightPounds">Weight (lbs)*</label>
                        <Field name="weightPounds" component="input" type="number"/>
                    </div>
                    <div>
                        <label htmlFor="weightOunces">Weight (oz)*</label>
                        <Field name="weightOunces" component="input" type="number"/>
                    </div>
                    <div>
                        <label htmlFor="feedingIntake">Weighted Feeding Intake (g)</label>
                        <Field name="feedingIntake" component="input" type="number"/>
                    </div>
                    <div>
                        <label htmlFor="avgNumberFeedings">Average number of feedings per day</label>
                        <Field name="avgNumberFeedings" component="input" type="number"/>
                    </div>
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

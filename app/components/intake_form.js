import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderInputField from './input_field';
import * as actions from '../actions';

const data = {
    age: "4",
    avg_number_feedings: "4",
    feeding_intake: "3",
    sex: "girl",
    weight_ounces: "3",
    weight_pounds: "4",
};

class IntakeForm extends Component {

    handleFormSubmit = values => this.props.generateIntakeResults(values);


    render() {
        return (
            <form onSubmit={ this.props.handleSubmit(this.handleFormSubmit) }>
                <div className="form-group">
                    <label htmlFor="sex">Sex*</label>
                    <Field name="sex" component="select" className="form-control">
                        <option></option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </Field>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age (months)*</label>
                    <Field name="age" component="select" className="form-control">
                        <option></option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Field>
                </div>
                <div className="form-group">
                    <label htmlFor="weight_pounds">Weight (lbs)*</label>
                    <Field name="weight_pounds" component="select" className="form-control">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Field>
                </div>
                <div className="form-group">
                    <label htmlFor="weight_ounces">Weight (oz)*</label>
                    <Field name="weight_ounces" component="select" className="form-control">
                        <option></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </Field>
                </div>
                <div className="form-group">
                    <Field name="feeding_intake" label="Per Feeding Intake (g)" component={renderInputField}
                           type="number" className="form-control"
                           placeholder="Enter value here:"/>
                </div>
                <div className="form-group">
                    <Field name="avg_number_feedings" label="Average number of feedings per day"
                           component={renderInputField} type="number" className="form-control"
                           placeholder="Enter value here:"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}



IntakeForm = reduxForm({
    form: 'intake_form',
})(IntakeForm);

export default connect(null, actions)(IntakeForm);
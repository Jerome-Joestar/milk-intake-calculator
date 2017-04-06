import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Intake_Form extends Component {

/*    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const initData = {
            "firstName": this.props.currentUser.firstName,
            "lastName": this.props.currentUser.lastName,
            "sex": this.props.currentUser.sex,
            "email": this.props.userEmail,
            "phoneNumber": this.props.currentUser.phoneNumber
        };

        this.props.initialize(initData);
    }*/


    render() {
        const { handleSubmit, fields: { sex, age, weight_pounds, weight_ounces, feeding_intake, avg_number_feedings } } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <div className="form-group">
                    <label htmlFor="sex">Sex*</label>
                    <select name="sex" className="form-control">
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age (months)*</label>
                    <select name="age" className="form-control">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="weight_pounds">Weight (lbs)*</label>
                    <select name="weight_pounds" className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="weight_ounces">Weight (oz)*</label>
                    <select name="weight_ounces" className="form-control">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="feeding_intake">Per Feeding Intake (g)</label>
                    <Field name="feeding_intake" component="input" type="number" className="form-control"
                           placeholder="Enter value here:"/>
                </div>
                <div className="form-group">
                    <label htmlFor="avg_number_feedings">Average number of feedings per day</label>
                    <Field name="avg_number_feedings" component type="number" className="form-control"
                           placeholder="Enter value here:"/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'Intake_Form',
})(Intake_Form);
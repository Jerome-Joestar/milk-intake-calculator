import React, { Component } from 'react';
import { getWeightInKg } from '../helper';

export default class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.generateCalculations = this.generateCalculations.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    generateCalculations() {

        getWeightInKg(this.state.weight_pounds, this.state.weight_ounces);
        this.setState({ dailyRequiredOz: dailyRequiredOz });
        this.setState({ dailyRequiredMl: dailyRequiredMl });
        this.setState({ perFeedingMin: perFeedingMin });
        this.setState({ perFeedingMax: perFeedingMax });
        this.setState({ setFeedingsPerDayMin: setFeedingsPerDayMin });
        this.setState({ setFeedingsPerDayMax: setFeedingsPerDayMax });
        this.setState({ supplementFeedingUnknown: supplementFeedingUnknown });
        this.setState({ supplementFeedingKnown: supplementFeedingKnown });
    }

    handleInputChange(e) {
        let newState = {};
        newState[ e.target.name ] = e.target.value;
        this.setState(newState);
    }

    handleOnSubmit(e) {
        e.preventDefault();
        this.generateCalculations();
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
            <div>
                <form name="intake_form" onSubmit={ this.props.handleOnSubmit } data={this.state}>
                    <div className="form-group">
                        <label htmlFor="sex">Sex*</label>
                        <select name="sex" className="form-control" onChange={ this.handleInputChange }>
                            <option></option>
                            <option value="boy">Boy</option>
                            <option value="girl">Girl</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age (months)*</label>
                        <select name="age" className="form-control" onChange={ this.handleInputChange }>
                            <option></option>
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
                        <select name="weight_pounds" className="form-control" onChange={ this.handleInputChange }>
                            <option></option>
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
                        <label htmlFor="weight_ounces">Weight (oz)*</label>
                        <select name="weight_ounces" className="form-control" onChange={ this.handleInputChange }>
                            <option></option>
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
                        <label htmlFor="feeding_intake">Per Feeding Intake (g)</label>
                        <input name="feeding_intake"
                               onChange={ this.handleInputChange }
                               type="number" className="form-control"
                               placeholder="Enter value here:"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avg_number_feedings">Average number of feedings per day</label>
                        <input name="avg_number_feedings"
                               onChange={ this.handleInputChange }
                               type="number" className="form-control"
                               placeholder="Enter value here:"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleOnSubmit}>Calculate Results
                    </button>
                </form>
                {status}
                {optional}
            </div>
        );
    }
}

import React, { Component } from 'react';

var calculationHelper = require('../../helper_modules/calculations');

//Transform to class to keep state of values
class IntakeResults extends Component {
    componentWillMount() {
        const { age, weightPounds, weightOunces } = this.props;
        this.setStateValues(age, weightPounds, weightOunces);
    }

    componentWillReceiveProps(nextProps){
        const { age, weightPounds, weightOunces } = nextProps;
        this.setStateValues(age, weightPounds, weightOunces);
    }

    setStateValues(age, weightPounds, weightOunces) {
        const newWeight = calculationHelper.getWeightInKg(weightPounds, weightOunces);
        const baseRequired = calculationHelper.getDailyRequiredIntake(age, newWeight);
        const requiredOz = calculationHelper.getDailyRequiredIntakeOz(baseRequired);
        const requiredMl = calculationHelper.getDailyRequiredIntakeMl(requiredOz);


        this.setState({
            weightInKg: newWeight,
            requiredDailyIntake: baseRequired,
            requiredDailyOz: requiredOz,
            requiredDailyMl: requiredMl
        });
    }

    render() {
        const { feedingIntake, avgNumberFeedings } = this.props;
        if (feedingIntake) {
            var feedingIntakeContainer =
                <div className="alert alert-info">
                    <p><strong>Supplement Feeding: </strong>{calculationHelper.getSupplementFeeding(this.state.requiredDailyMl, feedingIntake)} ml</p>
                    { avgNumberFeedings &&
                    <p><strong>Supplement feedings (avg feeding per day
                        known): </strong>{calculationHelper.getSupplementFeeding(this.state.requiredDailyMl, feedingIntake, avgNumberFeedings)} ml</p> }
                </div>
        }

        return (
            <div>
                <div className="alert alert-success">
                    <p><strong>Daily milk intake required: </strong>{this.state.requiredDailyOz} oz</p>
                    <p><strong>Daily milk intake required: </strong>{this.state.requiredDailyMl} ml</p>
                    <p><strong>Per feeding needs: </strong>{calculationHelper.getPerFeeding(this.state.requiredDailyOz, 12)} oz
                        - {calculationHelper.getPerFeeding(this.state.requiredDailyOz, 8)} oz</p>
                    <p><strong>8-12 feedings per day: </strong>{calculationHelper.getFeedingsPerDay(this.state.requiredDailyMl, 12)} ml
                        - {calculationHelper.getFeedingsPerDay(this.state.requiredDailyMl, 8)} ml</p>
                </div>
                {feedingIntakeContainer}
            </div>
        );
    }
}

export { IntakeResults };

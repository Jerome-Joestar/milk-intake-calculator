const ozToKgMultiplier = 0.0283495;
const mlPerOz = 28.4;
const kcalPerMlMilk = 0.65;
const kcalPerOzMilk = 20;
const boy = [ '107', '107', '107', '95', '82', '82', '82' ];
const girl = [ '104', '104', '104', '95', '82', '82', '82' ];

export function getWeightInKg(weightPounds, weightOunces) {
    //weightCalc =
    return ((parseInt(weightPounds) * 16) + parseInt(weightOunces)) * ozToKgMultiplier;
}

export function getDailyRequiredIntake() {
    //required =
    return weightCalc * (helperValues[ this.state.sex ][ this.state.age ])
}

export function getDailyRequiredIntakeOz() {
    //dailyRequiredOz =
    return (required / kcalPerOzMilk).toFixed(1);
}

export function getDailyRequiredIntakeMl() {
    //dailyRequiredMl =
    return Math.round(required / helperValues.kcalPerMlMilk);
}

export function getPerFeedingMin() {
    //perFeedingMin =
    return (dailyRequiredOz / 12).toFixed(1);
}

export function getPerFeedingMax() {
    //perFeedingMax =
    return (dailyRequiredOz / 8).toFixed(1);
}

export function getFeedingsPerDayMin() {
    //setFeedingsPerDayMin =
    return Math.round((dailyRequiredMl / 12));
}

export function getFeedingsPerDayMax() {
    //setFeedingsPerDayMax =
    return Math.round((dailyRequiredMl / 8));
}

export function getSupplementFeedingUnkown() {
    //supplementFeedingUnknown =
    return Math.round((dailyRequiredMl / 10) - this.state.feeding_intake);
}

export function getSupplementFeedingKnown() {
    //supplementFeedingKnown =
    return Math.round((dailyRequiredMl / this.state.avg_number_feedings) - this.state.feeding_intake);
}

const ozToKgMultiplier = 0.453592;
const kcalPerMlMilk = 0.65;
const kcalPerOzMilk = 20;
const valueLookup = {
    weightInKg: 0,
    requiredIntake: 0,
    dailyRequiredOz: 0,
    dailyRequiredMl: 0
}

function getWeightInKg(weightPounds, weightOunces) {
    weightOunces = parseInt(weightOunces);
    valueLookup.weightInKg = ((weightPounds * 16) + weightOunces) * ozToKgMultiplier;
    return valueLookup.weightInKg;
}

function getDailyRequiredIntake(age) {
    age = parseInt(age);
    var basedOnAgeValue = age > 3 ? 56 : 175;
    valueLookup.requiredIntake = ((89 * valueLookup.weightInKg) - 100) + basedOnAgeValue;
    return valueLookup.requiredIntake;
}

function getDailyRequiredIntakeOz() {
    valueLookup.dailyRequiredOz = (valueLookup.requiredIntake / kcalPerOzMilk).toFixed(1);
    return valueLookup.dailyRequiredOz;
}

function getDailyRequiredIntakeMl() {
    valueLookup.dailyRequiredMl = Math.round(valueLookup.requiredIntake / kcalPerMlMilk);
    return valueLookup.dailyRequiredMl;
}

function getPerFeedingMin() {
    return (valueLookup.dailyRequiredOz / 12).toFixed(1);
}

function getPerFeedingMax() {
    return (valueLookup.dailyRequiredOz / 8).toFixed(1);
}

function getFeedingsPerDayMin() {
    return Math.round((valueLookup.dailyRequiredMl / 12));
}

function getFeedingsPerDayMax() {
    return Math.round((valueLookup.dailyRequiredMl / 8));
}

function getSupplementFeedingUnknown(feedingIntake) {
    return Math.round((valueLookup.dailyRequiredMl / 10) - feedingIntake);
}

function getSupplementFeedingKnown(feedingIntake, avgNumberFeedings) {
    return Math.round((valueLookup.dailyRequiredMl / avgNumberFeedings) - feedingIntake);
}

export function generateResults({ age, weight_pounds, weight_ounces, feeding_intake, avg_number_feedings }) {

    //TODO Figure out why values remain strings


    let newStates = [];
    newStates.push({ weightInKg: getWeightInKg(weight_pounds, weight_ounces) });
    newStates.push({ requiredIntake: getDailyRequiredIntake(age) });
    newStates.push({ dailyRequiredOz: getDailyRequiredIntakeOz() });
    newStates.push({ dailyRequiredMl: getDailyRequiredIntakeMl() });
    newStates.push({ perFeedingMin: getPerFeedingMin() });
    newStates.push({ perFeedingMax: getPerFeedingMax() });
    newStates.push({ setFeedingsPerDayMin: getFeedingsPerDayMin() });
    newStates.push({ setFeedingsPerDayMax: getFeedingsPerDayMax() });

    if (feeding_intake) {
        newStates.push({ supplementFeedingUnknown: getSupplementFeedingUnknown(feeding_intake) });
        if (avg_number_feedings) {
            newStates.push({ supplementFeedingKnown: getSupplementFeedingKnown(feeding_intake, avg_number_feedings) });
        }
    }
    return newStates;
}

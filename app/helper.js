const ozToKgMultiplier = 0.0283495;
const kcalPerMlMilk = 0.65;
const kcalPerOzMilk = 20;
const valueLookup = {
    boy: [ '107', '107', '107', '95', '82', '82', '82' ],
    girl: [ '104', '104', '104', '95', '82', '82', '82' ],
    weightInKg: 0,
    requiredIntake: 0,
    dailyRequiredOz: 0,
    dailyRequiredMl: 0
}

function getWeightInKg(weightPounds, weightOunces) {
    valueLookup.weightInKg = ((weightPounds * 16) + weightOunces) * ozToKgMultiplier;
    console.log(valueLookup.weightInKg)
    return valueLookup.weightInKg;
}

function getDailyRequiredIntake(sex, age) {
    valueLookup.requiredIntake = valueLookup.weightInKg * (valueLookup[ sex ][ age ]);
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

export function generateResults(weightPounds, weightOunces, sex, age, feedingIntake, avgNumberFeedings) {
    let newStates = [];
    newStates.push({ weightInKg: getWeightInKg(weightPounds, weightOunces) });
    newStates.push({ requiredIntake: getDailyRequiredIntake(sex, age) });
    newStates.push({ dailyRequiredOz: getDailyRequiredIntakeOz() });
    newStates.push({ dailyRequiredMl: getDailyRequiredIntakeMl() });
    newStates.push({ perFeedingMin: getPerFeedingMin() });
    newStates.push({ perFeedingMax: getPerFeedingMax() });
    newStates.push({ setFeedingsPerDayMin: getFeedingsPerDayMin() });
    newStates.push({ setFeedingsPerDayMax: getFeedingsPerDayMax() });

    if (feedingIntake) {
        newStates.push({ supplementFeedingUnknown: getSupplementFeedingUnknown(feedingIntake) });
        if (avgNumberFeedings) {
            newStates.push({ supplementFeedingKnown: getSupplementFeedingKnown(feedingIntake, avgNumberFeedings) });
        }
    }
    return newStates;
}

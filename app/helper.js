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
    return valueLookup.weightInKg;
}

function getDailyRequiredIntake(weightInKg, sex, age) {
    valueLookup.requiredIntake = weightInKg * (valueLookup[ sex ][ age ]);
    return valueLookup.requiredIntake;
}

function getDailyRequiredIntakeOz(requiredIntake) {
    valueLookup.dailyRequiredOz = (requiredIntake / kcalPerOzMilk).toFixed(1);
    return valueLookup.dailyRequiredOz;
}

function getDailyRequiredIntakeMl(requiredIntake) {
    valueLookup.dailyRequiredMl = Math.round(requiredIntake / kcalPerMlMilk);
    return valueLookup.dailyRequiredMl;
}

function getPerFeedingMin(dailyRequiredOz) {
    return (dailyRequiredOz / 12).toFixed(1);
}

function getPerFeedingMax(dailyRequiredOz) {
    return (dailyRequiredOz / 8).toFixed(1);
}

function getFeedingsPerDayMin(dailyRequiredMl) {
    return Math.round((dailyRequiredMl / 12));
}

function getFeedingsPerDayMax(dailyRequiredMl) {
    return Math.round((dailyRequiredMl / 8));
}

function getSupplementFeedingUnknown(dailyRequiredMl, feedingIntake) {
    return Math.round((dailyRequiredMl / 10) - feedingIntake);
}

function getSupplementFeedingKnown(dailyRequiredMl, feedingIntake, avgNumberFeedings) {
    return Math.round((dailyRequiredMl / avgNumberFeedings) - feedingIntake);
}

export function generateResults(weightPounds, weightOunces, sex, age, feedingIntake, avgNumberFeedings) {
    let newStates = [];
    newStates.push({ weightInKg: getWeightInKg(weightPounds, weightOunces) });
    newStates.push({ requiredIntake: getDailyRequiredIntake(valueLookup.weightInKg, sex, age) });
    newStates.push({ dailyRequiredOz: getDailyRequiredIntakeOz(valueLookup.requiredIntake) });
    newStates.push({ dailyRequiredMl: getDailyRequiredIntakeMl(valueLookup.requiredIntake) });
    newStates.push({ perFeedingMin: getPerFeedingMin(valueLookup.dailyRequiredOz) });
    newStates.push({ perFeedingMax: getPerFeedingMax(valueLookup.dailyRequiredOz) });
    newStates.push({ setFeedingsPerDayMin: getFeedingsPerDayMin(valueLookup.dailyRequiredMl) });
    newStates.push({ setFeedingsPerDayMax: getFeedingsPerDayMax(valueLookup.dailyRequiredMl) });

    if (feedingIntake) {
        newStates.push({ supplementFeedingUnknown: getSupplementFeedingUnknown(valueLookup.dailyRequiredMl, feedingIntake) });
        if (avgNumberFeedings) {
            newStates.push({ supplementFeedingKnown: getSupplementFeedingKnown(valueLookup.dailyRequiredMl, feedingIntake, avgNumberFeedings) });
        }
    }

    return newStates;
}

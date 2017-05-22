const ozToKgMultiplier = 0.453592;
const ozToMlMultiplier = 29.5735;
const kcalPerOzMilk = 20;


function getWeightInKg(weightPounds, weightOunces) {
    return (weightPounds + (weightOunces / 16)) * ozToKgMultiplier;
}

function getDailyRequiredIntake(age, weightInKg) {
    var basedOnAgeValue = age > 3 ? 56 : 175;
    return ((89 * weightInKg) - 100) + basedOnAgeValue;
}

function getDailyRequiredIntakeOz(requiredIntake) {
    return parseInt(requiredIntake/kcalPerOzMilk).toFixed(1);
}

function getDailyRequiredIntakeMl(requiredIntakeOz) {
    return Math.round(requiredIntakeOz * ozToMlMultiplier);
}

function getPerFeeding(dailyRequiredOz, limitValue) {
    //For max value limitValue = 8, for min limitValue = 12
    return parseInt(dailyRequiredOz/limitValue).toFixed(1);
}

function getFeedingsPerDay(dailyRequiredMl, limitValue) {
    //For max value limitValue = 8, for min limitValue = 12
    return Math.round((dailyRequiredMl/limitValue));
}


function getSupplementFeeding(dailyRequiredMl, feedingIntake, avgNumberFeedings) {
    var divisor = avgNumberFeedings ? avgNumberFeedings : 10;
    return Math.round((dailyRequiredMl/divisor) - feedingIntake);
}

module.exports = {
    getWeightInKg: getWeightInKg,
    getPerFeeding: getPerFeeding,
    getFeedingsPerDay: getFeedingsPerDay,
    getDailyRequiredIntake: getDailyRequiredIntake,
    getDailyRequiredIntakeOz: getDailyRequiredIntakeOz,
    getDailyRequiredIntakeMl: getDailyRequiredIntakeMl,
    getSupplementFeeding: getSupplementFeeding,
}

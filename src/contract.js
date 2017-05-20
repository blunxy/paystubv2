'use strict';

var Schedule = require('./schedule');
var _earnings;

function Contract(name, contractDetails) {
    _earnings = [];
    generateSchedules(name, contractDetails);
}

function generateSchedules(name, contractDetails) {
    if (Array.isArray(contractDetails)) {
        generateMergedSchedules(name, contractDetails);
    }
    else {
        generateSimpleSchedules(name, contractDetails);
    }
}

function generateMergedSchedules(name, contractDetails) {
    var startingSchedule = buildSchedule("", contractDetails[0]);
    var followingSchedule = buildSchedule("", contractDetails[1]);
    var mergePosition = contractDetails[2];

    var mergedSchedule = Schedule.merge(startingSchedule, followingSchedule, mergePosition);
    mergedSchedule.name = name;
    
    _earnings.push(mergedSchedule);
}

function generateSimpleSchedules(name, contractDetails) {
    var schedule = buildSchedule(name, contractDetails);

    _earnings.push(schedule);
}


function buildSchedule(name, contractDetails) {
    var schedule = new Schedule(name);

    var payPerPayPeriod = contractDetails.salary;

    if (!!payPerPayPeriod) {
        schedule.generate([payPerPayPeriod]);
    }

    return schedule;
}


Contract.prototype.getEarningsSchedules = function() {
    return _earnings;
};

module.exports = Contract;

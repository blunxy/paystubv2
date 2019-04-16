'use strict';

var Schedule = require('./schedule');
var _earnings;

function Contract() {
    _earnings = [];
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
        if (!!contractDetails.semester) {
            
            var start = 1;
            var end = 24;
            switch (contractDetails.semester) {
                case 1:
                    end = 8;
                    break;
                case 2:
                    start = 9;
                    end = 12;
                    break;
                case 4:
                    start = 17;
                    break;
                default:
                    // code
            }
            schedule.generate([payPerPayPeriod], [start, end]);
        }
        else {
            schedule.generate([payPerPayPeriod]);
        }

    }

    return schedule;
}

Contract.prototype.addDetails = function(name, contractDetails) {
    if (Array.isArray(contractDetails)) {
        generateMergedSchedules(name, contractDetails);
    }
    else {
        generateSimpleSchedules(name, contractDetails);
    }
};

Contract.prototype.getEarningsSchedules = function() {
    return _earnings;
};

module.exports = Contract;

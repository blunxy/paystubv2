'use strict';

function Schedule(name) {
    this.name = name;
    this.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
}

//
// Populate the values array in a Schedule.
// You can do this one of these ways:
//      generate([A]) => fill the array just with A's
//      generate([A,B]) => fill the array with alternating A's and B's
//      generate([A],[start, finish]) =>  fill the array from pos start to pos finish with A's
//      etc.
Schedule.prototype.generate = function(values, range) {
    checkGenerateParametersAndThrowErrorIfNecessary(values, range);
    
    var start = !!range ? range[0] - 1 : 0;
    var end = !!range ? range[1] - 1 : 23;

    for (var i = start; i <= end; i++) {
        this.values[i] = values[0];
        values.push(values.shift());  // this punts the head of values to the back
    }
  
};

function checkGenerateParametersAndThrowErrorIfNecessary(values, range) {
    if (!Array.isArray(values)) {
        throw new Error("expected first argument to be an array");
    }
    
    if (!!range && !Array.isArray(range)) {
        throw new Error("expected second argument to be an array");
    }
    
    if (!!range && !isValidRange(range)) {
        throw new Error("expected second argument to be a valid 2-number range");
    }
}


function isValidRange(range) {
    return range.length == 2 && range[0] >= 1 && range[1] <= 24 && range[0] <= range[1];
}

//
// Merge two schedules together.
// Mush their name together with a =>
// schedule1's values will be in the resulting merged schedules
// values until mergePosition - 1, after that, it's all the 
// values from schedule2.
var merge = function(schedule1, schedule2, mergePosition) {
    checkMergeParametersAndThrowErrorIfNecessary(mergePosition);
    
    var mergedName = schedule1.name + "=>" + schedule2.name;
    
    var merged = new Schedule(mergedName);
    merged.values = joinArrays(schedule1.values, schedule2.values, mergePosition);
    
    return merged;
};

function checkMergeParametersAndThrowErrorIfNecessary(mergePosition) {
    if (!Number.isInteger(mergePosition)) {
        throw new Error("expected third argument to be a number between 1 and 24");
    }
    
    if (mergePosition < 1 || mergePosition > 24) {
        throw new Error("expected third argument to be a number between 1 and 24");
    }
}

function joinArrays(arr1, arr2, mergePosition) {
    var startValues = arr1.slice(0, mergePosition-1);
    var appendedValues = arr2.slice(mergePosition-1);
    return startValues.concat(appendedValues);
}

module.exports = Schedule;
module.exports.merge = merge;
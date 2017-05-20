function Schedule(name) {
    this.name = name;
    this.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
}

Schedule.prototype.generate = function(values, range) {
    if (!Array.isArray(values)) {
        throw new Error("expected first argument to be an array");
    }
    
    if (!!range && !Array.isArray(range)) {
        throw new Error("expected second argument to be an array");
    }
    
    if (!!range && (range.length != 2 || range[0] < 1 || range[1] > 24 || range[0] > range[1])) {
        throw new Error("expected second argument to be a valid 2-number range");
    }
    
    var start = !!range ? range[0] - 1 : 0;
    var end = !!range ? range[1] - 1 : 23;

    for (var i = start; i <= end; i++) {
        this.values[i] = values[0];
        values.push(values.shift());
    }
  
};

var merge = function(schedule1, schedule2, mergeIndex) {
    if (!Number.isInteger(mergeIndex)) {
        throw new Error("expected third argument to be a number between 1 and 24");
    }
    
    if (mergeIndex < 1 || mergeIndex > 24) {
        throw new Error("expected third argument to be a number between 1 and 24");
    }
    
    var mergedName = schedule1.name + "=>" + schedule2.name;
    
    
    var merged = new Schedule(mergedName);
    
    merged.values = schedule1.values.slice(0, mergeIndex-1);
    
    var appendedValues = schedule2.values.slice(mergeIndex-1);
    merged.values = merged.values.concat(appendedValues);
    
    return merged;
};

module.exports = Schedule;
module.exports.merge = merge;
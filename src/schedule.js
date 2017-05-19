function Schedule(name) {
    this.name = name;
}

Schedule.prototype.getName = function() {
    return this.name;
};

module.exports = Schedule;
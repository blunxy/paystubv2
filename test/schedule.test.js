'use strict';

var chai = require("chai");
chai.should();

var Schedule = require('../src/schedule');

describe('Schedule', function() {

    describe('an new schedule', function() {

        it('has a name', function() {
            var schedule = new Schedule("a schedule");

            schedule.name.should.equal("a schedule");
        });

        it('has values - an array of 24 0s', function() {
            var schedule = new Schedule("a schedule");

            schedule.values.should.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

    });

    describe('generate', function() {
        var schedule;
        beforeEach(function() {
            schedule = new Schedule("a schedule");
        });

        it('requires the first argument to be an array', function() {
            (function() {
                schedule.generate();
            }).should.throw("expected first argument to be an array");

            (function() {
                schedule.generate("foo");
            }).should.throw("expected first argument to be an array");

            (function() {
                schedule.generate(1);
            }).should.throw("expected first argument to be an array");
        });

        it('requires the second argument, if it exists, to be an array', function() {
            (function() {
                schedule.generate([1], 1);
            }).should.throw("expected second argument to be an array");

            (function() {
                schedule.generate([1], "s");
            }).should.throw("expected second argument to be an array");
        });

        it('requires the second argument, if it exists, to be a valid 2-number range', function() {
            (function() {
                schedule.generate([1], [1]);
            }).should.throw("expected second argument to be a valid 2-number range");

            (function() {
                schedule.generate([1], [0, 24]);
            }).should.throw("expected second argument to be a valid 2-number range");

            (function() {
                schedule.generate([1], [1, 25]);
            }).should.throw("expected second argument to be a valid 2-number range");

            (function() {
                schedule.generate([1], [3, 2]);
            }).should.throw("expected second argument to be a valid 2-number range");

            (function() {
                schedule.generate([1], [1, 2, 3]);
            }).should.throw("expected second argument to be a valid 2-number range");
        });

        it('can generate one number, repeated 24 times', function() {
            schedule.generate([1]);

            schedule.values.should.deep.equal([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        });

        it('can generate one number, in a given range at end', function() {
            schedule.generate([1], [23, 24]);

            schedule.values.should.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
        });

        it('can generate one number, in a given range in the middle', function() {
            schedule.generate([1], [3, 5]);

            schedule.values.should.deep.equal([0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('can generate one number, in a given range at the start', function() {
            schedule.generate([1], [1, 2]);

            schedule.values.should.deep.equal([1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('can generate a sequence of numbers repeating from start to finish', function() {
            schedule.generate([1, 2]);

            schedule.values.should.deep.equal([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);
        });

        it('can generate a sequence of numbers repeating in a given range at the end', function() {
            schedule.generate([1, 2], [21, 24]);

            schedule.values.should.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2]);
        });

        it('can generate a sequence of numbers repeating in a given range at the start', function() {
            schedule.generate([1, 2], [1, 3]);

            schedule.values.should.deep.equal([1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

        it('can generate a sequence of numbers repeating in a given range in the middle', function() {
            schedule.generate([1, 2], [5, 8]);

            schedule.values.should.deep.equal([0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });

    });

    describe('merge', function() {
        var schedule1;
        var schedule2;
        beforeEach(function() {
            schedule1 = new Schedule("schedule_1");
            schedule1.generate([1]);

            schedule2 = new Schedule("schedule_2");
            schedule2.generate([2]);
        });

        it('requires the third argument to be an integer', function() {
            (function() {
                Schedule.merge(schedule1, schedule2);
            }).should.throw(Error);

            (function() {
                Schedule.merge(schedule1, schedule2, "foo");
            }).should.throw(Error);
        });

        it('requires the third argument to be a valid ingeger between 1 and 24', function() {
            (function() {
                Schedule.merge(schedule1, schedule2, 0);
            }).should.throw(Error);

            (function() {
                Schedule.merge(schedule1, schedule2, 25);
            }).should.throw(Error);
        });

        it('returns a properly merged schedule if mergeIndex between 1 and 24', function() {
            var expectedName = schedule1.name + "=>" + schedule2.name;

            var expectedMerge = new Schedule(expectedName);

            expectedMerge.values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
            Schedule.merge(schedule1, schedule2, 1).should.be.deep.equal(expectedMerge);


            expectedMerge.values = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
            Schedule.merge(schedule1, schedule2, 2).should.be.deep.equal(expectedMerge);

            expectedMerge.values = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2];
            Schedule.merge(schedule1, schedule2, 23).should.be.deep.equal(expectedMerge);
            
            expectedMerge.values = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
            Schedule.merge(schedule1, schedule2, 24).should.be.deep.equal(expectedMerge);
        });
 

    });

});

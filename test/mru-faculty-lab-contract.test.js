'use strict';

var chai = require("chai");
chai.should();

var ContractFactory = require('../src/contract-factory');
var Schedule = require('../src/schedule');

describe('MRUFacultyLabContract', function() {

    var contractFactory;
    beforeEach(function() {
        contractFactory = ContractFactory.getInstance();
    });


    describe('getEarningsSchedules', function() {

        it('returns a schedule with vacation pay too - fall', function() {
            var contractDetails = {
                hourlySalary: 4849,
                hoursPerWeek: 1,
                semester: 4
            };
            var contract = contractFactory.createMRUFacultyLabContract(contractDetails);

            var expectedLectureSchedule = new Schedule("mru lab pay");
            var lecPay = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 15 / 8);
            expectedLectureSchedule.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, lecPay, lecPay, lecPay, lecPay, lecPay, lecPay, lecPay, lecPay];

            var expectedHolidaySchedule = new Schedule("mru holiday pay");
            var holPay = Math.round(lecPay * 0.08);
            expectedHolidaySchedule.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, holPay, holPay, holPay, holPay, holPay, holPay, holPay, holPay];

            contract.getEarningsSchedules().should.deep.equal([expectedLectureSchedule, expectedHolidaySchedule]);
        });

        it('returns a schedule with vacation pay too - winter', function() {
            var contractDetails = {
                hourlySalary: 4849,
                hoursPerWeek: 1,
                semester: 1
            };
            var contract = contractFactory.createMRUFacultyLabContract(contractDetails);

            var expectedLectureSchedule = new Schedule("mru lab pay");
            var lecPay = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 15 / 8);
            expectedLectureSchedule.values = [lecPay, lecPay, lecPay, lecPay, lecPay, lecPay, lecPay, lecPay, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            var expectedHolidaySchedule = new Schedule("mru holiday pay");
            var holPay = Math.round(lecPay * 0.08);
            expectedHolidaySchedule.values = [holPay, holPay, holPay, holPay, holPay, holPay, holPay, holPay, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            contract.getEarningsSchedules().should.deep.equal([expectedLectureSchedule, expectedHolidaySchedule]);
        });

        it('returns a schedule with vacation pay too - spring', function() {
            var contractDetails = {
                hourlySalary: 4849,
                hoursPerWeek: 1,
                semester: 2
            };
            var contract = contractFactory.createMRUFacultyLabContract(contractDetails);

            var expectedLectureSchedule = new Schedule("mru lab pay");
            var lecPay = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 15 / 8);
            expectedLectureSchedule.values = [0, 0, 0, 0, 0, 0, 0, 0, lecPay, lecPay, lecPay, lecPay, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            var expectedHolidaySchedule = new Schedule("mru holiday pay");
            var holPay = Math.round(lecPay * 0.08);
            expectedHolidaySchedule.values = [0, 0, 0, 0, 0, 0, 0, 0, holPay, holPay, holPay, holPay, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            contract.getEarningsSchedules().should.deep.equal([expectedLectureSchedule, expectedHolidaySchedule]);
        });

    });

});

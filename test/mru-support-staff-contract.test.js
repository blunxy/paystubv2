'use strict';

var chai = require("chai");
chai.should();

var ContractFactory = require('../src/contract-factory');
var Schedule = require('../src/schedule');

describe('MRUFullTimeSupportStaffContract', function() {

    var contractFactory;
    beforeEach(function() {
        contractFactory = ContractFactory.getInstance();
    });


    describe('getEarningsSchedules', function() {

        it('returns a schedule with the same salary repeated when there is no new contract or pay bump', function() {
            var contractDetails = {
               salary: 397050
            };
            var contract = contractFactory.createMRUFullTimeSuportStaffContract(contractDetails);

            var expectedSchedule = new Schedule("mru support staff");
            expectedSchedule.values = [397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050];


            contract.getEarningsSchedules().should.deep.equal([expectedSchedule]);
        });


        it('returns a schedule with a salary schedule that changes if there was a grid change during the year', function() {
            // go from step 5 to 6 starting pay period 4 (late Feb)
            var contractDetails = [{
                    salary: 349579
                }, {
                    salary: 363458
                },
                4
            ];
            var contract = contractFactory.createMRUFullTimeSuportStaffContract(contractDetails);

            var expectedSchedule = new Schedule("mru support staff");
            expectedSchedule.values = [349579, 349579, 349579, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458, 363458];

            contract.getEarningsSchedules().should.deep.equal([expectedSchedule]);
        });

    });

});

'use strict';

var chai = require("chai");
chai.should();

var MRUContractFactory = require('../src/mru-contract-factory');


describe.skip('MRUFullTimeSupportStaffContract', function() {
    
    describe('getEarningsSchedules', function() {
        
        describe('no changes to pay rate over the year', function() {
            var options = {
            
            };
            var mruContractFactory = new MRUContractFactory(options);
            
            it('should throw an error if the grid level isn\'t available', function() {
                var contractDetails = {
                    gridLevel: 0,
                    gridStep: 9 
                };
                var contract = mruContractFactory.getMRUFullTimeSupportStaffContract(contractDetails);
                
                (function() {
                    contract.getEarningsSchedules();
                }).should.throw('no thing');
            });
            
            it('should return the schedule at that level', function() {
                var contractDetails = {
                    gridLevel: 30,
                    gridStep: 9 
                };
                var contract = mruContractFactory.getMRUFullTimeSupportStaffContract(contractDetails);
                
                const expectedSchedule = {
                    name: 'contract pay',
                    values: [397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050, 397050]
                };
                
                contract.getEarningsSchedules().should.deep.equal(expectedSchedule);
            });
        
        }); 
           
    });  
    
});
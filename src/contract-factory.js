'use strict';

var Contract = require('./contract');


function ContractFactory() {
    const HOLIDAY_RATE = 0.08;


    var createMRUFullTimeSuportStaffContract = function(contractDetails) {

        var contract = new Contract();
        contract.addDetails("mru support staff", contractDetails);

        return contract;
    };

    var createMRUFacultyLectureContract = function(contractDetails) {
        var contract = new Contract();

        var lecSalary = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 16 / 8);
        contractDetails.salary = lecSalary;
        contract.addDetails("mru lecture pay", contractDetails);

        
        var holidaySalary = Math.round(lecSalary * HOLIDAY_RATE);
        contractDetails.salary = holidaySalary;
        contract.addDetails("mru holiday pay", contractDetails);


        return contract;
    };
    
    var createMRUFacultyTutorialContract = function(contractDetails) {
        var contract = new Contract();

        var tutSalary = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 16 / 8);
        contractDetails.salary = tutSalary;
        contract.addDetails("mru tutorial pay", contractDetails);

        
        var holidaySalary = Math.round(tutSalary * HOLIDAY_RATE);
        contractDetails.salary = holidaySalary;
        contract.addDetails("mru holiday pay", contractDetails);


        return contract;
    };
    
    var createMRUFacultyLabContract = function(contractDetails) {
        var contract = new Contract();

        var labSalary = Math.round(contractDetails.hourlySalary * contractDetails.hoursPerWeek * 15 / 8);
        contractDetails.salary = labSalary;
        contract.addDetails("mru lab pay", contractDetails);

        
        var holidaySalary = Math.round(labSalary * HOLIDAY_RATE);
        contractDetails.salary = holidaySalary;
        contract.addDetails("mru holiday pay", contractDetails);


        return contract;
    };

    return {
        createMRUFullTimeSuportStaffContract: createMRUFullTimeSuportStaffContract,
        createMRUFacultyLectureContract: createMRUFacultyLectureContract,
        createMRUFacultyTutorialContract: createMRUFacultyTutorialContract,
        createMRUFacultyLabContract: createMRUFacultyLabContract
    };

}

module.exports = {
    getInstance: ContractFactory
};

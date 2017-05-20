'use strict';

var Contract = require('./contract');

function ContractFactory() {

    var createMRUFullTimeSuportStaffContract = function(contractDetails) {
        
        var contract = new Contract("mru support staff", contractDetails);
        
        return contract;
    };

    return {
        createMRUFullTimeSuportStaffContract: createMRUFullTimeSuportStaffContract
    };

}

module.exports = {
    getInstance: ContractFactory
};

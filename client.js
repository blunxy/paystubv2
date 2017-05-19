// var mruPayStubSchedule = PayStubScheduleFactory.createMRUPayStubSchedule();


// var mruContractFactory = new MruContractFactory(yearSpecificDetails);

// var contractDetails = {
//     gridLevel: 30,
//     gridStep: 9
// }
// var mruIAContract = mruContractFactory.createFullTimeSupportStaffContract(contractDetails);
// mruPayStubSchedule.addContract(mruIAContract);

// var contractDetails = {
//     lecHoursPerWeek: 3,
//     tutHoursPerWeek: 2,
//     labHoursPerWeek: 2,
//     gridStep: 2,
//     gridCategory: 1,
//     semester: 1
// }
// var mru1501Contract = mruContractFactory.createFacultyContract(contractDetails);
// mruPayStubSchedule.addContract(mru1501Contract);

// I think taxable benefits should already be "in" the paystub schedule, as
// are deductions

// var govtDedCalc = GovtDeductionCalculatorFactory.createCalculator(2017);
// mruPayStubSchedule.addGovtDeductionCalculator(govtDedCalc)


// after all that setup, we can now do stuff like this:
// mruPayStubSchedule.getStub(3); => get the pay stub for mid-Feb
// mruPayStubSchedule.getNetIncome(); => how much money goes to pocket for year
// 
// Also, for use in the income tax calcs, we need the following:
// .getTotalCPPDeducted()
// .getTotalEIDeducted()
// .getTotalUnionDuesDeducted()
// .getTotalRPPDeducted()
// .getTotalTaxDeducted()

// .getEmploymentIncome()  // used in box 14 of T4, this includes all earnings + taxable benefits!



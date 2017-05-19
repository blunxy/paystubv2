'use strict';

var chai = require("chai");
chai.should();

var Schedule = require('../src/schedule');

describe('Schedule', function() {
   
   describe('an empty schedule', function() {
      
        it('has a name', function() {
           var schedule = new Schedule("a schedule");
           
           schedule.name.should.equal("a schedule");
        });
       
   });
    
});
'use strict';

var chai = require("chai");
var expect = chai.expect;
var sinon = require('sinon');
chai.should();


var isEven = function(val) {
    return val % 2 === 0;
};

describe('sinon test', function() {
    var student;
    
    beforeEach(function() {
        student = {
            dropClass: function(classId, callback) {
                // something
                callback();
            }    
        };
    });
    it ('should deplode', function() {
        var callback = function(){};
        var spy = sinon.spy(callback);
        student.dropClass(1, spy);
        
        spy.called.should.be.true;
        
    });
});
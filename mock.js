var EventEmitter  = require('events').EventEmitter;
var sinon         = require('sinon');

/*
 * return a mock PR response
 */
var nextNumber = 1;
exports.pr = function mockPr () {
  return {
    number: nextNumber++,
    labels: []
  }
};

/*
 * return a mock instance of poppins
 *
 * an event emitter with some APIs stapled on
 */
exports.poppins = function makeMock () {
  var mock = new EventEmitter();
  mock.plugins = {};

  mock.rest = {issues: {edit: sinon.spy() } };

  mock.simulatePrCreated = function (pr) {
    mock.emit('pullRequestOpened', {pull_request: pr});
  };

  mock.createComment = sinon.spy();

  return mock;
};

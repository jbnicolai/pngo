var assert = require('assert');
var path = require('path');
var fs = require('fs');
var rm = require('rimraf');
var PNGO = require('../');

describe('pngo', function () {

  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should minify a PNG', function (callback) {

    var before = path.join(__dirname, 'fixtures/test.png');
    var after = path.join(__dirname, 'tmp/test.png');
    fs.writeFileSync(after, fs.readFileSync(before));

    new PNGO(after).optimize(function (error, data) {
      
      assert(!error);
      assert(data.before.size > data.after.size);
      
      callback();
    });
  });

  it('should minify a PNG (upper case file)', function (callback) {

    var before = path.join(__dirname, 'fixtures/test-uppercase.PNG');
    var after = path.join(__dirname, 'tmp/test-uppercase.PNG');
    fs.writeFileSync(after, fs.readFileSync(before));

    new PNGO(after).optimize(function (error, data) {

      assert(!error);
      assert(data.before.size > data.after.size);

      callback();
    });
  });
});
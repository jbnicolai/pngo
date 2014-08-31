var fs = require('fs');
var execFile = require('child_process').execFile;
var async = require('async');

var advpng = require('advpng-bin');
var optipng = require('optipng-bin');
var pngcrush = require('pngcrush-bin');
var pngquant = require('pngquant-bin');
var zopflipng = require('zopflipng-bin');

var PNGO = module.exports = function (target) {

  this.target = target;

  this.optimizers = [];
  this.optimizers.push({
    name: 'advpng',
    path: advpng.path,
    args: [
      '--recompress',
      '--shrink-extra',
      this.target
    ]
  });
  this.optimizers.push({
    name: 'pngcrush',
    path: pngcrush.path,
    args: [
      '-rem alla',
      '-rem text',
      '-brute',
      '-reduce',
      this.target
    ]
  });
  this.optimizers.push({
    name: 'pngquant',
    path: pngquant.path,
    args: [
      '--ext=.png',
      '--speed=1',
      '--force',
      '256',
      this.target
    ]
  });
  this.optimizers.push({
    name: 'zopflipng',
    path: zopflipng.path,
    args: [
      '-m',
      '--iterations=500',
      '--splitting=3',
      '--filters=01234mepb',
      '--lossy_8bit',
      '--lossy_transparent',
      this.target
    ]
  });
  this.optimizers.push({
    name: 'optipng',
    path: optipng.path,
    args: [
      '-i 1',
      '-strip all',
      '-fix',
      '-o7',
      '-force',
      this.target
    ]
  });
};

PNGO.prototype.optimize = function (callback) {

  var callback = callback || function () {};
  var target = this.target;
  var beforeSize = fs.statSync(target).size;
  var afterSize = 0;

  var functions = this.optimizers.map(function (optimizer) {
    return function (callback) {
      execFile(optimizer.path, optimizer.args, function () {
        callback(null, optimizer.name);
      });
    };
  });

  async.series(functions, function (error, result) {
    afterSize = fs.statSync(target).size;
    callback(error, {
      beforeSize: beforeSize,
      afterSize: afterSize
    });
  });
};
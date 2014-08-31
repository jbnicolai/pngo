#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var async = require('async');
var glob = require('glob');
var minimist = require('minimist');
var chalk = require('chalk');
var filesize = require('filesize');
var PNGO = require('./');

var argv = minimist(process.argv.slice(2));

var pngs = [];

argv._.filter(function (arg) {
  return fs.existsSync(arg);
}).forEach(function (arg) {
  if (fs.statSync(arg).isFile()) {
    pngs.push(path.resolve(arg));
  } else if (fs.statSync(arg).isDirectory()) {
    fs.readdirSync(arg).forEach(function(file) {
      pngs.push(path.resolve(path.join(arg, file)));
    });
  } else {
    glob(arg, function (error, files) {
      if (error) {
        throw error;
      }
      files.forEach(function (file) {
        pngs.push(path.resolve(file));
      });
    });
  }
});

pngs = pngs.filter(function (png) {
  return path.extname(png).toLowerCase() === '.png';
});

async.eachLimit(pngs, 10, function iterator(png) {
  new PNGO(png).optimize(function (error, data) {
    console.log(
      chalk.green('✔ ') + png,
      chalk.gray(' before=') + chalk.yellow(filesize(data.beforeSize)),
      chalk.gray(' after=') + chalk.cyan(filesize(data.afterSize)),
      chalk.gray(' reduced=') + chalk.green.underline(filesize(data.beforeSize - data.afterSize))
    );
  });
});
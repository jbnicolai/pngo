# [pngo](https://npmjs.org/package/pngo)

## About

Optimize PNG images.

[![Build Status](https://travis-ci.org/1000ch/pngo.svg?branch=master)](https://travis-ci.org/1000ch/pngo)
[![NPM version](https://badge.fury.io/js/pngo.svg)](http://badge.fury.io/js/pngo)
[![Dependency Status](https://david-dm.org/1000ch/pngo.svg)](https://david-dm.org/1000ch/pngo)
[![devDependency Status](https://david-dm.org/1000ch/pngo/dev-status.svg)](https://david-dm.org/1000ch/pngo#info=devDependencies)

## Usage

### as Node.js module

```js
var PNGO = require('pngo');
var pngo = new PNGO('target.png');
pngo.optimize(functoion (error, data) {
  if (error) {
    throw error;
  }
  console.log(data);
});
```

### Command line

```sh
$ pngo target.png
```

## License

MIT
/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain)
*/

var path = require ('path');
var dir = path.dirname (module.filename);

var pkg = require (path.join (dir, 'package.json'));
var app = require (path.join (dir));

var errors = 0;
var warnings = 0;
var queue = [];
var next = 0;
var geo;


// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
var config = {
  userId: process.env.GEOIP2WS_USERID || null,
  licenseKey: process.env.GEOIP2WS_LICENSE || null,
  service: process.env.GEOIP2WS_SERVICE || 'city',
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: process.env.GEOIP2WS_TIMEOUT || 5000
};

if (!config.userId || !config.licenseKey) {
  config.endpoint = 'https://frankl.in/u/ci_test.php?a=geoip2ws&b=';
}

geo = app (config);


/**
 * ANSI colorize a string
 *
 * @param color {String} - The color to add
 * @param str {String} - The string to alter
 * @returns {String}
 */

function colorStr (color, str) {
  var colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    gray: '\u001b[37m',
    bold: '\u001b[1m',
    plain: '\u001b[0m'
  };

  return colors [color] + str + colors.plain;
}


/**
 * console.log with style
 *
 * @param [type] {String=plain} - Formatting style
 * @param str {String} - The string to alter
 * @returns {void}
 */

function log (type, str) {
  if (!str) {
    str = type;
    type = 'plain';
  }

  switch (type) {
    case 'error': console.log (colorStr ('red', colorStr ('bold', 'ERR     ')) + str + '\n'); break;
    case 'fail': console.log (colorStr ('red', 'FAIL') + '    ' + str); break;
    case 'good': console.log (colorStr ('green', 'good') + '    ' + str); break;
    case 'warn': console.log (colorStr ('yellow', 'warn') + '    ' + str); break;
    case 'info': console.log (colorStr ('cyan', 'info') + '    ' + str); break;
    case 'note': console.log (colorStr ('bold', str)); break;
    case 'plain': default: console.log (str); break;
  }
}


/**
 * Detect and wrap string type
 *
 * @param str {String} - The string
 * @returns {String}
 */

function typeStr (str) {
  if (typeof str === 'string') {
    str = '"' + str + '"';
  } else if (str instanceof Object) {
    str = 'Object';
  } else if (str instanceof Array) {
    str = 'Array';
  } else if (str instanceof Error) {
    str = 'Error';
  }

  return colorStr ('magenta', str);
}

// handle exits
process.on ('exit', function () {
  console.log ();
  log ('info', errors + ' errors');
  log ('info', warnings + ' warnings');
  console.log ();

  if (errors) {
    process.exit (1);
  } else {
    process.exit (0);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log (err);
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});


/**
 * Queue to prevent flooding
 *
 * @returns {void}
 */

function doNext () {
  next++;
  if (queue [next]) {
    console.log ();
    queue [next] ();
  }
}


/**
 * doTest checks for error
 * else runs specified tests
 *
 * @param {Error} err
 * @param {String} label
 * @param {Array} tests
 * @returns {void}
 *
 * doTest(err, 'label text', [
 *   ['fail', 'feeds', typeof feeds, 'object'],
 *   ['warn', 'music', music instanceof Array, true],
 *   ['info', 'tracks', music.length]
 * ]);
 */

function doTest (err, label, tests) {
  var level = 'good';
  var test;
  var i;

  if (err instanceof Error) {
    log ('error', label);
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;

    doNext ();
    return;
  }

  log ('note', colorStr ('blue', '(' + (next + 1) + '/' + queue.length + ') ') + label);

  for (i = 0; i < tests.length; i++) {
    test = {
      level: tests [i] [0],
      label: tests [i] [1],
      result: tests [i] [2],
      expect: tests [i] [3]
    };

    if (test.result === test.expect) {
      log ('good', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is exactly ' + typeStr (test.expect));
    }

    if (test.level === 'fail' && test.result !== test.expect) {
      errors++;
      level = 'fail';
      log ('fail', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'warn' && test.result !== test.expect) {
      warnings++;
      level = level !== 'fail' && 'warn';
      log ('warn', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'info') {
      log ('info', colorStr ('blue', test.label) + ': ' + typeStr (test.result));
    }
  }

  doNext ();
}

// METHOD
queue.push (function () {
  doTest (null, 'module', [
    ['fail', 'function type', typeof geo, 'function']
  ]);
});


// Test success
queue.push (function () {
  geo ('74.125.206.100', function (err, data) {
    doTest (err, 'lookup', [
      ['fail', 'city name', !err && data && typeof data.city.names.en, 'string']
    ]);
  });
});


// Test errors
queue.push (function () {
  geo ('invalid input', function (err) {
    doTest (null, 'Error: invalid ip', [
      ['fail', 'type', err instanceof Error, true],
      ['fail', 'message', err.message, 'invalid ip']
    ]);
  });
});


queue.push (function () {
  geo ('invalid service', '74.125.206.100', function (err) {
    doTest (null, 'Error: invalid service', [
      ['fail', 'type', err instanceof Error, true],
      ['fail', 'message', err.message, 'invalid service']
    ]);
  });
});


queue.push (function () {
  geo ('0.0.0.0', function (err) {
    doTest (null, 'Error: API error', [
      ['fail', 'type', err instanceof Error, true],
      ['fail', 'message', err.message, 'API error']
    ]);
  });
});


queue.push (function () {
  var tmp = app (
    config.userId,
    config.licenseKey,
    config.service,
    1
  );

  tmp ('74.125.206.100', function (err) {
    doTest (null, 'Error: request timeout', [
      ['fail', 'type', err instanceof Error, true],
      ['fail', 'message', err.error.code, 'TIMEOUT']
    ]);
  });
});


// Start the tests
log ('note', 'Running tests...\n');
log ('note', 'Node.js:  ' + process.versions.node);
log ('note', 'Module:   ' + pkg.version);
console.log ();

queue [0] ();

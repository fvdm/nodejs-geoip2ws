/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain)
*/

var app = require ('./');

// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
var config = {
  userId: process.env.GEOIP2WS_USERID || null,
  licenseKey: process.env.GEOIP2WS_LICENSE || null,
  service: process.env.GEOIP2WS_SERVICE || 'city',
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: process.env.GEOIP2WS_TIMEOUT || 5000
}

if (!config.userId || !config.licenseKey) {
  config.endpoint = 'https://frankl.in/u/ci_test.php?a=geoip2ws&b=';
}

var geo = app (config);


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\u001b[1mDONE, no errors.\u001b[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\u001b[1mFAIL, '+ errors +' error'+  (errors > 1 ? 's' : '') +' occurred!\u001b[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue[next]) {
    queue[next] ();
  }
}

// doTest (passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error (label +': \u001b[1m\u001b[31mERROR\u001b[0m\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    tests.forEach (function (test) {
      if (test[1] !== true) {
        testErrors.push (test[0]);
        errors++;
      }
    });

    if (testErrors.length === 0) {
      console.log (label +': \u001b[1m\u001b[32mok\u001b[0m');
    } else {
      console.error (label +': \u001b[1m\u001b[31mfailed\u001b[0m  ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}

// METHOD
queue.push (function () {
  doTest (null, 'module', [
    ['function type', typeof geo === 'function']
  ]);
});


// Test success
queue.push (function () {
  geo ('74.125.206.100', function (err, data) {
    doTest (err, 'lookup', [
      ['city name', !err && data && typeof data.city.names.en === 'string']
    ]);
  });
});


// Test errors
queue.push (function () {
  geo ('invalid input', function (err) {
    doTest (null, 'Error: invalid ip', [
      ['type', err instanceof Error],
      ['message', err.message === 'invalid ip']
    ]);
  });
});


queue.push (function () {
  geo ('invalid service', '74.125.206.100', function (err) {
    doTest (null, 'Error: invalid service', [
      ['type', err instanceof Error],
      ['message', err.message === 'invalid service']
    ]);
  });
});


queue.push (function () {
  geo ('0.0.0.0', function (err) {
    doTest (null, 'Error: API error', [
      ['type', err instanceof Error],
      ['message', err.message === 'API error']
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
      ['type', err instanceof Error],
      ['message', err.error.code === 'TIMEOUT']
    ]);
  });
});


// Start the tests
queue[0] ();

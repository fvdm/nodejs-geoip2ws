var util = require ('util');
var app = require ('./');

// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (Travis CI)
// or user cli arguments: npm test --app_userid=1234 --app_license=abc123
var config = {
  userId: process.env.GEOIP2WS_USERID || null,
  licenseKey: process.env.GEOIP2WS_LICENSE || null,
  service: process.env.GEOIP2WS_SERVICE || 'city',
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: process.env.GEOIP2WS_TIMEOUT || 5000
}

var geo = app (config);


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+  (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
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
    console.error (label +': \033[1m\033[31mERROR\033[0m\n');
    console.error (util.inspect (err, false, 10, true));
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
      console.log (label +': \033[1m\033[32mok\033[0m');
    } else {
      console.error (label +': \033[1m\033[31mfailed\033[0m  ('+ testErrors.join (', ') +')');
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

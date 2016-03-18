/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain)
*/

var doTest = require ('dotest');
var app = require ('./');

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


// METHOD
doTest.add ('Module', function () {
  doTest.test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'geo', geo)
    .done ();
});

// Test success
doTest.add ('lookup', function () {
  geo ('74.125.206.100', function (err, data) {
    doTest.test (err)
      .isString ('fail', 'city name', data && data.city.names.en)
      .done ();
  });
});

// Test errors
doTest.add ('Error: invalid ip', function () {
  geo ('invalid input', function (err) {
    doTest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid ip')
      .done ();
  });
});

doTest.add ('Error: invalid service', function () {
  geo ('invalid service', '74.125.206.100', function (err) {
    doTest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid service')
      .done ();
  });
});

doTest.add ('Error: API error', function () {
  geo ('0.0.0.0', function (err) {
    doTest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .done ();
  });
});

doTest.add ('Error: request timeout', function () {
  var tmp = app (
    config.userId,
    config.licenseKey,
    config.service,
    1
  );

  tmp ('74.125.206.100', function (err) {
    doTest.test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isExactly ('fail', 'err.error.code', err && err.error.code, 'TIMEOUT')
      .done ();
  });
});


// Start the tests
doTest.run ();

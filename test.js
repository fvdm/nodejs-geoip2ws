/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
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


// TESTS
doTest.add ('Configuration', function (test) {
  if (!config.userId || !config.licenseKey) {
    config.endpoint = 'https://frankl.in/u/ci_test.php?a=geoip2ws&b=';

    test ()
      .warn ('GEOIP2WS_USERID or GEOIP2WS_LICENSE not set')
      .info ('Using test endpoint with fake data');
  } else {
    test ()
      .good ('userId and licenseKey are set')
      .info ('Using MaxMind endpoint with real data');
  }

  geo = app (config);

  test ()
    .info ('config.service:         ' + config.service)
    .info ('config.requestTimeout:  ' + config.requestTimeout)
    .done ();
});

// Module
doTest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', geo)
    .done ();
});

// Test success
doTest.add ('lookup - arguments', function (test) {
  geo ('74.125.206.100', function (err, data) {
    var names = data && data.city && data.city.names;
    var dataIP = data && data.traits && data.traits.ip_address;
    var dataSub = data && data.most_specific_subdivision.iso_code;

    test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.city', data && data.city)
      .isObject ('fail', 'data.city.names', names)
      .isExactly ('fail', 'data.city.names.en', names && names.en, 'Mountain View')
      .isExactly ('fail', 'data.traits.ip_address', dataIP, '74.125.206.100')
      .isExactly ('fail', 'data.most_specific_subdivision', dataSub, 'CA')

doTest.add ('lookup - object', function (test) {
  var obj = {
    ip: '74.125.206.100',
    service: config.service
  };

  geo (obj, function (err, data) {
    var names = data && data.city && data.city.names;
    var dataIP = data && data.traits && data.traits.ip_address;
    var dataSub = data && data.most_specific_subdivision.iso_code;

    test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.city', data && data.city)
      .isObject ('fail', 'data.city.names', names)
      .isExactly ('fail', 'data.city.names.en', names && names.en, 'Mountain View')
      .isExactly ('fail', 'data.traits.ip_address', dataIP, '74.125.206.100')
      .isExactly ('fail', 'data.most_specific_subdivision', dataSub, 'CA')
      .done ();
  });
});
      .done ();
  });
});

// Test errors
doTest.add ('Error: invalid ip', function (test) {
  geo ('invalid input', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid ip')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

doTest.add ('Error: invalid service', function (test) {
  geo ('invalid service', '74.125.206.100', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid service')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

doTest.add ('Error: API error', function (test) {
  geo ('0.0.0.0', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isString ('fail', 'err.code', err && err.code)
      .isNotEmpty ('warn', 'err.code', err && err.code)
      .isString ('fail', 'err.error', err && err.error)
      .isNotEmpty ('warn', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});

doTest.add ('Error: request timeout', function (test) {
  var tmp = app (config.userId, config.licenseKey, 1);

  tmp ('74.125.206.100', function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


// Start the tests
doTest.run ();

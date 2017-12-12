/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const doTest = require ('dotest');
const app = require ('./');

let geo;


// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
const config = {
  userId: process.env.GEOIP2WS_USERID || null,
  licenseKey: process.env.GEOIP2WS_LICENSE || null,
  service: process.env.GEOIP2WS_SERVICE || 'city',
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: process.env.GEOIP2WS_TIMEOUT || 5000
};


/**
 * Check common success response
 *
 * @param   {function}    test   Test specific function
 * @param   {Error|null}  err    Callback error
 * @param   {mixed}       data   Callback data
 * @param   {mixed}       [ret]  Method return value
 * @return  {void}
 */

function checkSuccess (test, err, data, ret) {
  const names = data && data.city && data.city.names;
  const dataIP = data && data.traits && data.traits.ip_address;
  const dataSub = data && data.most_specific_subdivision.iso_code;

  test (err)
    .isObject ('fail', 'data', data)
    .isObject ('fail', 'data.city', data && data.city)
    .isObject ('fail', 'data.city.names', names)
    .isExactly ('fail', 'data.city.names.en', names && names.en, 'Mountain View')
    .isExactly ('fail', 'data.traits.ip_address', dataIP, '74.125.206.100')
    .isExactly ('fail', 'data.most_specific_subdivision', dataSub, 'CA');

  if (!err && typeof ret !== 'undefined') {
    test()
      .isFunction ('fail', 'return', ret);
  }

  test()
    .done();
}


// TESTS
doTest.add ('Configuration'.test => {
  if (!config.userId || !config.licenseKey) {
    config.endpoint = 'https://frankl.in/u/ci_test.php?a=geoip2ws&b=';

    test()
      .warn ('GEOIP2WS_USERID or GEOIP2WS_LICENSE not set')
      .info ('Using test endpoint with fake data');
  }

  geo = app (config);

  test()
    .info ('config.service:         ' + config.service)
    .info ('config.requestTimeout:  ' + config.requestTimeout)
    .done();
});


// Module
doTest.add ('Module',test => {
  test()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', geo)
    .done();
});


// Test success
doTest.add ('lookup - arguments',test => {
  const ret = geo ('74.125.206.100',(err, data) => {
    checkSuccess (test, err, data, ret);
  });
});


doTest.add ('lookup - object',test => {
  const obj = {
    ip: '74.125.206.100',
    service: config.service
  };

  geo (obj,(err, data) => {
    checkSuccess (test, err, data);
  });
});


// Satellite IPs have no geo location
doTest.add ('lookup - data.subdivisions array',test => {
  geo ('95.107.128.1',(err, data) => {
    const dataIP = data && data.traits && data.traits.ip_address;

    test (err)
      .isArray ('fail', 'data.subdivisions', data.subdivisions)
      .isEmpty ('fail', 'data.subdivisions', data.subdivisions)
      .isExactly ('fail', 'data.traits.ip_address', dataIP, '95.107.128.1')
      .done();
  });
});


// Test errors
doTest.add ('Error: invalid ip',test => {
  geo ('invalid input',(err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid ip')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Error: invalid service',test => {
  geo ('invalid service', '74.125.206.100',(err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid service')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Error: API error',test => {
  geo ('0.0.0.0',(err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isString ('fail', 'err.code', err && err.code)
      .isNotEmpty ('warn', 'err.code', err && err.code)
      .isString ('fail', 'err.error', err && err.error)
      .isNotEmpty ('warn', 'err.error', err && err.error)
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Setup with arguments',test => {
  geo = app (config.userId, config.licenseKey, config.service, config.timeout);

  geo ('74.125.206.100',(err, data) => {
    checkSuccess (test, err, data);
  });
});


doTest.add ('Error: request timeout',test => {
  const tmp = app (config.userId, config.licenseKey, 1);

  tmp ('74.125.206.100',(err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


// Start the tests
doTest.run();

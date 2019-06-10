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
};

if (process.env.GEOIP2WS_SERVICE) {
  config.service = process.env.GEOIP2WS_SERVICE;
}

if (process.env.GEOIP2WS_ENDPOINT) {
  config.endpoint = process.env.GEOIP2WS_ENDPOINT;
}

if (process.env.GEOIP2WS_TIMEOUT) {
  config.requestTimeout = process.env.GEOIP2WS_TIMEOUT;
}


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
    .isExactly ('fail', 'data.city.names.en', names && names.en, 'Amsterdam')
    .isExactly ('fail', 'data.traits.ip_address', dataIP, '194.109.6.66')
    .isExactly ('fail', 'data.most_specific_subdivision', dataSub, 'NH');

  if (!err && typeof ret !== 'undefined') {
    test().isFunction ('fail', 'return', ret);
  }

  test().done();
}


// TESTS
doTest.add ('Configuration', test => {
  if (!config.userId || !config.licenseKey) {
    config.endpoint = 'https://fvdm.com/u/ci_test.php?a=geoip2ws&b=';

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
doTest.add ('Module', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', geo)
    .done();
});


// Test success
doTest.add ('lookup - arguments', test => {
  const ret = geo ('194.109.6.66', (err, data) => {
    checkSuccess (test, err, data, ret);
  });
});


doTest.add ('lookup - object', test => {
  const obj = {
    ip: '194.109.6.66',
    service: config.service,
  };

  geo (obj, (err, data) => {
    checkSuccess (test, err, data);
  });
});


// Satellite IPs have no geo location
doTest.add ('lookup - data.subdivisions array', test => {
  geo ('95.107.128.1', (err, data) => {
    const dataIP = data && data.traits && data.traits.ip_address;

    test (err)
      .isArray ('fail', 'data.subdivisions', data.subdivisions)
      .isEmpty ('fail', 'data.subdivisions', data.subdivisions)
      .isExactly ('fail', 'data.traits.ip_address', dataIP, '95.107.128.1')
      .done();
  });
});


// Test promises
doTest.add ('Promise: resolve', test => {
  geo ('194.109.6.66')
    .then (data => checkSuccess (test, null, data))
    .catch (test)
  ;
});


doTest.add ('Promise: reject', async test => {
  try {
    await geo ('invalid input');

    test()
      .fail ('Promise should not resolve')
      .done()
    ;
  }
  catch (err) {
    test()
      .isError ('fail', 'catch', err)
      .isExactly ('fail', 'message', err && err.message, 'invalid ip')
      .done()
    ;
  }
});


// Inline config
doTest.add ('Config in lookup()', test => {
  const params = {
    userId: config.userId,
    licenseKey: config.licenseKey,
    service: config.service,
    requestTimeout: 5000,
    endpoint: 'geoip-eu-west.maxmind.com',
    ip: '194.109.6.66',
  };

  geo (params, (err, data) => {
    checkSuccess (test, err, data);
  });
});


// Test errors
doTest.add ('Error: invalid ip', test => {
  geo ('invalid input', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid ip')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Error: invalid service', test => {
  geo ('invalid service', '194.109.6.66', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid service')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Error: API error', test => {
  geo ('0.0.0.0', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isNotEmpty ('fail', 'err.message', err && err.message)
      .isString ('fail', 'err.code', err && err.code)
      .isNotEmpty ('warn', 'err.code', err && err.code)
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


doTest.add ('Setup with arguments', test => {
  geo = app (config.userId, config.licenseKey, config.service, config.timeout);

  geo ('194.109.6.66', (err, data) => {
    checkSuccess (test, err, data);
  });
});


doTest.add ('Error: request timeout', test => {
  const tmp = app (config.userId, config.licenseKey, 1);

  tmp ('194.109.6.66', (err, data) => {
    test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request timed out')
      .isExactly ('fail', 'err.code', err && err.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done();
  });
});


// Start the tests
doTest.run();

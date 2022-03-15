/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Author:         Franklin (https://fvdm.com)
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
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com',
  timeout: process.env.GEOIP2WS_TIMEOUT || 5000,
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

async function checkSuccess ({ test, data }) {
  try {
    test()
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.country', data?.country)
      .isObject ('fail', 'data.country.names', data?.country?.names)
      .isExactly ('fail', 'data.country.names.en', data?.country?.names?.en, 'Netherlands')
      .isString ('fail', 'data.most_specific_subdivision', data?.most_specific_subdivision?.iso_code)
      .isNotEmpty ('fail', 'data.most_specific_subdivision', data?.most_specific_subdivision?.iso_code)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
}


// TESTS
doTest.add ('Configuration', test => {
  if (!config.userId || !config.licenseKey) {
    config.endpoint = 'https://fvdm.com/u/ci_test.php?a=geoip2ws&b=';

    test()
      .warn ('GEOIP2WS_USERID or GEOIP2WS_LICENSE not set')
      .info ('Using test endpoint with fake data')
    ;
  }

  geo = app (config);

  test()
    .info (`config.service:   ${config.service}`)
    .info (`config.endpoint:  ${config.endpoint}`)
    .info (`config.timeout:   ${config.timeout}`)
    .done()
  ;
});


// Module
doTest.add ('Module', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', geo)
    .done();
});


// Test success
doTest.add ('lookup - object', async test => {
  try {
    const data = await geo ({
      ip: '194.109.6.66',
      service: config.service,
    });

    checkSuccess ({ test, data });
  }
  catch (err) {
    test (err).done();
  }
});


// Satellite IPs have no geo location
doTest.add ('lookup - data.subdivisions array', async test => {
  try {
    const data = await geo ({ ip: '194.109.6.93' });

    test()
      .isArray ('fail', 'data.subdivisions', data.subdivisions)
      .isNotEmpty ('warn', 'data.subdivisions', data.subdivisions)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


// IP without subdivisions
doTest.add ('lookup - IP without subdivisions (Japan)', async test => {
  try {
    const data = await geo ({ ip: '111.111.111.111' });

    test()
      .isArray ('fail', 'data.subdivisions', data.subdivisions)
      .isEmpty ('fail', 'data.subdivisions', data.subdivisions)
      .isObject ('fail', 'data.most_specific_subdivision', data.most_specific_subdivision)
      .isEmpty ('fail', 'data.most_specific_subdivision', data.most_specific_subdivision)
      .done()
    ;
  }
  catch (err) {
    test (err).done();
  }
});


// Test promises
doTest.add ('Promise: resolve', async test => {
  await geo ({ ip: '194.109.6.66' })
    .then (data => checkSuccess ({ test, data }))
    .catch (test)
  ;
});


doTest.add ('Promise: reject', async test => {
  let data;
  let error;

  try {
    data = await geo ({ ip: 'invalid input' });
  }
  catch (err) {
    error = err;
  }

  test()
    .isUndefined ('fail', 'data', data)
    .isError ('fail', 'catch', error)
    .isExactly ('fail', 'message', error?.message, 'invalid ip')
    .done()
  ;
});


// Inline config
doTest.add ('Config in lookup()', async test => {
  const tmp = new app();

  try {
    const data = await tmp ({
      userId: config.userId,
      licenseKey: config.licenseKey,
      service: config.service,
      endpoint: config.endpoint.replace (/^https:\/\//, ''),
      requestTimeout: 5000,
      ip: '194.109.6.66',
    });

    checkSuccess ({ test, data });
  }
  catch (err) {
    test (err).done();
  }
});


// Test errors
doTest.add ('Error: invalid ip', async test => {
  let data;
  let error;

  try {
    data = await geo ({ ip: 'invalid input' });
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'catch', error)
    .isExactly ('fail', 'error.message', error?.message, 'invalid ip')
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


doTest.add ('Error: invalid service', async test => {
  let data;
  let error;

  try {
    data = await geo ({
      service: 'invalid service',
      ip: '194.109.6.66',
    });
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'catch', error)
    .isExactly ('fail', 'error.message', error?.message, 'invalid service')
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


doTest.add ('Error: API error', async test => {
  let data;
  let error;

  try {
    data = await geo ({ ip: '0.0.0.0' });
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'catch', error)
    .isNotEmpty ('fail', 'error.message', error?.message)
    .isString ('fail', 'error.code', error?.code)
    .isNotEmpty ('warn', 'error.code', error?.code)
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


doTest.add ('Error: request timeout', async test => {
  const tmp = app ({
    userId: config.userId,
    licenseKey: config.licenseKey,
    timeout: 1,
  });

  let data;
  let error;

  try {
    data = await tmp ({ ip: '194.109.6.66' });
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'catch', error)
    .isExactly ('fail', 'error.message', error?.message, 'request timed out')
    .isExactly ('fail', 'error.code', error?.code, 'TIMEOUT')
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


// Start the tests
doTest.run();

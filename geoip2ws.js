/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

var httpreq = require ('httpreq');
var net = require ('net');

// setup
var api = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: 5000
};


/**
 * Call back an error
 *
 * @param message {string} - `Error.message`
 * @param err {mixed|null} - `Error.error`
 * @param code {mixed} - `data.code` or `res.statusCode`
 * @return {Error} error
 */

function doError (message, err, code) {
  var error = new Error (message);

  error.code = code;
  error.error = err;
  return error;
}


/**
 * Process HTTP response data
 *
 * @param err {Error} - Instance of `Error` or `null`
 * @param res {object} - Response data
 * @param callback {function} - Callback function
 * @return {void}
 */

function doResponse (err, res, callback) {
  var data = res && res.body || null;

  if (err) {
    callback (doError ('request failed', err, null));
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    callback (doError ('invalid data', null, res.statusCode));
    return;
  }

  if (data.error) {
    callback (doError ('API error', data.error, data.code));
    return;
  }

  if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
    data.most_specific_subdivision = data.subdivisions [data.subdivisions.length - 1];
  } else {
    data.subdivisions = [];
  }

  callback (null, data);
}


/**
 * Perform lookup
 *
 * @param [serviceName=api.service] {string} - Temporary service override
 * @param ip {string} - IP-address, hostname or `me` to look up
 * @param callback {function} - Callback function
 * @return {function} doLookup
 */

function doLookup (serviceName, ip, callback) {
  var httpProps = {
    method: 'GET',
    auth: api.userId + ':' + api.licenseKey,
    timeout: api.requestTimeout,
    headers: {
      'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)'
    }
  };

  // object input - doLookup (object, callbackFunction)
  if (serviceName instanceof Object && typeof ip === 'function') {
    callback = ip;
    ip = serviceName.ip;
    serviceName = serviceName.service || api.service;
  }

  // service is optional - doLookup (ipString, callbackFunction)
  if (typeof serviceName === 'string' && typeof ip === 'function') {
    callback = ip;
    ip = serviceName;
    serviceName = api.service;
  }

  // check input
  if (!/^(country|city|insights)$/.test (serviceName)) {
    callback (new Error ('invalid service'));
    return doLookup;
  }

  if (ip !== 'me' && !net.isIP (ip)) {
    callback (new Error ('invalid ip'));
    return doLookup;
  }

  // do request
  httpProps.url = api.endpoint + serviceName + '/' + ip;
  httpProps.headers.Accept = 'application/vnd.maxmind.com-' + serviceName + '+json; charset=UTF-8; version=2.1';

  function httpResponse (err, res) {
    doResponse (err, res, callback);
  }

  httpreq.doRequest (httpProps, httpResponse);
  return doLookup;
}


/**
 * Module interface
 *
 * @param userId {string} - Account user ID
 * @param licenseKey {string} - Account license key
 * @param [service=city] {string} - Account service name
 * @param [timeout=5000] {integer} - Request time out in milliseconds
 * @return {function} doLookup
 */

function setup (userId, licenseKey, service, timeout) {
  var key;

  if (userId instanceof Object) {
    for (key in userId) {
      api [key] = userId [key];
    }

    return doLookup;
  }

  if (typeof service === 'number') {
    timeout = service;
    service = api.service;
  }

  api.userId = userId;
  api.licenseKey = licenseKey;
  api.service = service || api.service;
  api.requestTimeout = timeout || api.requestTimeout;

  return doLookup;
}

module.exports = setup;

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
 * @param   {string}  message  `Error.message`
 * @param   {mixed}   err      `Error.error`
 * @param   {mixed}   code     `data.code` or `res.statusCode`
 * @return  {Error}   error
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
 * @param   {Error|null}  err       Instance of `Error` or `null`
 * @param   {object}      res       Response data
 * @param   {function}    callback  Callback function
 * @return  {void}
 */

function doResponse (err, res, callback) {
  var data = res && res.body || null;
  var error = null;

  try {
    data = JSON.parse (data);

    if (data.error) {
      error = doError ('API error', data.error, data.code);
    } else if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
      data.most_specific_subdivision = data.subdivisions [data.subdivisions.length - 1];
    } else {
      data.subdivisions = [];
    }
  } catch (e) {
    error = doError ('invalid data', null, res && res.statusCode);
  }

  if (err) {
    error = doError ('request failed', err, null);
  }

  if (error) {
    callback (error);
  } else {
    callback (null, data);
  }
}


/**
 * Perform lookup
 *
 * @param   {string}    [serviceName=api.service]  Temporary service override
 * @param   {string}    ip                         IP-address, hostname or `me` to look up
 * @param   {function}  callback                   Callback function
 * @return  {function}  doLookup
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
 * @param   {string}    userId          Account user ID
 * @param   {string}    licenseKey      Account license key
 * @param   {string}    [service=city]  Account service name
 * @param   {number}    [timeout=5000]  Request time out in milliseconds
 * @return  {function}  doLookup
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

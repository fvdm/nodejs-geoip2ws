/*
Name:           geoip2ws
Description:    Maxmind GeoIP2 Web Services for node.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain)
*/

var http = require ('httpreq');
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
 * Process HTTP response data
 *
 * @param err {Error} instance of Error or null
 * @param res {Object} response data
 * @param callback {Function} callback function
 * @returns {void}
 */

function doResponse (err, res, callback) {
  var error = null;
  var data = res && res.body ? res.body.trim () : null;

  if (err) {
    error = new Error ('request failed');
    error.error = err;
    callback (error);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    error = new Error ('invalid data');
    error.error = e;
    callback (error);
    return;
  }

  if (data instanceof Object && data.error) {
    error = new Error ('API error');
    error.code = data.code;
    error.error = data.error;
    callback (error);
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
 * @param serviceName {String} temporary service override, default to global setting
 * @param ip {String} IP-address, hostname or `me` to look up
 * @param callback {Function} callback function
 * @returns {void}
 */

function doLookup (serviceName, ip, callback) {
  var httpProps = {};

  if (serviceName instanceof Object) {
    ip = serviceName.ip;
    serviceName = serviceName.service || api.service;
  }

  // service is optional
  if (typeof ip === 'function') {
    callback = ip;
    ip = serviceName;
    serviceName = api.service;
  }

  // check input
  if (!/^(country|city|insights)$/.test (serviceName)) {
    callback (new Error ('invalid service'));
    return doLookup;
  }

  if (!net.isIP (ip) && ip !== 'me') {
    callback (new Error ('invalid ip'));
    return doLookup;
  }

  // build request
  httpProps.method = 'GET';
  httpProps.url = api.endpoint + serviceName + '/' + ip;
  httpProps.auth = api.userId + ':' + api.licenseKey;
  httpProps.timeout = api.requestTimeout;
  httpProps.headers = {
    'Accept': 'application/vnd.maxmind.com-' + serviceName + '+json; charset=UTF-8; version=2.1',
    'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)'
  };

  http.doRequest (httpProps, function doRequest (err, res) {
    doResponse (err, res, callback);
  });

  return doLookup;
}


/**
 * Module interface
 *
 * @param userId {String} account user ID
 * @param licenseKey {String} account license key
 * @param service {String} account service name, defaults to `city`
 * @param requestTimeout {Integer} request time out in milliseconds, defaults to `5000`
 * @returns {Function doLookup}
 */

module.exports = function moduleExports (userId, licenseKey, service, requestTimeout) {
  var key;

  if (userId instanceof Object) {
    for (key in userId) {
      api [key] = userId [key];
    }

    return doLookup;
  }

  if (typeof service === 'number') {
    api.requestTimeout = service;
    return doLookup;
  }

  api.userId = userId;
  api.licenseKey = licenseKey;
  api.service = service || api.service;
  api.requestTimeout = requestTimeout || api.requestTimeout;

  return doLookup;
};

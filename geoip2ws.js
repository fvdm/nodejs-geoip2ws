/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const { isIP } = require ('net');
const { promisify } = require ('util');
const doRequest = promisify (require ('httpreq').doRequest);

// setup
const api = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: 5000
};


/**
 * Call back an error
 *
 * @return  {Error}            The new error
 *
 * @param   {string}  message  `Error.message`
 * @param   {mixed}   err      `Error.error`
 * @param   {mixed}   code     `data.code` or `res.statusCode`
 */

function doError (message, err, code) {
  const error = new Error (message);

  error.code = code;
  error.error = err;
  return error;
}


/**
 * Process response body
 *
 * @param    {object}    res    httpreq response
 *
 * @return   {promise}
 * @promise  {object}   resolve  Result data
 * @promose  {error}    reject   API error
 */

function doResponse (res) {
  const data = JSON.parse (res.body);

  if (data.error) {
    return Promise.reject (doError ('API error', err.error, err.code));
  }

  if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
    data.most_specific_subdivision = data.subdivisions [data.subdivisions.length - 1];
  } else {
    data.subdivisions = [];
  }

  return data;
}


/**
 * Perform lookup
 *
 * @callback  [callback]
 * @return    {function|promise}                 doLookup()
 *
 * @promise   {object}    resolve                Response data
 * @promise   {error}     reject                 Agent or API error
 *
 * @param     {string}    [service=api.service]  Temporary service override
 * @param     {string}    [ip]                   IP-address, hostname or `me` to look up
 * @param     {function}  [callback]             `(err, data)`
 */

function doLookup (service, ip = null, callback = null) {
  let error;
  let ret;

  const httpProps = {
    method: 'GET',
    auth: api.userId + ':' + api.licenseKey,
    timeout: api.requestTimeout,
    headers: {
      'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)'
    }
  };

  // object input - doLookup (object, callbackFunction)
  if (service instanceof Object) {
    callback = ip;
    ip = service.ip;
    service = service.service || api.service;
  }

  // service is optional - doLookup (ipString, callbackFunction)
  if (isIP (service)) {
    callback = ip;
    ip = service;
    service = api.service;
  }

  // check input
  if (!/^(country|city|insights)$/.test (service)) {
    error = new Error ('invalid service');

    if (!callback) {
      return Promise.reject (error);
    }

    callback (error);
    return doLookup;
  }

  if (ip !== 'me' && !isIP (ip)) {
    error = new Error ('invalid ip');

    if (!callback) {
      return Promise.reject (error);
    }

    callback (error);
    return doLookup;
  }

  // do request
  httpProps.url = `${api.endpoint}${service}/${ip}`;
  httpProps.headers.Accept = `application/vnd.maxmind.com-${service}+json; charset=UTF-8; version=2.1`;

  if (typeof callback === 'function') {
    doRequest (httpProps)
      .then (doResponse)
      .then (data => callback (null, data))
      .catch (callback)
    ;

    return doLookup;
  }
  
  return doRequest (httpProps)
    .then (doResponse)
  ;
}


/**
 * Module interface
 *
 * @return  {function}                  doLookup()
 *
 * @param   {string}    userId          Account user ID
 * @param   {string}    licenseKey      Account license key
 * @param   {string}    [service=city]  Account service name
 * @param   {number}    [timeout=5000]  Request time out in milliseconds
 */

function setup (userId, licenseKey, service, timeout) {
  if (userId instanceof Object) {
    api = Object.assign (api, userId);
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

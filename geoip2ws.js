/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const { isIP } = require ('net');
const { promisify } = require ('es6-promisify');
const doRequest = promisify (require ('httpreq').doRequest);

// setup
let api = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: 5000
};


function isService (service) {
  return !!/^(country|city|insights)$/.test (service);
}


/**
 * Call back an error
 *
 * @return  {Error}            The new error
 *
 * @param   {string}  message  `Error.message`
 * @param   {mixed}   err      `Error.error`
 * @param   {mixed}   code     `data.code` or `res.statusCode`
 */

function doError (message, err, code = null) {
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
  return new Promise ((resolve, reject) => {
    const data = JSON.parse (res.body);

    if (data.error) {
      reject (doError ('API error', data.error, data.code));
      return;
    }

    if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
      data.most_specific_subdivision = data.subdivisions [data.subdivisions.length - 1];
    } else {
      data.subdivisions = [];
    }

    resolve (data);
  });
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

  const httpProps = {
    method: 'GET',
    auth: api.userId + ':' + api.licenseKey,
    timeout: api.requestTimeout,
    headers: {
      'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)'
    }
  };

  // fix arguments
  if (service instanceof Object) {
    // object with details
    callback = ip;
    ip = service.ip;
    service = service.service || api.service;
  } else if (isIP (service) || (!isService (service) && !isIP (ip))) {
    // service is optional
    callback = ip;
    ip = service;
    service = api.service;
  }

  // check input
  if (!/^(country|city|insights)$/.test (service)) {
    error = new Error ('invalid service');
  }

  if (ip !== 'me' && !isIP (ip)) {
    error = new Error ('invalid ip');
  }

  // do request
  httpProps.url = `${api.endpoint}${service}/${ip}`;
  httpProps.headers.Accept = `application/vnd.maxmind.com-${service}+json; charset=UTF-8; version=2.1`;

  // do callback
  if (typeof callback === 'function') {
    if (error) {
      callback (error);
      return doLookup;
    }

    doRequest (httpProps)
      .then (doResponse)
      .then (data => callback (null, data))
      .catch (err => {
        if (err.message === 'API error') {
          callback (err);
        } else {
          callback (doError ('request failed', err, err.code));
        }
      })
    ;

    return doLookup;
  }

  // do promise
  return new Promise ((resolve, reject) => {
    if (error) {
      reject (error);
      return;
    }

    doRequest (httpProps)
      .then (doResponse)
      .then (resolve)
      .catch (reject)
    ;
  });
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

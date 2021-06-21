/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const { isIP } = require ('net');
const { doRequest } = require ('httpreq');

// setup
let api = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'geoip.maxmind.com',
  requestTimeout: 5000,
};


/**
 * Check if string is a service
 *
 * @param   {string}   service  Service name
 * @return  {boolean}           True if string is a service name
 */

function isService (service) {
  return /^(country|city|insights)$/.test (service);
}


/**
 * Promisify doRequest without deps
 *
 * @param   {object}   props  httpreq.doRequest options
 * @return  {Promise}
 */

async function get (options) {
  return new Promise ((resolve, reject) => {
    doRequest (options, (err, res) => {
      if (err) {
        reject (err);
        return;
      }

      resolve (res);
    });
  });
}


/**
 * Process response body
 *
 * @param    {object}    res     httpreq response
 *
 * @return   {promise}
 * @promise  {object}   resolve  Result data
 * @promose  {error}    reject   API error
 */

async function doResponse (res) {
  const data = JSON.parse (res.body);
  let error;

  if (data.error) {
    error = new Error (data.error);
    error.code = data.code;
    throw error;
  }

  // Fix API inconsistencies
  if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
    data.most_specific_subdivision = data.subdivisions [data.subdivisions.length - 1];
  }
  else {
    data.subdivisions = [];
  }

  if (!data.most_specific_subdivision) {
    data.most_specific_subdivision = {};
  }

  for (let key in data) {
    if (key.match (/^(city|country|postal|subdivisions)$/) && !data[key].confidence) {
      data[key].confidence = 0;
    }
  }

  return data;
}


/**
 * Perform lookup
 *
 * @callback  [callback]
 * @return    {function|promise}                       If `callback` then doLookup(), else promise
 *
 * @promise   {object}         resolve                 Response data
 * @promise   {error}          reject                  Agent or API error
 *
 * @param     {string|object}  [service=api.service]   Temporary service override
 * @param     {string}         [service.userId]        Account user ID
 * @param     {string}         [service.licenseKey]    Account license key
 * @param     {string}         [service.service=city]  Account service name
 * @param     {string}         [service.endpoint]      API hostname or url
 * @param     {number}         [service.timeout=5000]  Request time out in milliseconds

 * @param     {string}         [ip]                    IP-address, hostname or `me` to look up
 * @param     {function}       [callback]              `(err, data)`
 */

function doLookup (service, ip = null, callback = null) {
  let error;
  let userId = api.userId;
  let licenseKey = api.licenseKey;
  let serviceName = api.service;
  let requestTimeout = api.requestTimeout;
  let endpoint = api.endpoint;

  if (typeof service === 'string' && !isIP (service)) {
    serviceName = service;
  }

  if (service instanceof Object) {
    callback = ip;
    ip = service.ip;

    if (service.userId && service.licenseKey) {
      userId = service.userId;
      licenseKey = service.licenseKey;
    }

    if (service.requestTimeout) {
      requestTimeout = service.requestTimeout;
    }

    if (service.endpoint) {
      endpoint = service.endpoint;
    }

    if (service.service) {
      serviceName = service.service;
    }
  }
  else if (isIP (service) || (!isService (service) && !isIP (ip))) {
    // service is optional
    callback = ip;
    ip = service;
    serviceName = api.service;
  }

  // check input
  if (!isService (serviceName)) {
    error = new Error ('invalid service');
  }

  if (ip !== 'me' && !isIP (ip)) {
    error = new Error ('invalid ip');
  }

  endpoint = `https://${endpoint}/geoip/v2.1`;

  if (endpoint.indexOf ('/') >= 0) {
    endpoint = endpoint.replace (/\/$/, '');
  }

  const httpProps = {
    method: 'GET',
    auth: `${userId}:${licenseKey}`,
    timeout: requestTimeout,
    headers: {
      'Accept': `application/vnd.maxmind.com-${serviceName}+json; charset=UTF-8; version=2.1`,
      'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)',
    },
    url: `${endpoint}/${serviceName}/${ip}`,
  };

  // do callback
  if (typeof callback === 'function') {
    if (error) {
      callback (error);
      return doLookup;
    }

    get (httpProps)
      .then (doResponse)
      .then (data => callback (null, data))
      .catch (callback)
    ;

    return doLookup;
  }

  // do promise
  if (error) {
    throw error;
  }

  return get (httpProps)
    .then (doResponse)
  ;
}


/**
 * Module interface
 *
 * @return  {function}                                doLookup()
 *
 * @param   {string}    userId                        Account user ID
 * @param   {string}    licenseKey                    Account license key
 * @param   {string}    [service=city]                Account service name
 * @param   {string}    [endpoint=geoip.maxmind.com]  API hostname or url
 * @param   {number}    [timeout=5000]                Request time out in milliseconds
 */

module.exports = function setup (
  userId,
  licenseKey,
  service = api.service,
  timeout = api.requestTimeout
) {
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
  api.service = service;
  api.requestTimeout = timeout;

  return doLookup;
}

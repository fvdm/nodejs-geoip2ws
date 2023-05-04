/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin (https://fvdm.com)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const { isIP } = require( 'net' );

// setup
let config = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'https://geoip.maxmind.com',
  timeout: 5000,
};


/**
 * Process response body
 *
 * @param   {object}  res  doRequest() response
 *
 * @return  {Promise<object>}
 */

async function doResponse ( res ) {
  const data = await res.json();

  if ( data.error ) {
    const error = new Error( data.error );

    error.code = data.code;
    throw error;
  }

  // Fix API inconsistencies
  if ( Array.isArray( data.subdivisions ) && data.subdivisions.length ) {
    data.most_specific_subdivision = data.subdivisions[data.subdivisions.length - 1];
  }
  else {
    data.subdivisions = [];
  }

  if ( ! data.most_specific_subdivision ) {
    data.most_specific_subdivision = {};
  }

  return data;
}


/**
 * Perform lookup
 *
 * @param   {object}  o
 *
 * @param   {string}  o.ip                          IP-address, hostname or 'me' to look up
 * @param   {string}  [o.userId=config.userId]      Account user ID
 * @param   {string}  [o.licenseKey=config.userId]  Account license key
 * @param   {string}  [o.service=config.service]    Account service name
 * @param   {string}  [o.endpoint=config.endpoint]  API hostname or url
 * @param   {number}  [o.timeout=config.timeout]    Request time out in milliseconds
 *
 * @return  {Promise<object>}
 */

async function doLookup ( {

  ip,
  userId = config.userId,
  licenseKey = config.licenseKey,
  service = config.service,
  endpoint = config.endpoint,
  timeout = config.timeout,

} ) {

  // check input
  if ( ! /^(country|city|insights)$/.test( service ) ) {
    throw new Error( 'invalid service' );
  }

  if ( ip !== 'me' && ! isIP( ip ) ) {
    throw new Error( 'invalid ip' );
  }

  // build url
  endpoint = endpoint.replace( /\/$/, '' );
  endpoint += `/geoip/v2.1/${service}/${ip}`;

  if ( ! endpoint.match( /^https?\:\/\// ) ) {
    endpoint = `https://${endpoint}`;
  }

  // request
  return fetch( endpoint, {
    signal: AbortSignal.timeout( timeout ),
    headers: {
      'Accept': `application/vnd.maxmind.com-${service}+json; charset=UTF-8; version=2.1`,
      'Authorization': 'Basic ' + Buffer.from( `${userId}:${licenseKey}` ).toString( 'base64' ),
      'User-Agent': 'geoip2ws.js (https://github.com/fvdm/nodejs-geoip2ws)',
    },
  } )
    .then( doResponse )
  ;

}


/**
 * Module interface
 *
 * @param   {object}    o
 *
 * @param   {string}    [o.userId]                                Account user ID
 * @param   {string}    [o.licenseKey]                            Account license key
 * @param   {string}    [o.service=city]                          Account service name
 * @param   {string}    [o.endpoint='https://geoip.maxmind.com']  API hostname or url
 * @param   {number}    [o.timeout=5000]                          Request time out in milliseconds
 *
 * @return  {function}  doLookup
 */

module.exports = function setup ( {

  userId = null,
  licenseKey = null,
  service = config.service,
  endpoint = config.endpoint,
  timeout = config.timeout,

} = {} ) {

  config.userId = userId;
  config.licenseKey = licenseKey;
  config.service = service;
  config.endpoint = endpoint;
  config.timeout = timeout;

  return doLookup;

};

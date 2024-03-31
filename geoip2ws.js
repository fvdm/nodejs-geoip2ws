/*
Name:           geoip2ws - geoip2ws.js
Description:    Maxmind GeoIP2 Web Services for node.js (unofficial)
Author:         Franklin (https://fvdm.com)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/


/**
 * GeoIP lookup
 *
 * @param   {object}  o
 *
 * @param   {string}  o.userId            Account user ID
 * @param   {string}  o.licenseKey        Account license key
 * @param   {string}  [o.ip='me']         IP-address, hostname or 'me' to look up
 * @param   {string}  [o.service='city']  Account service name
 * @param   {string}  [o.endpoint]        API hostname or url
 * @param   {number}  [o.timeout=5000]    Request time out in milliseconds
 *
 * @return  {Promise<object>}
 */

module.exports = async function geoip2ws ( {

  userId,
  licenseKey,
  ip = 'me',
  service = 'city',
  endpoint = 'https://geoip.maxmind.com',
  timeout = 5000,

} ) {

  endpoint = endpoint.replace( /\/$/, '' );
  endpoint += `/geoip/v2.1/${service}/${ip}`;

  const res = await fetch( endpoint, {
    signal: AbortSignal.timeout( timeout ),
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'UTF-8',
      'Authorization': 'Basic ' + Buffer.from( `${userId}:${licenseKey}` ).toString( 'base64' ),
      'User-Agent': 'fvdm/nodejs-geoip2ws',
    },
  } );

  const data = await res.json();

  // Process API error
  if ( data.error ) {
    const error = new Error( `API: ${data.error}` );

    error.reason = data.code;
    throw error;
  }

  // Fix response inconsistencies
  data.most_specific_subdivision = {};

  if ( ! Array.isArray( data.subdivisions ) ) {
    data.subdivisions = [];
  }

  if ( data.subdivisions.length ) {
    data.most_specific_subdivision = data.subdivisions[data.subdivisions.length - 1];
  }

  // All good
  return data;

};

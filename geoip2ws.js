/*
Name:           geoip2ws
Description:    Maxmind GeoIP2 Web Services for node.js
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

module.exports = function (userId, licenseKey, service, requestTimeout) {
  if (userId instanceof Object) {
    service = userId.service || api.service;
    requestTimeout = userId.requestTimeout || api.requestTimeout;
    api.endpoint = userId.endpoint || api.endpoint;
    licenseKey = userId.licenseKey || null;
    userId = userId.userId || null;
  }

  if (userId === undefined || licenseKey === undefined) {
    return new Error ('no userId or licenseKey');
  }

  api.userId = userId;
  api.licenseKey = licenseKey;

  if (typeof service === 'number') {
    api.requestTimeout = service;
  } else {
    api.service = service || api.service;
    api.requestTimeout = requestTimeout || api.requestTimeout;
  }

  return function (service, ip, callback) {
    if (service instanceof Object) {
      ip = service.ip;
      service = service.service || api.service;
    }

    // service is optional
    if (typeof ip === 'function') {
      callback = ip;
      ip = service;
      service = api.service;
    }

    // check input
    if (! /^(country|city|insights)$/.test (service)) {
      return callback (new Error ('invalid service'));
    }

    if (! net.isIP (ip) && ip !== 'me' ) {
      return callback (new Error ('invalid ip'));
    }

    // build request
    http.get (
      api.endpoint + service +'/'+ ip,
      {
        headers: {
          'Accept': 'application/vnd.maxmind.com-'+ service +'+json; charset=UTF-8; version=2.1',
          'User-Agent': 'geoip2ws.js'
        },
        auth: api.userId +':'+ api.licenseKey,
        timeout: api.requestTimeout
      },
      function (err, res) {
        var error = null;
        var data = res && res.body ? res.body.trim () : null;

        if (err) {
          error = new Error ('request failed');
          error.error = err;
        }

        try {
          data = JSON.parse (data);

          if (Array.isArray (data.subdivisions) && data.subdivisions.length) {
            data.most_specific_subdivision = data.subdivisions [data.subdivisions.length -1];
          } else {
            data.subdivisions = [];
          }

          if (data instanceof Object && data.error) {
            error = new Error ('API error');
            error.code = data.code;
            error.error = data.error;
          }
        }
        catch (e) {}
        callback (error, data)
      }
    );
  };
};

/*
Name:           geoip2ws
Description:    Maxmind GeoIP2 Web Services for Node.js
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Public Domain / Unlicense
*/

var http = require ('httpreq');
var net = require ('net');

// setup
var app = {
  userId: null,
  licenseKey: null,
  service: 'city',
  endpoint: 'https://geoip.maxmind.com/geoip/v2.1/',
  requestTimeout: 5000
};

module.exports = function (userId, licenseKey, service, requestTimeout) {
  if (userId instanceof Object) {
    service = userId.service || app.service;
    requestTimeout = userId.requestTimeout || app.requestTimeout;
    app.endpoint = userId.endpoint || app.endpoint;
    licenseKey = userId.licenseKey || null;
    userId = userId.userId || null;
  }

  if (userId === undefined || licenseKey === undefined) {
    return new Error ('no userId or licenseKey');
  }

  app.userId = userId;
  app.licenseKey = licenseKey;

  if (typeof service === 'number') {
    app.requestTimeout = service;
  } else {
    app.service = service || app.service;
    app.requestTimeout = requestTimeout || app.requestTimeout;
  }

  return function (service, ip, callback) {
    // service is optional
    if (typeof ip === 'function') {
      callback = ip;
      ip = service;
      service = app.service;
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
      app.endpoint + service +'/'+ ip,
      {
        headers: {
          'Accept': 'application/vnd.maxmind.com-'+ service +'+json; charset=UTF-8; version=2.1',
          'User-Agent': 'geoip2ws.js'
        },
        auth: app.userId +':'+ app.licenseKey,
        timeout: app.requestTimeout
      },
      function (err, res) {
        var error = null;
        var data = res && res.body ? res.body.trim() : null;

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

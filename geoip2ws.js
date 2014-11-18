/*
Name:           geoip2ws
Description:    Maxmind GeoIP2 Web Services for Node.js
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Public Domain / Unlicense

This product includes GeoLite2 data created by MaxMind, available from
<http://www.maxmind.com>.
*/

var https = require('https')

// setup
var app = {
  userId: null,
  licenseKey: null,
  service: 'city',
  requestTimeout: 5000
}

module.exports = function( userId, licenseKey, service, requestTimeout ) {
  if( userId === undefined || licenseKey === undefined ) {
    return new Error('no userId or licenseKey')
  }

  app.userId = userId
  app.licenseKey = licenseKey

  if( typeof service === 'number' ) {
    app.requestTimeout = service
  } else {
    app.service = service || app.service
    app.requestTimeout = requestTimeout || app.requestTimeout
  }

  return function( service, ip, callback ) {

    // service is optional
    if( service && ip && !callback ) {
      var callback = ip
      var ip = service
      var service = app.service
    }

    // prevent multiple callbacks
    var complete = false
    function doCallback( err, res ) {
      if( ! complete ) {
        complete = true
        callback( err, res )
      }
    }

    // build request
    var options = {
      hostname: 'geoip.maxmind.com',
      path: '/geoip/v2.1/'+ service +'/'+ ip,
      agent: false,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'geoip2ws.js'
      },
      auth: app.userId +':'+ app.licenseKey
    }

    var request = https.request( options )

    // request response
    request.on( 'response', function( response ) {
      var data = []
      var size = 0
      var err = null

      // collect data
      response.on( 'data', function( chunk ) {
        data.push( chunk )
        size += chunk.length
      })

      // process data
      response.on( 'end', function() {
        if( data.length >= 1 ) {
          var buf = new Buffer( size )
          var pos = 0

          for( var i=0; i<data.length; i++ ) {
            data[i].copy( buf, pos )
            pos += data[i].length
          }

          data = data.toString('utf8').trim()

          try {
            data = JSON.parse( data )

            if( data.error !== undefined ) {
              err = new Error('API error')
              err.code = data.code
              err.error = data.error
            }
          } catch(e) {
            err = new Error('not json')
          }
        } else {
          err = new Error('no data')
        }

        doCallback( err, data )
      })

      // connection dropped
      response.on( 'close', function() {
        doCallback( new Error('request dropped') )
      })
    })

    request.on( 'socket', function( socket ) {
      if( app.requestTimeout ) {
        socket.setTimeout( app.requestTimeout )
        socket.on( 'timeout', function() {
          doCallback( new Error('request timeout') )
          request.abort()
        })
      }
    })

    // request error
    request.on( 'error', function( error ) {
      var err = new Error('request failed')
      err.error = error
      doCallback( err )
    })

    // request finished
    request.end()

  }
}

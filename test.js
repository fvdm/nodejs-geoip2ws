/*
Name:           geoip2ws - test.js
Description:    Maxmind GeoIP2 Web Services for node.js
Author:         Franklin (https://fvdm.com)
Source & docs:  https://github.com/fvdm/nodejs-geoip2ws
Feedback:       https://github.com/fvdm/nodejs-geoip2ws/issues
License:        Unlicense (public domain, see LICENSE file)
*/

const doTest = require( 'dotest' );
const pkg = require( './' );


// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
const config = {
  userId: process.env.GEOIP2WS_USERID || null,
  licenseKey: process.env.GEOIP2WS_LICENSE || null,
  service: process.env.GEOIP2WS_SERVICE || 'city',
  endpoint: process.env.GEOIP2WS_ENDPOINT || 'https://geoip.maxmind.com',
  timeout: process.env.GEOIP2WS_TIMEOUT || 5000,
};


// TESTS
doTest.add( 'Configuration', test => {
  if ( ! config.userId || ! config.licenseKey ) {
    config.endpoint = 'https://fvdm.com/u/ci_test.php?a=geoip2ws&b=';

    test()
      .warn( 'GEOIP2WS_USERID or GEOIP2WS_LICENSE not set' )
      .info( 'Using test endpoint with fake data' )
    ;
  }

  test()
    .info( `config.service:   ${config.service}` )
    .info( `config.endpoint:  ${config.endpoint}` )
    .info( `config.timeout:   ${config.timeout}` )
    .done()
  ;
} );


// Module
doTest.add( 'Module', test => {
  test()
    .isFunction( 'fail', 'exports', pkg )
    .done();
} );


// Test success
doTest.add( 'lookup - object', async test => {
  try {
    const data = await pkg( {
      ...config,
      ip: '194.109.6.66',
      service: config.service,
    } );

    test()
      .isObject( 'fail', 'data', data )
      .isArray( 'fail', 'data.subdivisions', data?.subdivisions )
      .isString( 'fail', 'data.most_specific_subdivision', data?.most_specific_subdivision?.iso_code )
      .isNotEmpty( 'fail', 'data.most_specific_subdivision', data?.most_specific_subdivision?.iso_code )
      .done()
    ;
  }
  catch ( err ) {
    test( err ).done();
  }
} );


// Satellite IPs have no geo location
doTest.add( 'lookup - data.subdivisions array', async test => {
  try {
    const data = await pkg( {
      ...config,
      ip: '194.109.6.93',
    } );

    test()
      .isArray( 'fail', 'data.subdivisions', data.subdivisions )
      .isNotEmpty( 'warn', 'data.subdivisions', data.subdivisions )
      .done()
    ;
  }
  catch ( err ) {
    test( err ).done();
  }
} );


// IP without subdivisions
doTest.add( 'lookup - IP without subdivisions (Japan)', async test => {
  try {
    const data = await pkg( {
      ...config,
      ip: '117.104.133.1',
    } );

    test()
      .isArray( 'fail', 'data.subdivisions', data.subdivisions )
      .isEmpty( 'fail', 'data.subdivisions', data.subdivisions )
      .isObject( 'fail', 'data.most_specific_subdivision', data.most_specific_subdivision )
      .isEmpty( 'fail', 'data.most_specific_subdivision', data.most_specific_subdivision )
      .done()
    ;
  }
  catch ( err ) {
    test( err ).done();
  }
} );


// Errors
doTest.add( 'Error: from API', async test => {
  let data;
  let error;

  try {
    data = await pkg( {
      userId: config.userId,
      licenseKey: config.licenseKey,
      ip: '0.0.0.0',
    } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'catch', error )
    .isNotEmpty( 'fail', 'error.message', error?.message )
    .isRegexpMatch( 'fail', 'error.message', error?.message, /^API: .+/ )
    .isString( 'fail', 'error.reason', error?.reason )
    .isNotEmpty( 'warn', 'error.reason', error?.reason )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


doTest.add( 'Error: timeout', async test => {
  let data;
  let error;

  try {
    data = await pkg( {
      userId: config.userId,
      licenseKey: config.licenseKey,
      timeout: 1,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'catch', error )
    .isNotEmpty( 'fail', 'error.message', error?.message )
    .isExactly( 'fail', 'error.name', error?.name, 'TimeoutError' )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


// Start the tests
doTest.run();

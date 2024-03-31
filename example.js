/* eslint-disable no-console, key-spacing */
const geoip = require( 'geoip2ws' );

geoip( {
  userId:     '00000',
  licenseKey: 'abc123',
  service:    'city',
  ip:         'me',
} )
  .then( data => {
    console.dir( data, {
      depth: null,
      colors: true,
    } );
  } )
  .catch( err => {
    console.log( err );
    process.exit( 1 );
  } )
;

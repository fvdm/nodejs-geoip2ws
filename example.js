/* eslint-disable no-console */

const geoip = require( 'geoip2ws' )( {
  userId:     '00000',
  licenseKey: 'abc123',
  service:    'city',
} );

geoip( { ip: 'me' } )
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

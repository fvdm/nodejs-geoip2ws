/* eslint-disable no-console */

const config = {
  userId: '00000',
  licenseKey: 'abc123',
  service: 'city',
};

geoip( {
  ...config,
  ip: 'me',
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

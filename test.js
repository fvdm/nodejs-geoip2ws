var util = require('util');

// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE (Travis CI)
// or user cli arguments: npm test --app_userid=1234 --app_license=abc123
var geo = require('./')(
  process.env.npm_config_app_userid || process.env.GEOIP2WS_USERID || null,
  process.env.npm_config_app_license || process.env.GEOIP2WS_LICENSE || null,
  process.env.npm_config_app_service || process.env.GEOIP2WS_SERVICE || 'city'
);


// handle exits
var errors = 0
process.on( 'exit', function() {
  if( errors == 0 ) {
    console.log('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit(0);
  } else {
    console.log('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit(1);
  }
});

// prevent errors from killing the process
process.on( 'uncaughtException', function( err ) {
  console.log();
  console.error( err.stack );
  console.trace();
  console.log();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext() {
  next++;
  if( queue[next] ) {
    queue[next]();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest( err, label, tests ) {
  if( err instanceof Error ) {
    console.error( label +': \033[1m\033[31mERROR\033[0m\n' );
    console.error( util.inspect(err, false, 10, true) );
    console.log();
    console.error( err.stack );
    console.log();
    errors++;
  } else {
    var testErrors = [];
    tests.forEach( function( test ) {
      if( test[1] !== true ) {
        testErrors.push(test[0]);
        errors++;
      }
    });

    if( testErrors.length == 0 ) {
      console.log( label +': \033[1m\033[32mok\033[0m' );
    } else {
      console.error( label +': \033[1m\033[31mfailed\033[0m ('+ testErrors.join(', ') +')' );
    }
  }

  doNext();
}

// METHOD
queue.push( function() {
  doTest( null, 'module', [
    ['function type', typeof geo === 'function']
  ]);
});

// Test error
queue.push( function() {
  geo('invalid input', function(err, data) {
    doTest( null, 'error', [
      ['type', err instanceof Error],
      ['message', err.message === 'invalid ip']
    ]);
  });
});

// Test success
queue.push( function() {
  geo('74.125.206.100', function(err, data) {
    doTest( err, 'lookup', [
      ['city name', !err && data && typeof data.city.names.en === 'string']
    ]);
  });
});

// Start the tests
queue[0]();

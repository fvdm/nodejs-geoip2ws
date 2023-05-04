# geoip2ws

Unofficial Node.js module for the Maxmind GeoIP2
Web Services.

[![npm](https://img.shields.io/npm/v/geoip2ws.svg?maxAge=3600)](https://www.npmjs.com/package/geoip2ws?activeTab=versions)
[![Build Status](https://github.com/fvdm/nodejs-geoip2ws/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-geoip2ws/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geoip2ws/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geoip2ws?branch=master)

* [Changelog](https://github.com/fvdm/nodejs-geoip2ws/blob/master/CHANGELOG.md)
* [Node.js](https://nodejs.org)
* [Maxmind GeoIP2 Web Services](https://www.maxmind.com/en/geoip2-precision-services)
* [API documentation](https://dev.maxmind.com/geoip/docs/web-services)


## Usage

You can provide the configuration in the require function
or inline at lookup time. The lookup always returns a Promise.

- [Response examples](https://dev.maxmind.com/geoip/docs/web-services/responses?lang=en#bodies)
- [List of API errors](https://dev.maxmind.com/geoip/docs/web-services/responses?lang=en#errors)


### Normal configuration

```js
const geo = require( 'geoip2ws' )( {
  userId: '12345',
  licenseKey: 'abc678',
} );

geo( {
  service: 'city',
  ip: '1.2.3.4',
} )
  .then( console.log )
  .catch( console.error )
;
```


### Inline configuration

```js
const geo = require( 'geoip2ws' )();

geo( {
  userId: '12345',
  licenseKey: 'abc678',
  service: 'city',
  ip: '1.2.3.4',
} )
  .then( console.log )
  .catch( console.error )
;
```


## Installation

You need a Maxmind account ID and license key with enough
credits for one of their GeoIP *web* services.
You can find both [*here*](https://www.maxmind.com/en/accounts/current/license-key).

`npm i geoip2ws`


## The functions

### Setup

The _first function_ is the global config and returns the
lookup function. It takes these settings:

parameter        | type    | default                   | description
:----------------|:--------|:--------------------------|:-----------
[userId]         | string  |                           | User ID
[licenseKey]     | string  |                           | License key
[service]        | string  | city                      | `insights`, `country` or `city`
[endpoint]       | string  | https://geoip.maxmind.com | Override endpoint hostname or url
[timeout]        | integer | 5000                      | Request timeout in ms

```js
const geo = require( 'geoip2ws' )( {
  userId:     '1234',
  licenseKey: 'abc',
  service:    'country',
  timeout:    2000,
} );
```

If you are providing the details in the lookup
function, then you don't have to set them here but
you do need to run this setup function once.

```js
const geo = require( 'geoip2ws' )();
```


### Lookup

The _second function_ does the IP-address lookup and
takes `ip` and optionally the same settings as above.

parameter  | type     | description
:----------|:---------|:-----------
ip         | string   | The IPv4 or IPv6 address to lookup

```js
geo( {
  ip:       '1.2.3.4',
  service: 'city',
  endpoint: 'geoip-eu-west.maxmind.com',
} )
  .then( processData )
  .catch( console.error )
;
```


#### Errors

error message   | description
:---------------|:-----------
invalid service | The service name is invalid
invalid ip      | The IP-address is invalid

These two conditions are checked before sending the request.
Meaning it won't cost you account credits.


## Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org/>


## Author

[Franklin](https://fvdm.com)
| [Buy me a coffee](https://fvdm.com/donating/)

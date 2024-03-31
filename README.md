# geoip2ws

Unofficial Node.js module for the Maxmind GeoIP2 Web Services.

[![npm](https://img.shields.io/npm/v/geoip2ws.svg?maxAge=3600)](https://www.npmjs.com/package/geoip2ws?activeTab=versions)
[![Build Status](https://github.com/fvdm/nodejs-geoip2ws/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-geoip2ws/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geoip2ws/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geoip2ws?branch=master)

* [Changelog](https://github.com/fvdm/nodejs-geoip2ws/releases)
* [Node.js](https://nodejs.org)
* [Maxmind GeoIP2 Web Services](https://www.maxmind.com/en/geoip2-precision-services)
* [API documentation](https://dev.maxmind.com/geoip/docs/web-services)


## Usage

The configuration parameters must be wrapped in an object.
This allows the use of spread `{ ...config, ip: '1.2.3.4' }`
if you want to keep the main config in a variable.
The lookup always returns a Promise.

- [Response examples](https://dev.maxmind.com/geoip/docs/web-services/responses?lang=en#bodies)


```js
const geo = require( 'geoip2ws' );

geo( {
  userId:     '12345',
  licenseKey: 'abc678',
  service:    'city',
  ip:         '1.2.3.4',
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


## Configuration

parameter  | type   | default                   | description
:----------|:-------|:--------------------------|:-----------
userId     | string |                           | User ID
licenseKey | string |                           | License key
[ip]       | string | me                        | The IP address or 'me' for your current IP
[service]  | string | city                      | `insights`, `country` or `city`
[endpoint] | string | https://geoip.maxmind.com | Override endpoint url, include the protocol prefix
[timeout]  | number | 5000                      | Request timeout in ms

```js
{
  ip:         '2a02:abc:def::123',
  userId:     '1234',
  licenseKey: 'abc',
  service:    'country',
  timeout:    2000,
}
```


### Endpoint

You can change the `endpoint` to use a http proxy or target a specific datacenter.
Make sure to prefix the hostname with the protocol, i.e. `https://`.

For the GeoLite2 web service set the `endpoint` to `https://geolite.info`.


## Errors

Errors from the request or API are thrown and can be caught in the Promise.

For API errors the message is prefixed with `API: ` string.

- [List of API errors](https://dev.maxmind.com/geoip/docs/web-services/responses?lang=en#errors)
 

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

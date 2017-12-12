geoip2ws
========

Unofficial Node.js module for the Maxmind GeoIP2 Web Services.

[![npm](https://img.shields.io/npm/v/geoip2ws.svg?maxAge=3600)](https://github.com/fvdm/nodejs-geoip2ws/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-geoip2ws.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-geoip2ws)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geoip2ws/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geoip2ws?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/fvdm/nodejs-geoip2ws/badges/master/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-geoip2ws/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/fvdm/nodejs-geoip2ws/badges/master/code.svg)](https://www.bithound.io/github/fvdm/nodejs-geoip2ws/master/files)

* [Node.js](https://nodejs.org/)
* [Maxmind GeoIP2 Web Services](https://www.maxmind.com/en/geoip2-precision-services)
* [API documentation](http://dev.maxmind.com/geoip/geoip2/web-services/)
* [Development](https://github.com/fvdm/nodejs-geoip2ws/wiki)


Usage
-----

There are multiple ways to load and set up this module.
All communication is done over HTTPS.

#### One line

```js
require ('geoip2ws') (userId, licenseKey) (ip, callback);
```

#### Multiple calls, same account

```js
const geoip2ws = require ('geoip2ws') (userId, licenseKey);
geoip2ws (ip1, callback);
geoip2ws (ip2, callback);
```

#### Mix products (or accounts)

```js
const geoip2ws = require ('geoip2ws');
const insights = new geoip2ws (userId, licenseKey, 'insights');
const country = new geoip2ws (userId, licenseKey, 'country');

// precise lookup, higher cost
insights (ip, callback);

// vague lookup, lower cost
country (ip, callback);
```


Installation
------------

You need a Maxmind account ID and license key with enough credits
for one of their GeoIP *web* services.
You can find both [*here*](https://www.maxmind.com/en/my_license_key).

`npm i geoip2ws --save`


The functions
-------------

The _first function_ is the setup and takes these settings:

parameter      | type    | required | description
:--------------|:--------|:---------|:--------------------------------
userId         | string  | yes      | Your Maxmind account user ID
licenseKey     | string  | yes      | Your Maxmind account license key
service        | string  | no       | The service you'd like to use: `insights`, `country`, `city` (default)
requestTimeout | integer | no       | Socket read timeout in milliseconds to wait for reply from MaxMind

```js
// With arguments
const geo = require ('geoip2ws') (1234, 'abc', 'country', 2000);

// Or with an object
const geo = require ('geoip2ws') ({
  userId: 1234,
  licenseKey: 'abc',
  service: 'country',
  requestTimeout: 2000
});
```


The _second function_ does the IP-address lookup and takes these arguments:

parameter | type     | required | description
:---------|:---------|:---------|:--------------------------------------------
service   | string   | no       | The service, same as above
ip        | string   | yes      | The IPv4 or IPv6 address to lookup
callback  | function | yes      | Your callback `function` to receive the data

```js
geo ('city', '145.53.252.135', myCallback);
```


Callback
--------

The callback function receives result data and errors. Unless an error occurs the
data JSON will be parsed to an object. When everything is ok `err` is `null` else
`err` is an instance of `Error`. It also returns API errors this same way.

```js
function myCallback (err, data) {
  if (err) {
    console.log (err);
  } else {
    console.log (data.city.names.en);
  }
}
```

[Example response data](http://dev.maxmind.com/geoip/geoip2/web-services/#Response_Body)


#### Errors

error message           | description                      | additional
:-----------------------|:---------------------------------|:--------------------------
no userId or licenseKey | You did not set your credentials |
invalid service         | The service name is invalid      | no credits used
invalid ip              | The IP-address is invalid        | no credits used
request failed          | A request error occured          | `err.error`
API error               | API error occured                | `err.code` and `err.error`


[List of API errors](http://dev.maxmind.com/geoip/geoip2/web-services/#Errors)


Unlicense
---------

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

For more information, please refer to <http://unlicense.org/>


Author
------

[Franklin van de Meent](https://frankl.in/)

[![Buy me a coffee](https://frankl.in/u/kofi/kofi-readme.svg)](https://ko-fi.com/franklin)

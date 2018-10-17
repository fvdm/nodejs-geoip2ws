geoip2ws
========

Unofficial Node.js module for the Maxmind GeoIP2 Web Services.

[![npm](https://img.shields.io/npm/v/geoip2ws.svg?maxAge=3600)](https://github.com/fvdm/nodejs-geoip2ws/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-geoip2ws.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-geoip2ws)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-geoip2ws/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-geoip2ws?branch=master)
[![Greenkeeper](https://badges.greenkeeper.io/fvdm/nodejs-geoip2ws.svg)](https://greenkeeper.io/)

* [Node.js](https://nodejs.org/)
* [Maxmind GeoIP2 Web Services](https://www.maxmind.com/en/geoip2-precision-services)
* [API documentation](http://dev.maxmind.com/geoip/geoip2/web-services/)
* [Development](https://github.com/fvdm/nodejs-geoip2ws/wiki)


Usage
-----

There are multiple ways to load and use this module.

When you don't provide a callback function you'll get
a _promise_ in return.


#### One line with callback

```js
require ('geoip2ws') (userId, licenseKey) (ip, callback);
```


#### Promise

```js
const geo = require ('geoip2ws') ({
  userId: 12345,
  licenseKey: 'abc678',
});

geo ('city', '1.2.3.4')
  .then (console.log)
  .catch (console.error)
;
```


Installation
------------

You need a Maxmind account ID and license key with enough credits
for one of their GeoIP *web* services.
You can find both [*here*](https://www.maxmind.com/en/my_license_key).

`npm i geoip2ws`


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
callback  | function | no       | Your callback. Leave out to return a promise.

```js
geo ('city', '145.53.252.135', myCallback);
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

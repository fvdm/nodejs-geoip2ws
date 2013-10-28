nodejs-geoip2ws
===============

Unofficial Node.js module for the Maxmind GeoIP2 Web Services.


Installation
------------

You need a Maxmind account ID and license key with enough credits for one of their GeoIP *web*
services. You can find both [*here*](https://www.maxmind.com/en/my_license_key).


### From npm

The version on [npm](https://npmjs.org/package/geoip2ws) is always the latest stable release.

	npm install geoip2ws
	

### From source

The version on Github is the most recent code, but may be unstable.

	npm install git+https://github.com/fvdm/nodejs-geoip2ws


Usage
-----

There are multiple ways to load and set up this module. All communication is done over HTTPS.


```js
require('geoip2ws')( userId, licenseKey )( ip, callback )
```

```js
var geo = require('geoip2ws')( userId, licenseKey )
geo( ip, callback )
```

```js
var geo = require('geoip2ws')
geo = geo( userId, licenseKey )
geo( ip, callback )
```


The functions
-------------

The _first function_ is the setup and takes these arguments:

	userId       required   Your Maxmind account user ID
	licenseKey   required   Your Maxmind account license key
	service      optional   The service you'd like to use:
	                          omni, country, city, city_isp_org (default)
	request_timeout	optional	Socket read timeout for in millisec to wait for reply from MaxMind

```js
var geo = require('geoip2ws')( 1234, 'abc', 'country', 2000 )
```


The _second function_ does the IP-address lookup and takes these arguments:

	service      optional   The service, same as above
	ip           required   The IPv4 or IPv6 address to lookup
	callback     required   Your callback `function` to receive the data

```js
geo( 'city', '145.53.252.135', myCallback )
```


Callback
--------

The callback function receives result data and errors. Unless an error occurs the
data JSON will be parsed to an object. When everything is ok `err` is `null` else
`err` is an instance of `Error`. It also returns API errors this same way.

```js
function myCallback( err, data ) {
	if( err ) {
		console.log( err, err.stack )
	} else {
		console.log( data.city.names.en )
	}
}
```

Response data: <http://dev.maxmind.com/geoip/geoip2/web-services/#Response_Body>


### Errors

	no userId or licenseKey   You did not set your credentials.
	request failed            A request error occured, see `err.error`.
	request dropped           API cancelled the request.
	no data                   API response was empty.
	not json                  API response was not in JSON.
	API error                 API error occured, see `err.code` and `err.error`.

API errors: <http://dev.maxmind.com/geoip/geoip2/web-services/#Errors>


License
-------

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

This product includes GeoLite2 data created by MaxMind, available from
<http://www.maxmind.com>.

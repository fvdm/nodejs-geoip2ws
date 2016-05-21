var geoip = require ('geoip2ws') ({
  userId: '00000',
  licenseKey: 'abc123',
  service: 'city'
});

geoip ('me', console.log);

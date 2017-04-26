# akamai-edgeAuth-node

###Please use test_token.js to output the token string, the format is like

key={key} id={id} window={window} node test_token.js

###To integrate this module with other app, please use this script to get token,
var akamai_auth = require('akamai-edgeauth-node');
akamai_auth.setConfig({
  key: {key},
  window: {ttl in seconds},
  session_id:{id}, //optional
  acl: {acl}, //optional
  url: {url}, //optional
});
var token = akamai_auth.generateToken()

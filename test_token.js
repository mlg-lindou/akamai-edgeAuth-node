var akamai_auth = require('./akamai-edgeAuth');
akamai_auth.setConfig({
	key: process.env.key,
	session_id: process.env.id,
	window: process.env.window
});

console.log(akamai_auth.generateToken());
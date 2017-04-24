var cypsto = require('crypto');
var _ = require('loadash');

var Akamai_EdgeAuth_Node = Object.create(null, {
	config: {
		algo: "SHA256",
		ip: '',
		start_time: Math.floor(new Date().getTime()/1000),
		window: 300,
		acl: '/*',
		url: '',
		session_id: '',
		data: '',
		salt: '',
		key: 'aabbccddeeff00112233445566778899',
		field_delimiter: '~'
	}
})

Akamai_EdgeAuth_Node.generateToken = function(config) {
	this.config = _.merge({}, this.config, conf);

  	var text = getIp() + getStartTime () + getExp() + getAcl() + getSessionId() + getData() + getSalt();

	var signature = crypto.createHmac('sha256', this.config.key)
		.update(text)
		.digest('hex');

	return text + 'hmac=' + signature;
}

function getIp() {
	if (Akamai_EdgeAuth_Node.config.ip)
		return 'ip=' + Akamai_EdgeAuth_Node.config.ip + Akamai_EdgeAuth_Node.config.field_delimiter;
	else
		return '';
}

function getStartTime() {
	return 'st=' + Akamai_EdgeAuth_Node.config.start_time + Akamai_EdgeAuth_Node.config.field_delimiter;
} 

function getExp() {
	return 'exp=' + (Math.floor(new Date().getTime()/1000) + Akamai_EdgeAuth_Node.config.window) + Akamai_EdgeAuth_Node.config.field_delimiter;
}

function getAcl() {
	return 'acl=' + encodeURIComponent(Akamai_EdgeAuth_Node.config.acl) + Akamai_EdgeAuth_Node.config.field_delimiter;
}

function getSessionId() {
	if (Akamai_EdgeAuth_Node.config.session_id) 
		return 'id=' + Akamai_EdgeAuth_Node.config.session_id + Akamai_EdgeAuth_Node.config.field_delimiter;
	else
		return '';
}

function getData() {
	if (Akamai_EdgeAuth_Node.config.data)
		return 'data=' + Akamai_EdgeAuth_Node.config.data + Akamai_EdgeAuth_Node.config.field_delimiter;
	else
		return '';
}

function getSalt() {
	if  (Akamai_EdgeAuth_Node.config.salt)	
		return 'salt=' + Akamai_EdgeAuth_Node.config.salt + Akamai_EdgeAuth_Node.config.field_delimiter;
	else
		return '';
}

module.exports = Akamai_EdgeAuth_Node;
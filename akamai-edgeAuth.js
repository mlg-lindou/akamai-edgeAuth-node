var crypto = require('crypto');
var _ = require('lodash');

var Akamai_EdgeAuth_Node = Object.create(null, {
	config: {
	    writable: true,
	    value: {
			algo: "sha256",
			ip: '',
			start_time: 0,
			window: 300,
			acl: '/*',
			url: '',
			session_id: '',
			data: '',
			salt: '',
			key: 'aabbccddeeff00112233445566778899',
			field_delimiter: '~'
		}
	}
})

Akamai_EdgeAuth_Node.setConfig = function(config) {
	this.config = _.merge({}, this.config, config);
}

Akamai_EdgeAuth_Node.generateToken = function() {
  	var text = this.getIp() + this.getStartTime() + this.getExp() + this.getAcl() + this.getSessionId() + this.getData();
  	var text_digest = text + this.getUrl() + this.getSalt();
	var signature = crypto.createHmac('sha256', hex2bin(this.config.key))
		.update(text_digest.substring(0, text_digest.length-1))
		.digest("hex");
	console.log(text + 'hmac=' + signature);
	return text + 'hmac=' + signature;
}

Akamai_EdgeAuth_Node.getIp = function() {
	if (this.config.ip)
		return 'ip=' + this.config.ip + this.config.field_delimiter;
	else
		return '';
}

Akamai_EdgeAuth_Node.getStartTime = function() {
	if (this.config.start_time)
		return 'st=' + this.config.start_time + this.config.field_delimiter;
	else
		return '';
} 

Akamai_EdgeAuth_Node.getExp = function() {
	var time = Math.floor(new Date().getTime()/1000) + parseInt(this.config.window);
	return 'exp=' + time + this.config.field_delimiter;
}

Akamai_EdgeAuth_Node.getAcl = function() {
	return 'acl=' + escape(this.config.acl) + this.config.field_delimiter;
}

Akamai_EdgeAuth_Node.getSessionId = function() {
	if (this.config.session_id) 
		return 'id=' + this.config.session_id + this.config.field_delimiter;
	else
		return '';
}

Akamai_EdgeAuth_Node.getData = function() {
	if (this.config.data)
		return 'data=' + this.config.data + this.config.field_delimiter;
	else
		return '';
}

Akamai_EdgeAuth_Node.getUrl = function() {
	if (this.config.url) 
		return 'url=' + escape(this.config.url) + this.config.field_delimiter;
	else
		return '';
}

Akamai_EdgeAuth_Node.getSalt = function() {
	if  (this.config.salt)	
		return 'salt=' + this.config.salt + this.config.field_delimiter;
	else
		return '';
}

function hex2bin(hex) {
    var bytes = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        bytes.push(parseInt(hex.substr(i, 2), 16));

    return String.fromCharCode.apply(String, bytes);    
}

module.exports = Akamai_EdgeAuth_Node;
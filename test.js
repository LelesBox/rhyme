/**
 * Created by blake on 2/18/16.
 */
var baseString = function (method, url, oauth_consumer_key, oauth_nonce, timestamp, oauth_token) {
    return method + "&" + encodeURIComponent(url) + "&" + encodeURIComponent("oauth_consumer_key=" + oauth_consumer_key
            + "&oauth_nonce=" + oauth_nonce + "&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" + timestamp
            + "&oauth_token=" + oauth_token + "&oauth_version=1.0")
}

//签名
var url = 'https://iphone-api.fitbit.com/1/user/-/profile.json'
url = 'https://iphone-api.fitbit.com/1/activities/90013.json'
var oauth_consumer_key = "lmsg3wj8pjz532bhjhq0ymsi3w1z7gqs"
var oauth_nonce = "l0Mf6VOpRYKxFR0NDqAxJw=="
var oauth_token = "e03cb8a6043878fd8bcc8d9ba78db7bd"
var secret = '6d1e068f965456e27bbb331f4afac76f&'
var timestamp = (new Date - 1 + "").substr(0, 10)

var crypto = require('crypto')
var t = baseString('GET', url, oauth_consumer_key, oauth_nonce, 1455776394, oauth_token);
var signature = crypto.createHmac('sha1', secret).update(t).digest().toString('base64')

console.log(t)
console.log(signature)

var Authorizetion = 'OAuth oauth_consumer_key="' + oauth_consumer_key + '", oauth_nonce="' + encodeURIComponent(oauth_nonce) + '", oauth_signature="' + encodeURIComponent(signature) + '",' +
    ' oauth_signature_method="HMAC-SHA1", oauth_timestamp="' + timestamp + '", oauth_token="' + oauth_token + '", oauth_version="1.0"'

console.log(Authorizetion)

var example = 'OAuth oauth_consumer_key="lmsg3wj8pjz532bhjhq0ymsi3w1z7gqs", oauth_nonce="l0Mf6VOpRYKxFR0NDqAxJw%3D%3D", oauth_signature="H1YSjEO2%2Bp628s5jA3ei3U6XTDA%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1455776386", oauth_token="e03cb8a6043878fd8bcc8d9ba78db7bd", oauth_version="1.0"'
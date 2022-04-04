const CryptoJS = require('crypto-js');
const YOUR_WYRE_SECRET_KEY = 'SK-G38NZAP8-R3BJCXWW-TBXMMFWM-Z7ZDMLAZ';
const url = 'http://localhost:3000';
// Signature Calculation using Crypto-js
// url is a string, data is a buffer
var data = Buffer.from('mensaje', 'utf8');

const signature = (url, data) => {
    const urlBuffer = Buffer.from(url);
    const dataToBeSigned = Buffer.concat([urlBuffer, data]);
    const token = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(dataToBeSigned, YOUR_WYRE_SECRET_KEY));
    return token;
}
var token = signature(url, data);
console.log("token: " + token);

/*
{"API key": "AK-NDAXWCEU-QPVY9XTW-AUNGQWYE-TBMGPRVQ",
"Secret key": "SK-G38NZAP8-R3BJCXWW-TBXMMFWM-Z7ZDMLAZ"}
*/

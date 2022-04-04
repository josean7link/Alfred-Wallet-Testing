// This sample assumes use of Express Node.js framework 
const axios = require('axios');
const CryptoJS = require('crypto-js');
const express = require('express');
const app = express()


// Store API keys in your environment configuration.
const API_key = "AK-NDAXWCEU-QPVY9XTW-AUNGQWYE-TBMGPRVQ";
const Secret_key = "SK-G38NZAP8-R3BJCXWW-TBXMMFWM-Z7ZDMLAZ";

const productionUrl = "https://api.senwyre.com";
const testUrl = "https://api.testwyre.com";
const url_path = "/v2/wallets";

// Signature Calculation using Crypto-js
function signature(url, data) {
    const dataToSign = url + data;
    const token = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(
            dataToSign.toString(CryptoJS.enc.Utf8),
            Secret_key
            )
        );
    return token;
}
/*
async function rateQuote(req, res, next) {
        try {
            const timestamp = new Date().getTime();

            const url = `${testUrl}${url_path}?timestamp=${timestamp}`;

            const body = {
                accountId: "AC_xxxxxxxx",
                // amount: "100.75",
                // sourceCurrency: "USD",
                // destCurrency: "BTC",
                // dest: "bitcoin:1xxxxxxxxxxxxxxx",
                // country: "US",
                // walletType: "DEBIT_CARD"
            }
            const details = JSON.stringify(body);
            const token = signature(testUrl, details)

            const headers = {};
            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = API_key;
            headers['X-Api-Signature'] = token;

            const config = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }
            const response = await axios(config);
            res.send(response.data);

        }
        catch (error) {
            next(error)
        }
    }

app.use(rateQuote)
*/

const timestamp = new Date().getTime();

const url = `${testUrl}${url_path}?timestamp=${timestamp}`;

const body = {
    type: "DEFAULT",
    name: "testing",
    callbackUrl: "https://your.callback.url",
    notes: "User Wallet Testing"
    // accountId: "AC_xxxxxxxx",
    // amount: "100.75",
    // sourceCurrency: "USD",
    // destCurrency: "BTC",
    // dest: "bitcoin:1xxxxxxxxxxxxxxx",
    // country: "US",
    // walletType: "DEBIT_CARD"
}
const details = JSON.stringify(body);
const token = signature(url, details)

const headers = {};
headers['Content-Type'] = 'application/json';
headers['X-Api-Key'] = API_key;
headers['X-Api-Signature'] = token;

const config = {
    method: "POST",
    url: url,
    headers: headers,
    data: details
}
// console.log(config)

var request = require('request');

request.post({
  headers: headers,
  url:     url,
  body:    details
}, function(error, response, body){
  console.log(body);
});

// console.log("url body: " + JSON.stringify(body));
// console.log("url headers: " + JSON.stringify(headers));
// console.log("token: " + token);
// console.log("tiempo en timestamp: " + timestamp);
// console.log("tiempo en formato detallado: " + (Date(timestamp)).toString());

/*
// Signature Calculation using Crypto-js
const signature = (url, data) => {
    const dataToSign = url + data;
    const token = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(
            dataToSign.toString(CryptoJS.enc.Utf8),
            Secret_key
            )
        );
    return token;
}

// Wallet Order Quotation POST request: 
// https://docs.sendwyre.com/docs/wallet-order-quotation
async rateQuote(req, res, next) {
        try {
            const timestamp = new Date().getTime();
            const url = `${testUrl}/v3/orders/quote/partner?timestamp=${timestamp}`;
            const headers = {};
            const body = {
                amount: "100.75",
                sourceCurrency: "USD",
                destCurrency: "BTC",
                dest: "bitcoin:1xxxxxxxxxxxxxxx",
                country: "US",
                accountId: "AC_xxxxxxxx",
                walletType: "DEBIT_CARD"
            }
            const details = JSON.stringify(body);

            headers['Content-Type'] = 'application/json';
            headers['X-Api-Key'] = API_key;
            headers['X-Api-Signature'] = signature(url, details);

            const config = {
                method: "POST",
                url: url,
                headers: headers,
                data: details
            }

            const response = await axios(config);
            res.send(response.data);

        } catch (error) {
            next(error)
        }
    }
*/

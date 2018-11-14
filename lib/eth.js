
const Web3 = require('web3');

const ENDPOINT = 'a44f1015be38211e89bc60a246b610f4-235157082.us-east-1.elb.amazonaws.com';
let web3;

(() => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(`http://${ENDPOINT}`));
  }
})();

module.exports = web3;

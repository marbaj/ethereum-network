
//const ENDPOINT = 'a44f1015be38211e89bc60a246b610f4-235157082.us-east-1.elb.amazonaws.com';
const ENDPOINT = '127.0.0.1:7545';

const web3 = require('./lib/eth')(ENDPOINT);
const accounts = require('./lib/accounts');
const contracts = require('./lib/contracts/Contract');

module.exports = { web3, ...accounts, ...contracts };
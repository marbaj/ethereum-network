
const ENDPOINT = 'a44f1015be38211e89bc60a246b610f4-235157082.us-east-1.elb.amazonaws.com';

const web3 = require('./lib/eth')(ENDPOINT);
const accounts = require('./lib/accounts');
const contracts = require('./lib/contract');

module.exports = { web3, ...accounts, ...contracts };
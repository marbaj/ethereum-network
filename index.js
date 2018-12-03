let web3, accounts, contracts;

const init = (endpoint) => {
  web3 = require('./lib/eth')(endpoint, protocol = 'http');
  accounts = require('./lib/accounts');
  contracts = require('./lib/contracts/Contract');
};

module.exports = { init, web3, ...accounts, ...contracts };
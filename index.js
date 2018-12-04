
module.exports = (endpoint) => {
  const web3 = require('./lib/eth')(endpoint, protocol = 'http');
  const accounts = require('./lib/accounts');
  const contracts = require('./lib/contracts/Contract');

  module.exports = { web3, ...accounts, ...contracts };
};

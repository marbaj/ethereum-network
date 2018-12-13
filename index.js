let web3;

module.exports = (endpoint, protocol) => {
  if (web3 === undefined) {
    if (endpoint === undefined) {
      throw new Error('Error! Expected endpoint URL for ethereum network');
    }

    web3 = require('./lib/eth')(endpoint, protocol);
  }
  
  const accounts = require('./lib/accounts');
  const contracts = require('./lib/contracts/Contract');
  const wallet = require('./lib/wallet');


  return { web3, ...accounts, ...contracts, ...wallet };
};

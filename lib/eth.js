
const Web3 = require('web3');
let web3;

const initWeb3 = (ENDPOINT, protocol = 'http') => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider(`${protocol}://${ENDPOINT}`));
  }

  return web3;
};

module.exports = (endpoint) => {
  if (web3 !== undefined) {
    return web3;
  } else {
    return initWeb3(endpoint);
  }
};

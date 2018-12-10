
const Web3 = require('web3');
let web3;

const initWeb3 = (ENDPOINT, protocol = 'http') => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else if (protocol === 'http') {
    web3 = new Web3(new Web3.providers.HttpProvider(`${protocol}://${ENDPOINT}`));
  } else if (protocol === 'ws') {
    web3 = new Web3(new Web3.providers.WebsocketProvider(`${protocol}://${ENDPOINT}`));
  }

  return web3;
};

module.exports = (endpoint, protocol) => {
  return web3 !== undefined ? web3 : initWeb3(endpoint, protocol);
};

const web3 = require('./eth')();
const errorHander = require('./error');

/**
 * 
 */
class Contract {

  constructor (contractAddress, ABI, address, gas) {
    const abi = JSON.parse(ABI);

    this._contract = new web3.eth.Contract(abi, contractAddress, {
      from: address,
      gasPrice: gas
    });
  };

  async executeMethod (methodName, ...args) {
    return await this._contract.methods[methodName](...args).call();
  };

};


module.exports = { Contract };
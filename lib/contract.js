const web3 = require('./eth')();
const errorHander = require('./error');

/**
 * 
 */
class Contract {

  /**
   * 
   * @param {*} contractAddress 
   * @param {*} ABI 
   * @param {*} address 
   * @param {*} gas 
   */
  constructor (contractAddress, ABI, address, gas) {
    const abi = JSON.parse(ABI);

    this._contract = new web3.eth.Contract(abi, contractAddress, {
      from: address,
      gasPrice: gas
    });
  };

  /**
   * 
   * @param {*} methodName 
   * @param  {...any} args 
   */
  async executeMethod (methodName, ...args) {
    return await this._contract.methods[methodName](...args).call();
  };

  /**
   * 
   * @param {*} methodName 
   * @param {*} tx 
   */
  async send (methodName, tx) {
    return await this._contract.methods[methodName]().send(tx)
  };

};


module.exports = { Contract };
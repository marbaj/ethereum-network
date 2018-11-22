const web3 = require('../eth')();
const errorHander = require('../error');

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
    this._contractAddress = contractAddress;
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
  async send (methodName, options) {
    const methodAbi = await this._contract.methods[methodName]().encodeABI();

    const tx = { 
      data: methodAbi,
      from: options.from,
      to: this._contractAddress,
      value: options.value, 
      gas: 5000000 
    };

    await web3.eth.sendTransaction(tx);
  };
};

module.exports = { Contract };
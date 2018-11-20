const web3 = require('./eth')();
const errorHander = require('./error');

const findAccount = async (address) => {
  if (typeof address === 'number') {
    const accounts = await web3.eth.getAccounts();
    address = accounts[address];
  }

  return address;
};

/**
 * Returns all accounts on the node
 */
const accounts = async () => {
  await web3.eth.net.isListening();
  try {
    return await web3.eth.getAccounts();
  } catch (err) {
    return errorHander(err);
  }
};

/**
 * 
 * @param {String | Number} address Accounts Address or index
 * @param {String} pass Account password
 * @param {*} duration Duration in seconds to keep account unlocked, default is 180 seconds
 */
const unlock = async (address, pass, duration = 180 /* unlocked for 180 seconds */) => {
  address = await findAccount(address);

  try {
    return await web3.eth.personal.unlockAccount(address, pass, duration);
  } catch (err) {
    return errorHander(err);
  }
};

/**
 * 
 * @param {String | Number} fromAccount 
 * @param {String | Number} toAccount
 * @param {*} amount 
 * @param {*} pass 
 */
const transferFounds = async (fromAccount, toAccount, amount, pass) => {
  const sender = await findAccount(fromAccount);
  const receiver = await findAccount(toAccount);

  try {
    await web3.eth.personal.unlockAccount(sender, pass, 200);
    const rawTransaction = {
      from: sender, 
      to: receiver, 
      value: amount //web3.utils.toWei(amount, "ether"),
  //    gas: web3.utils.toHex('21000'),
  //    gasLimit: web3.utils.toHex(gasLimit)
    };

    return await web3.eth.sendTransaction(rawTransaction);
  } catch (err) {
    return errorHander(err);
  }
};

/**
 * 
 * @param {String | Number} fromAccount 
 * @param {String | Number} toAccount
 * @param {*} amount 
 * @param {*} pass 
 */
const signedTransaction = async (fromAccount, toAccount, amount, key) => {
  const sender = await findAccount(fromAccount);
  const receiver = await findAccount(toAccount);

  try {
    const tx = {
      from: sender, 
      to: receiver, 
      value: amount, //web3.utils.toWei(amount, "ether"),
      gas: web3.utils.toHex('21000'),
  //    gasLimit: web3.utils.toHex(gasLimit)
    };

    const res = await web3.eth.accounts.signTransaction(tx, key);

    return await web3.eth.sendSignedTransaction(res.rawTransaction);

//  .on('receipt', console.log);
  } catch (err) {
    return errorHander(err);
  }
};

/**
 * 
 * @param {*} pass 
 */
const newAccount = async (pass) => {
  try {
    return await web3.eth.personal.newAccount(pass);
  } catch (err) {
    return errorHander(err);
  }
};

/**
 * 
 * @param {*} entropy 
 */
const createNewAccount = async (entropy = undefined) => {
  return await web3.eth.accounts.create(entropy);
};

/**
 * 
 * @param {*} index 
 */
const balance = async (address) => {
  address = await findAccount(address);

  await web3.eth.net.isListening();
  try {
    return await web3.eth.getBalance(address);
  } catch (err) {
    return errorHander(err);
  }
};

module.exports = { 
  accounts, 
  transferFounds, 
  signedTransaction,
  newAccount, 
  createNewAccount,
  balance, 
  unlock 
};
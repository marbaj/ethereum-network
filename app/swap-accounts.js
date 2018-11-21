
const { unlock, web3, newAccount, transferFounds, signedTransaction, createNewAccount, balance } = require('..');


const myAccount = '0x099DE4a796B8AFc5DC1189f807384278adBa9398';
const acc = '0x42498d38387Dac687cC32a9309D545b47fFD729D';
const key = '0x8d3f9eebc8407cb18c07f330c4dd0b0573b3ef677f4401cd85eae998f9ec182f'

const setDefaultAccount = async (acc = myAccount, pass = 'rarulo') => {
  const res = await unlock(acc, pass, 20000 );
  console.log(res)
};

const moveAllFromSigned = async (from, to, amount, key) => {
  const res = await signedTransaction(from, to, amount, key);
  await balance(to);
  return res; 
};

moveAllFromSigned(acc, myAccount, 6423195999999989981, key);

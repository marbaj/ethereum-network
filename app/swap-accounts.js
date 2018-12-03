
const { unlock, web3, newAccount, transferFounds, signedTransaction, createNewAccount, balance } = require('..');


const myAccount = '0x099DE4a796B8AFc5DC1189f807384278adBa9398';
const acc = '0x42498d38387Dac687cC32a9309D545b47fFD729D';
const key = '0x8d3f9eebc8407cb18c07f330c4dd0b0573b3ef677f4401cd85eae998f9ec182f';

const callerAcc = '0xf1C3Db5d4Ee216a6C821f2ED03FE15157C2c990B';


const setDefaultAccount = async (acc = myAccount, pass = 'rarulo') => {
  const res = await unlock(acc, pass, 20000 );
  console.log(res)
};

const moveAllFromSigned = async (from, to, amount, key) => {
  const res = await signedTransaction(from, to, amount, key);
  await balance(to);
  return res; 
};

(async () => {
  console.log('getting balance ...')
  console.log(await balance(callerAcc));
})();

 //moveAllFromSigned(myAccount, callerAcc, 10000000000000000000, key);


// 6423195999999989981
// 59425568000100000000

// 210000000000000000
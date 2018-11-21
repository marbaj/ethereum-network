
const { Contract, unlock, web3, newAccount, transferFounds, signedTransaction, createNewAccount, balance } = require('../index');
const { abi, networks } = require('/Users/markobajic/code/test-net/basket/build/contracts/Mission.json')
const contractAddress = networks['8189450821'].address;

const myAccount = '0x88412553823D31335A10c4E1ed2Be452FfCeBab7';
const acc = '0x42498d38387Dac687cC32a9309D545b47fFD729D';
const key = '0x8d3f9eebc8407cb18c07f330c4dd0b0573b3ef677f4401cd85eae998f9ec182f'

const setDefaultAccount = async (acc = myAccount, pass = 'rarulo') => {
  const res = await unlock(acc, pass, 20000 );
  console.log(res)
};

const createAccount = async (pass = 'rarulo') => {
  const acc = await newAccount(pass);
  console.log(acc);
  const r = await unlock(acc, pass, 2000000);
  console.log(r)
};

const unsignedTx = async (from, to, amount, pass) => {
  const res = await transferFounds(from, to, amount, pass);
  await balance(to);
  return res; 
};

const signedTx = async (from, to, amount, key) => {
  const res = await signedTransaction(from, to, amount, key);
  await balance(to);
  return res; 
};

const run = async () => {
  try {
    await setDefaultAccount();
    const tx = { from: myAccount, value: 1000, gas: 5000000 };
    const c = new Contract(contractAddress, JSON.stringify(abi), myAccount, '41000')

    // c._contract.methods.deposite().estimateGas({ gas: 5000000 }, (a, b) => {
    //   console.log(a, b)
    // });

    // c._contract.methods.deposite().send(tx)
    // .on('transactionHash', console.log)
    // .on('receipt', console.log)
    // .on('confirmation', (conf, receipt) => {
    //   console.log(receipt);
    // })
    // .on('error', console.error);

    const res = await c.executeMethod('getMyBalance');
    console.log(res)
  } catch (err) {
    console.log(err)
  }
};

const account = async () => {
  const acc = await createNewAccount();
  console.log(acc);
};

//createAccount();
setDefaultAccount();
//run();

//unsignedTx(myAccount, '0x00b64480e1b2b1e26ca650a201da707d996713af', 1000, 'rarulo');

//signedTx(acc, myAccount, 4019999999999989979, key);



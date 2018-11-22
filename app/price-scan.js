
const { Contract, unlock, web3, newAccount, transferFounds, signedTransaction, createNewAccount, balance } = require('../index');
//const { abi, networks } = require('/Users/markobajic/code/test-net/basket/build/contracts/Mission.json')
////const contractAddress = networks['8189450821'].address;

const myAccount = '0xC502d9b1460f352689973Ac7A310A46DCb492212';
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
  console.log(r);

  await signedTx(acc, myAccount, 4019999999999989979, key);

  const b = await balance(acc);
  console.log(b)
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

signedTx(acc, '0xf1C3Db5d4Ee216a6C821f2ED03FE15157C2c990B', 100000, key);



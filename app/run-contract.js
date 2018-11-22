const { Contract, unlock, web3, balance , deploy } = require('../index');
const file = 'MissionFactory.sol';

const acc = '0xC502d9b1460f352689973Ac7A310A46DCb492212';
const callerAcc = '0xf1C3Db5d4Ee216a6C821f2ED03FE15157C2c990B';

const compile = async () => {
   const { abi, address } = await deploy(acc, [file]);
  
//  let { abi, address } = { };
//  abi = '[{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"b","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"submit","outputs":[{"name":"value","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"g","outputs":[{"name":"value","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]';
 // address = '0x3A0c18B7818A21a95Ba6d56286C67180ef8209Af';

  return { abi, address };
};

const withdraw = async (abi, address) => {
  const contract = new Contract(address, abi, callerAcc, '41000');

  let f = await contract.executeMethod('createContract');
  console.log(f);
 // console.log(await balance(callerAcc));

 // f = await contract.executeMethod('b');
//  console.log(f);
};

const credit = async (abi, address, amount) => {
  const contract = new Contract(address, abi, acc, '41000');
  let f = await contract.executeMethod('a');
  console.log(f); 

  await contract.send('g', { from: acc, value: amount });

  f = await contract.executeMethod('b');
  console.log(f);
};

(async () => {
  await unlock(acc, 'rarulo', 20000 );
  console.log(await balance(acc));
  const { abi, address } = await compile();
  credit(abi, address, 10000000);
//  withdraw(abi, address);
})();


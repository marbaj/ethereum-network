const { Contract, unlock, web3, balance , deploy } = require('../index');
const file = 'missions.sol';

const run = async () => {

  const acc = '0xC502d9b1460f352689973Ac7A310A46DCb492212';
  const callerAcc = '0xf1C3Db5d4Ee216a6C821f2ED03FE15157C2c990B';

  await unlock(acc, 'rarulo', 20000 );

  console.log(await balance(acc));

  // const { abi, address } = await deploy(acc, [file]);
  // console.log(abi, address);

  const abi = '[{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"b","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"submit","outputs":[{"name":"value","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"g","outputs":[{"name":"value","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]';
  const address = '0xF285f05835E9C0fB9D6c0f7C7a44A5D521124ff7';

  const contract = new Contract(address, abi, acc, '41000');
  let f;

  // f = await contract.executeMethod('a');
  // console.log(f); 

  // await contract.send('g', { from: acc, value: 18 });
  // console.log(await balance(acc));

  // f = await contract.executeMethod('b');
  // console.log(f);

  const contractCaller = new Contract(address, abi, callerAcc, '41000');

  f = await contractCaller.executeMethod('submit');
  console.log(f);
  console.log(await balance(callerAcc));

  f = await contract.executeMethod('b');
  console.log(f);
  console.log(await balance(callerAcc));
};

run();

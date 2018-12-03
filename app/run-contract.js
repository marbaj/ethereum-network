const { Contract, unlock, web3, balance } = require('../index');

// const acc = '0xC502d9b1460f352689973Ac7A310A46DCb492212';
// const callerAcc = '0xf1C3Db5d4Ee216a6C821f2ED03FE15157C2c990B';

const acc = '0xc9aE6A9479250d83C581Fc063C47a77944e5763c';
const callerAcc = '0x297c931B0Be97440DD713e675c2426Cb74215511';

const getBuild = (name) => {
  const build = require(`../lib/contracts//build/${name}`);
  const abi = build.interface;
  const address = build.address;

  return { abi, address, build };
}

const compile = async (name) => {
  await unlock(acc, 'rarulo', 20000 );
 // return await deploy(acc, [ name ]);
};

const createNewContract = async () => {
  const { abi, address } = getBuild('MissionFactory');

  const contract = new Contract(address, abi, callerAcc, '41000');
  return await contract.executeMethod('createContract');
};

const withdraw = async (abi, address) => {
   await unlock(callerAcc, 'rarulo', 20000);
  const contract = new Contract(address, abi, callerAcc);
  return await contract.withdraw('submit', callerAcc, 998907167708886670);
};

const credit = async (abi, address, amount) => {
  const contract = new Contract(address, abi, acc);
  
  return await contract.send('endowment', { from: acc, value: amount });
//  return await contract.executeMethod('endowment');
};

const remainingBalance = async (abi, address) => {
  const contract = new Contract(address, abi, acc);
  return await contract.executeMethod('remainingBalance');
};

(async () => {
  // await compile('Mission');
//  await compile('MissionFactory');
 
 // await unlock(acc, 'rarulo', 20000);

  const { abi } = getBuild('Mission');
                   
  const address = await createNewContract();

  console.log(address);



    return;

  await credit(abi, address, '998907167708886670');

  console.log(await remainingBalance(abi, address));
 //  console.log(await withdraw(abi, address));
 // console.log(await remainingBalance(abi, address));

 // console.log(await balance(acc));
 // credit(abi, address, 10000000);
//  withdraw(abi, address);
})();

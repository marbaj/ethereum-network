const web3 = require('../eth')();
const fs = require('fs');
const solc = require('solc');
const file = 'missions.sol';

const deploy = async (acc, files) => {

  const input = files.reduce((accumulator, file) => {
    accumulator[file] = fs.readFileSync(`${process.cwd()}/contracts/${file}`, 'utf8');
    return accumulator;
  }, {});

  console.log(input)
  const output = solc.compile({ sources: input }, 1);
  console.log(output.errors)
  // for (let contractName in output.contracts) {
  //   console.log(contractName + ': ' + output.contracts[contractName].bytecode);
  // }

  const compiledCode = output.contracts[`${file}:Mission`];
  const abi = compiledCode.interface;
  const bytecode = compiledCode.bytecode;

  const contractInstance = new web3.eth.Contract(JSON.parse(compiledCode.interface), null, { data: `0x${bytecode}` });

  const instance = await contractInstance.deploy({ arguments: [] }).send({
    from: acc,
    gas: 200000
  });

  return { abi, ...instance.options };
};

module.exports = deploy;

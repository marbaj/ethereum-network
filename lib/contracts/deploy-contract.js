const web3 = require('../eth')();
const fs = require('fs');
const path = require('path');
const solc = require('solc');

/**
 * Read Dependencies
 * @param {*} path Dependencies file path
 */
const findImports = (file) => {
  try {
    const filePath = path.join(process.cwd(), '/contracts/', file);
    const source = fs.readFileSync(filePath, 'utf8');
    return { contents: source };
  } catch (err) {
    return { error: 'File not found' }
  }   
};

/**
 * Deploy Solidity contract
 * @param {*} acc Account that will deploy the contract
 * @param {*} files Solidity contract files
 */
const deploy = async (acc, files) => {

  const input = files.reduce((accumulator, file) => {
    accumulator[`${file}.sol`] = fs.readFileSync(`${process.cwd()}/contracts/${file}.sol`, 'utf8');
    return accumulator;
  }, { });

  console.log(input)
  const output = solc.compile({ sources: input }, 1, findImports);
  console.log(output.errors);

  const contractName = files[0];
  const compiledCode = output.contracts[`${contractName}.sol:${contractName}`];
  
  const contractInstance = new web3.eth.Contract(JSON.parse(compiledCode.interface), null, { data: `0x${compiledCode.bytecode}` });

  const instance = await contractInstance.deploy({ arguments: [] }).send({
    from: acc,
    gas: 2000000
  });

  const build = Object.assign({}, compiledCode, instance.options, output.contracts);
  fs.writeFileSync(path.resolve(__dirname, './build', `${contractName}.json`), JSON.stringify(build, null, 2));
  
  const abi = compiledCode.interface;

  return { abi, ...instance.options };
};

module.exports = deploy;

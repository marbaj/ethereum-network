const web3 = require('../eth')();
const fs = require('fs');
const path = require('path');
const solc = require('solc');

/**
 * 
 * @param {*} path 
 */
const findImports = (path) => {
  const filePath = `${process.cwd()}/contracts/${path}`;
  const source = fs.readFileSync(filePath, 'utf8');
  return { contents: `${source}` };
  //     return { error: 'File not found' }
};

const deploy = async (acc, files) => {

  const input = files.reduce((accumulator, file) => {
    accumulator[file] = fs.readFileSync(`${process.cwd()}/contracts/${file}`, 'utf8');
    return accumulator;
  }, {});

  console.log(input)
  const output = solc.compile({ sources: input }, 1, findImports);
  console.log(output.errors);

  const contractName = files[0].split('.')[0];
  const compiledCode = output.contracts[`${files[0]}:${contractName}`];
  const contractInstance = new web3.eth.Contract(JSON.parse(compiledCode.interface), null, { data: `0x${compiledCode.bytecode}` });

  const instance = await contractInstance.deploy({ arguments: [] }).send({
    from: acc,
    gas: 2000000
  });

  const build = Object.assign(compiledCode, instance.options);
  fs.writeFileSync(path.resolve(__dirname, './build', `${contractName}.json`), JSON.stringify(build, null, 2));
  
  const abi = compiledCode.interface;

  return { abi, ...instance.options };
};

module.exports = deploy;

const { Contract, unlock, web3, newAccount, transferFounds, signedTransaction, createNewAccount, balance } = require('../index');

const solc = require('solc');

var input = {
//  'lib.sol': 'library L { function f() returns (uint) { return 7; } }',
  'cont.sol': ' contract x { function g() {  } }'
}

var output = solc.compile({ sources: input }, 1)
for (var contractName in output.contracts) {
  console.log(contractName );
}

const c = output.contracts['cont.sol:x'];

let X = new web3.eth.Contract(JSON.parse(c.interface), null, { 
  data: '0x' + c.bytecode 
});

X.deploy().send({
  from: '0x88412553823D31335A10c4E1ed2Be452FfCeBab7',
  value: 1,
//  gasPrice: gasPrice, 
  gas: 200000
}).then((instance) => { 
  console.log("Contract mined at " + instance.options.address);
  helloInstance = instance; 
});
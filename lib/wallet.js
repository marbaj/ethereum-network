const { lib } = require('crypto-js');
const bip39 = require('bip39');
const hdKey = require('ethereumjs-wallet/hdkey');

const getAccount = (mnemonic, accountIndex) => {
  const hdWallet = hdKey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
  const wallet = hdWallet.derivePath(`m/44'/60'/0'/0/${accountIndex}`).getWallet();
  return {
    address: wallet.getAddressString(),
    key: wallet.getPrivateKeyString()
  };
};

const getMnemonic = (entropy) => {
  entropy = entropy || lib.WordArray.random(24).toString();
  return bip39.entropyToMnemonic(entropy);
};

module.exports = {
  getAccount: getAccount,
  getMnemonic: getMnemonic
};

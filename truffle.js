const bip39 = require("bip39");
const hdkey = require('ethereumjs-wallet/hdkey');
const ProviderEngine = require("web3-provider-engine");
const WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
const Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
const Web3 = require("web3");
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

// Get our mnemonic and create an hdwallet
const mnemonic = "piano file obey immense polar rack great subject clutch camera maid ostrich";
const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
const wallet_hdpath = "m/44'/60'/0'/0/";
const wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
const address = "0x" + wallet.getAddress().toString("hex");

const providerUrl = "https://testnet.infura.io";
const engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.

module.exports = {
  networks: {
    ropsten: {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use the custom provider
      from: address,     // Use the address derived address
      gas: 4444444
    },
    development: {
      host: "localhost",
      port: 7545, // This is the conventional port. If you're using the Ganache Blockchain, change port value to the Ganache default port 7545. If you're using Truffle develop network, change port value to 9545
      network_id: "*", // Match any network id. You may need to replace * with your network Id
      from: "0x2b6C7E2662176412C5385b2eCf90dDD037dC2cC3", // Add your unlocked account within the double quotes
      gas: 4444444
    }
  }
};

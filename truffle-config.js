const path = require("path");
require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: '*'
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex)
      },
      network_id: 1337
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "wss://goerli.infura.io/ws/v3/49352c6ab6d24bb1adc19ea30407950d", MetaMaskAccountIndex)
      },
      network_id: 5
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "wss://ropsten.infura.io/ws/v3/49352c6ab6d24bb1adc19ea30407950d", MetaMaskAccountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};

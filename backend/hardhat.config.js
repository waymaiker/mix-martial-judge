require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-gas-reporter")
require('hardhat-docgen')
require("solidity-coverage")
require('dotenv').config()

const PK = process.env.PK || "";
const ALCHEMY = process.env.ALCHEMY || "";
const ETHERSCAN = process.env.ETHERSCAN || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    goerli: {
      url: ALCHEMY,
      accounts: [`0x${PK}`],
      chainId: 5,
      blockConfirmations: 6
    },
  },
  solidity : {
    compilers: [
      {
        version: "0.8.17"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN
    }
  },
  docgen: {
    path: './docs',
    clear: true
  },
  gasReporter: {
    enabled: true
  }
};
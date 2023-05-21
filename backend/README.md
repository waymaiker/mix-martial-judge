# Mix Martial Judge - Backend part

## Contents
- [Important](#important)
- [How to use this project](#how-to-use-this-project)
- [Resources](#resources)

## How to use this project
This project will require that you have already installed
* Yarn
* Node
* Git

If you are familiar with git and the terminal, here are few steps to follow

### Clone the project
```shell
git clone https://github.com/waymaiker/mix-martial-judge/tree/master/backend
```

### Install libraries
```shell
cd backend
yarn install
```
### hardhat commands
```shell
# Start the local Blockchain
yarn hardhat node
```

#### In an other terminal tab
```shell
# Deploy your smart contract on localhost hardhat
yarn hardhat deploy
```

#### If you want to deploy on an other network

1- Add the network name and Id into this [helper-hardhat-config.js](https://github.com/waymaiker/mix-martial-judge/blob/master/backend/helper-hardhat-config.js) <br/>
2- Make sur your .env file is all set with your RPC nodes Api Key, Private Key and the Etherscan Api Key <br/>
3- Configure your [hardhat.config.js](https://github.com/waymaiker/mix-martial-judge/blob/master/backend/hardhat.config.js) <br/>
4- Then execute the next command

#### Need to deploy the contract on Goerli
```shell
# Deploy your smart contract on testnet GOERLI
yarn hardhat deploy --network goerli
```

#### test commands
```shell
yarn hardhat test
yarn hardhat coverage
```


## Resources
Backend
* https://docs.soliditylang.org/en/latest/
* [https://hardhat.org/](https://github.com/NomicFoundation/hardhat)
* https://github.com/wighawag/hardhat-deploy
* https://github.com/ethers-io/ethers.js/
* https://www.chaijs.com/
* https://www.dotenv.org/docs/
* https://github.com/ItsNickBarry/hardhat-docgen
* https://github.com/cgewecke/hardhat-gas-reporter
* https://github.com/sc-forks/solidity-coverage

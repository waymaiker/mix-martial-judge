const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deployment in progress ...");

  arguments = [process.env.SUPERADMIN_WALLET_ADDRESS_LOCALHOST]
  const Fight = await deploy("Fight", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: 0
  })

  log("Deployment done !")
  log("Contract address :", Fight.address)

  //Verify the smart contract
  // if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
  //   log("Verifying...")
  //   await verify(Fight.address, arguments)
  // }
}

module.exports.tags = ["all", "fight", "main"]
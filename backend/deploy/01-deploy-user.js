const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deployment in progress ...");

  arguments = []
  const User = await deploy("User", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: 4
  })

  log("Deployment done !")

  //Verify the smart contract
  if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    log("Verifying...")
    await verify(User.address, arguments)
  }
}

module.exports.tags = ["all", "user", "main"]
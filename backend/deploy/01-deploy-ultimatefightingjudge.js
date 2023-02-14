const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
    
module.exports = async({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deployment in progress ...");

  arguments = ["Town Hall of Dakar"]
  const TownHall = await deploy("TownHall", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: 5
  })

  log("Deployment done !")

  //Verify the smart contract 
  // if(!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
  //   log("Verifying...")
  //   await verify(TownHall.address, arguments)
  // }
}

module.exports.tags = ["all", "voting", "main"]